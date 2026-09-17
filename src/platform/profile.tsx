import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import { GAMES } from './registry'
import { DIFFICULTIES, type Difficulty, type GameId, type GameProgress, type Stars } from './types'

type ProfileValue = {
  totalStars: number
  progress: Record<GameId, GameProgress>
  selectDifficulty: (gameId: GameId, difficulty: Difficulty) => boolean
  recordResult: (gameId: GameId, difficulty: Difficulty, stars: Stars) => void
}

const ProfileContext = createContext<ProfileValue | null>(null)

function freshProgress(): GameProgress {
  return {
    unlockedDifficulties: [1],
    selectedDifficulty: 1,
    bestStarsByDifficulty: {},
    timesPlayed: 0,
  }
}

function createProgress(): Record<GameId, GameProgress> {
  return Object.fromEntries(GAMES.map((game) => [game.id, freshProgress()])) as Record<
    GameId,
    GameProgress
  >
}

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [totalStars, setTotalStars] = useState(0)
  const [progress, setProgress] = useState(createProgress)

  const value = useMemo<ProfileValue>(
    () => ({
      totalStars,
      progress,
      selectDifficulty(gameId, difficulty) {
        const current = progress[gameId]
        if (!current.unlockedDifficulties.includes(difficulty)) {
          return false
        }
        setProgress((prev) => ({
          ...prev,
          [gameId]: { ...prev[gameId], selectedDifficulty: difficulty },
        }))
        return true
      },
      recordResult(gameId, difficulty, stars) {
        setTotalStars((count) => count + stars)
        setProgress((prev) => {
          const current = prev[gameId]
          const previousBest = current.bestStarsByDifficulty[difficulty] ?? 0
          const unlocked = new Set(current.unlockedDifficulties)
          if (stars >= 2 && difficulty < 3) {
            unlocked.add((difficulty + 1) as Difficulty)
          }
          return {
            ...prev,
            [gameId]: {
              ...current,
              timesPlayed: current.timesPlayed + 1,
              bestStarsByDifficulty: {
                ...current.bestStarsByDifficulty,
                [difficulty]: stars > previousBest ? stars : previousBest,
              },
              unlockedDifficulties: DIFFICULTIES.filter((level) => unlocked.has(level)),
            },
          }
        })
      },
    }),
    [progress, totalStars],
  )

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
}

export function useProfile() {
  const value = useContext(ProfileContext)
  if (!value) {
    throw new Error('useProfile must be used within ProfileProvider')
  }
  return value
}

export function bestStarsFor(progress: GameProgress, difficulty: Difficulty): 0 | Stars {
  return progress.bestStarsByDifficulty[difficulty] ?? 0
}
