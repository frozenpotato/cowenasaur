import { GAMES } from './registry'
import { DIFFICULTIES, type Difficulty, type GameId, type GameProgress, type Stars } from './types'

export type ProfileState = {
  totalStars: number
  progress: Record<GameId, GameProgress>
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
  return { totalStars: 0, progress: createProgress() }
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
