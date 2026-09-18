import { openDB, type DBSchema, type IDBPDatabase } from 'idb'
import type { Difficulty, GameId, Stars } from '../types'

export const DB_NAME = 'cowenasaur'
export const DB_VERSION = 1
export const PROFILE_ID = 'local'

export type ProfileRecord = {
  id: typeof PROFILE_ID
  totalStars: number
  hiddenGameIds?: GameId[]
  createdAt: number
  updatedAt: number
}

export type ProgressRecord = {
  gameId: GameId
  unlockedDifficulties: Difficulty[]
  selectedDifficulty: Difficulty
  bestStarsByDifficulty: Partial<Record<Difficulty, Stars>>
  timesPlayed: number
  lastPlayedAt: number
}

interface CowenasaurDB extends DBSchema {
  profile: {
    key: string
    value: ProfileRecord
  }
  progress: {
    key: GameId
    value: ProgressRecord
  }
}

let dbPromise: Promise<IDBPDatabase<CowenasaurDB>> | null = null

export function getDb() {
  if (!dbPromise) {
    dbPromise = openDB<CowenasaurDB>(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('profile')) {
          db.createObjectStore('profile', { keyPath: 'id' })
        }
        if (!db.objectStoreNames.contains('progress')) {
          db.createObjectStore('progress', { keyPath: 'gameId' })
        }
      },
    }).catch((error) => {
      dbPromise = null
      throw error
    })
  }

  return dbPromise
}
