import { createContext, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { loadState, saveState } from './persistence'
import {
  applyResult,
  applyStars,
  createProgress,
  emptyProfileState,
  hideGame,
  showGame,
  type ProfileState,
} from './progressState'
import type { Difficulty, GameId, GameProgress, Stars } from './types'

type ProfileValue = {
  ready: boolean
  totalStars: number
  progress: Record<GameId, GameProgress>
  hiddenGameIds: GameId[]
  selectDifficulty: (gameId: GameId, difficulty: Difficulty) => boolean
  recordResult: (gameId: GameId, difficulty: Difficulty, stars: Stars) => void
  setGameHidden: (gameId: GameId, hidden: boolean) => boolean
}

const ProfileContext = createContext<ProfileValue | null>(null)

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false)
  const [totalStars, setTotalStars] = useState(0)
  const [progress, setProgress] = useState(createProgress)
  const [hiddenGameIds, setHiddenGameIds] = useState<GameId[]>([])
  const snapshot = useRef<ProfileState>(emptyProfileState())

  useEffect(() => {
    let cancelled = false

    void loadState().then((loaded) => {
      if (cancelled) {
        return
      }
      snapshot.current = loaded
      setTotalStars(loaded.totalStars)
      setProgress(loaded.progress)
      setHiddenGameIds(loaded.hiddenGameIds)
      setReady(true)
    })

    return () => {
      cancelled = true
    }
  }, [])

  const value = useMemo<ProfileValue>(
    () => ({
      ready,
      totalStars,
      progress,
      hiddenGameIds,
      selectDifficulty(gameId, difficulty) {
        const current = snapshot.current.progress[gameId]
        if (!current.unlockedDifficulties.includes(difficulty)) {
          return false
        }
        if (current.selectedDifficulty === difficulty) {
          return true
        }

        const next: ProfileState = {
          ...snapshot.current,
          progress: {
            ...snapshot.current.progress,
            [gameId]: { ...current, selectedDifficulty: difficulty },
          },
        }
        commit(next, setTotalStars, setProgress, setHiddenGameIds, snapshot)
        return true
      },
      recordResult(gameId, difficulty, stars) {
        const current = snapshot.current
        commit(
          {
            totalStars: applyStars(current.totalStars, stars),
            progress: {
              ...current.progress,
              [gameId]: applyResult(current.progress[gameId], difficulty, stars),
            },
            hiddenGameIds: current.hiddenGameIds,
          },
          setTotalStars,
          setProgress,
          setHiddenGameIds,
          snapshot,
        )
      },
      setGameHidden(gameId, hidden) {
        const current = snapshot.current.hiddenGameIds
        const nextHidden = hidden ? hideGame(current, gameId) : showGame(current, gameId)
        if (!nextHidden) {
          return false
        }
        commit(
          { ...snapshot.current, hiddenGameIds: nextHidden },
          setTotalStars,
          setProgress,
          setHiddenGameIds,
          snapshot,
        )
        return true
      },
    }),
    [hiddenGameIds, progress, ready, totalStars],
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

function commit(
  next: ProfileState,
  setTotalStars: (value: number) => void,
  setProgress: (value: Record<GameId, GameProgress>) => void,
  setHiddenGameIds: (value: GameId[]) => void,
  snapshot: { current: ProfileState },
) {
  snapshot.current = next
  setTotalStars(next.totalStars)
  setProgress(next.progress)
  setHiddenGameIds(next.hiddenGameIds)
  void saveState(next)
}
