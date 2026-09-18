import { GAMES } from './registry'
import { DIFFICULTIES, type Difficulty, type GameId, type GameProgress, type Stars } from './types'

export type ProfileState = {
  totalStars: number
  progress: Record<GameId, GameProgress>
  hiddenGameIds: GameId[]
}

export function freshProgress(): GameProgress {
  return {
    unlockedDifficulties: [1],
    selectedDifficulty: 1,
    bestStarsByDifficulty: {},
    timesPlayed: 0,
    lastPlayedAt: 0,
  }
}

export function createProgress(): Record<GameId, GameProgress> {
  return Object.fromEntries(GAMES.map((game) => [game.id, freshProgress()])) as Record<
    GameId,
    GameProgress
  >
}

export function emptyProfileState(): ProfileState {
  return { totalStars: 0, progress: createProgress(), hiddenGameIds: [] }
}

export function applyResult(
  current: GameProgress,
  difficulty: Difficulty,
  stars: Stars,
  playedAt = Date.now(),
): GameProgress {
  const previousBest = current.bestStarsByDifficulty[difficulty] ?? 0
  const unlocked = new Set(current.unlockedDifficulties)
  if (stars >= 2 && difficulty < 3) {
    unlocked.add((difficulty + 1) as Difficulty)
  }

  return {
    ...current,
    timesPlayed: current.timesPlayed + 1,
    lastPlayedAt: playedAt,
    bestStarsByDifficulty: {
      ...current.bestStarsByDifficulty,
      [difficulty]: stars > previousBest ? stars : previousBest,
    },
    unlockedDifficulties: DIFFICULTIES.filter((level) => unlocked.has(level)),
  }
}

export function unlockDifficulty(current: GameProgress, difficulty: Difficulty): GameProgress {
  const maxUnlocked = Math.max(difficulty, ...current.unlockedDifficulties) as Difficulty
  return {
    ...current,
    unlockedDifficulties: DIFFICULTIES.filter((level) => level <= maxUnlocked),
  }
}

export function applyStars(totalStars: number, stars: Stars): number {
  return totalStars + stars
}

export function bestStarsFor(progress: GameProgress, difficulty: Difficulty): 0 | Stars {
  return progress.bestStarsByDifficulty[difficulty] ?? 0
}

export function normalizeHiddenGameIds(ids: unknown): GameId[] {
  if (!Array.isArray(ids)) {
    return []
  }

  const hidden: GameId[] = []
  for (const value of ids) {
    if (typeof value !== 'string' || hidden.includes(value as GameId)) {
      continue
    }
    if (GAMES.some((game) => game.id === value)) {
      hidden.push(value as GameId)
    }
  }

  if (hidden.length >= GAMES.length) {
    return []
  }

  return hidden
}

export function visibleGames(hiddenGameIds: GameId[]) {
  const hidden = new Set(hiddenGameIds)
  const shown = GAMES.filter((game) => !hidden.has(game.id))
  return shown.length > 0 ? shown : GAMES
}

export function hideGame(hiddenGameIds: GameId[], gameId: GameId): GameId[] | null {
  if (hiddenGameIds.includes(gameId)) {
    return hiddenGameIds
  }
  if (GAMES.length - hiddenGameIds.length <= 1) {
    return null
  }
  return [...hiddenGameIds, gameId]
}

export function showGame(hiddenGameIds: GameId[], gameId: GameId): GameId[] {
  return hiddenGameIds.filter((id) => id !== gameId)
}
