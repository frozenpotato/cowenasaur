import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import { GAMES } from './registry'
import type { Difficulty, GameId, GameProgress, Stars } from './types'

type ProfileValue = {
  totalStars: number
  progress: Record<GameId, GameProgress>
  selectDifficulty: (gameId: GameId, difficulty: Difficulty) => boolean
}

const ProfileContext = createContext<ProfileValue | null>(null)

function freshProgress(): GameProgress {
  return {
    unlockedDifficulties: [1],
    selectedDifficulty: 1,
    bestStarsByDifficulty: {},
  }
}

function createProgress(): Record<GameId, GameProgress> {
  return Object.fromEntries(GAMES.map((game) => [game.id, freshProgress()])) as Record<
    GameId,
    GameProgress
  >
}

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [totalStars] = useState(0)
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
