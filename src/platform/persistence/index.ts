import { GAMES } from '../registry'
import {
  applyResult,
  applyStars,
  emptyProfileState,
  freshProgress,
  unlockDifficulty as unlockInProgress,
  type ProfileState,
} from '../progressState'
import { DIFFICULTIES, type Difficulty, type GameId, type GameProgress, type Stars } from '../types'
import { getDb, PROFILE_ID, type ProfileRecord, type ProgressRecord } from './db'

export type { ProfileRecord, ProgressRecord } from './db'
export type GameResult = {
  stars: Stars
  metrics?: Record<string, number>
}

let writes: Promise<unknown> = Promise.resolve()

function enqueue<T>(work: () => Promise<T>): Promise<T> {
  const next = writes.then(work, work)
  writes = next.then(
    () => undefined,
    () => undefined,
  )
  return next
}

export async function getProfile(): Promise<ProfileRecord> {
  const db = await getDb()
  const stored = await db.get('profile', PROFILE_ID)
  if (stored) {
    return normalizeProfile(stored)
  }

  const created = createProfileRecord(0)
  await db.put('profile', created)
  return created
}

export async function addStars(count: number): Promise<ProfileRecord> {
  return enqueue(async () => {
    const profile = await getProfile()
    const next: ProfileRecord = {
      ...profile,
      totalStars: Math.max(0, profile.totalStars + count),
      updatedAt: Date.now(),
    }
    await (await getDb()).put('profile', next)
    return next
  })
}

export async function getProgress(gameId: GameId): Promise<ProgressRecord> {
  const db = await getDb()
  const stored = await db.get('progress', gameId)
  return stored ? toProgressRecord(gameId, normalizeProgress(stored)) : toProgressRecord(gameId, freshProgress())
}

export async function recordResult(
  gameId: GameId,
  difficulty: Difficulty,
  result: GameResult,
): Promise<ProfileState> {
  return enqueue(async () => {
    const state = await readState()
    const next: ProfileState = {
      totalStars: applyStars(state.totalStars, result.stars),
      progress: {
        ...state.progress,
        [gameId]: applyResult(state.progress[gameId], difficulty, result.stars),
      },
    }
    await writeState(next)
    return next
  })
}

export async function unlockDifficulty(gameId: GameId, difficulty: Difficulty): Promise<GameProgress> {
  return enqueue(async () => {
    const state = await readState()
    const nextProgress = unlockInProgress(state.progress[gameId], difficulty)
    await writeState({
      ...state,
      progress: { ...state.progress, [gameId]: nextProgress },
    })
    return nextProgress
  })
}

export async function loadState(): Promise<ProfileState> {
  try {
    return await readState()
  } catch (error) {
    console.error('Cowenasaur could not load saved stars', error)
    return emptyProfileState()
  }
}

export async function saveState(state: ProfileState): Promise<void> {
  await enqueue(async () => {
    try {
      await writeState(state)
    } catch (error) {
      console.error('Cowenasaur could not save stars', error)
    }
  })
}

async function readState(): Promise<ProfileState> {
  const db = await getDb()
  const [profile, records] = await Promise.all([db.get('profile', PROFILE_ID), db.getAll('progress')])
  const progress = emptyProfileState().progress

  for (const record of records) {
    if (!isGameId(record.gameId)) {
      continue
    }
    progress[record.gameId] = normalizeProgress(record)
  }

  return {
    totalStars: profile ? normalizeProfile(profile).totalStars : 0,
    progress,
  }
}

async function writeState(state: ProfileState): Promise<void> {
  const db = await getDb()
  const existing = await db.get('profile', PROFILE_ID)
  const now = Date.now()
  const tx = db.transaction(['profile', 'progress'], 'readwrite')
  await tx.objectStore('profile').put({
    id: PROFILE_ID,
    totalStars: Math.max(0, Math.floor(state.totalStars)),
    createdAt: existing?.createdAt ?? now,
    updatedAt: now,
  })

  for (const game of GAMES) {
    await tx.objectStore('progress').put(toProgressRecord(game.id, state.progress[game.id]))
  }

  await tx.done
}

function createProfileRecord(totalStars: number): ProfileRecord {
  const now = Date.now()
  return { id: PROFILE_ID, totalStars, createdAt: now, updatedAt: now }
}

function toProgressRecord(gameId: GameId, progress: GameProgress): ProgressRecord {
  return { gameId, ...progress }
}

function normalizeProfile(record: ProfileRecord): ProfileRecord {
  return {
    id: PROFILE_ID,
    totalStars: asCount(record.totalStars),
    createdAt: asCount(record.createdAt),
    updatedAt: asCount(record.updatedAt),
  }
}

function normalizeProgress(record: Partial<ProgressRecord>): GameProgress {
  const fallback = freshProgress()
  const maxUnlocked = Math.max(
    1,
    ...DIFFICULTIES.filter((level) => record.unlockedDifficulties?.includes(level)),
  ) as Difficulty
  const unlockedDifficulties = DIFFICULTIES.filter((level) => level <= maxUnlocked)
  const selected = record.selectedDifficulty
  const selectedDifficulty =
    selected === 1 || selected === 2 || selected === 3
      ? unlockedDifficulties.includes(selected)
        ? selected
        : 1
      : 1
  const bestStarsByDifficulty: Partial<Record<Difficulty, Stars>> = {}

  for (const difficulty of DIFFICULTIES) {
    const stars = record.bestStarsByDifficulty?.[difficulty]
    if (stars === 1 || stars === 2 || stars === 3) {
      bestStarsByDifficulty[difficulty] = stars
    }
  }

  return {
    unlockedDifficulties,
    selectedDifficulty,
    bestStarsByDifficulty,
    timesPlayed: asCount(record.timesPlayed ?? fallback.timesPlayed),
    lastPlayedAt: asCount(record.lastPlayedAt ?? fallback.lastPlayedAt),
  }
}

function asCount(value: number | undefined): number {
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    return 0
  }
  return Math.max(0, Math.floor(value))
}

function isGameId(value: string): value is GameId {
  return GAMES.some((game) => game.id === value)
}
