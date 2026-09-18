import type { ComponentType } from 'react'
import {
  AnimalsArt,
  CountArt,
  MemoryArt,
  PopArt,
  SpotArt,
  TypeArt,
  WordsArt,
} from '../assets/illustrations/games'
import type { Accent, GameId } from './types'

export type GameDefinition = {
  id: GameId
  label: string
  accent: Accent
  Illustration: ComponentType<{ className?: string }>
}

export const GAMES: GameDefinition[] = [
  { id: 'memory', label: 'Memory', accent: 'violet', Illustration: MemoryArt },
  { id: 'words', label: 'Words', accent: 'coral', Illustration: WordsArt },
  { id: 'difference', label: 'Spot', accent: 'teal', Illustration: SpotArt },
  { id: 'counting', label: 'Count', accent: 'gold', Illustration: CountArt },
  { id: 'identify', label: 'Animals', accent: 'leaf', Illustration: AnimalsArt },
  { id: 'typing', label: 'Type', accent: 'apricot', Illustration: TypeArt },
  { id: 'pop', label: 'Pop', accent: 'rose', Illustration: PopArt },
]

export function getGame(id: GameId): GameDefinition {
  const game = GAMES.find((entry) => entry.id === id)
  if (!game) {
    throw new Error(`Unknown game: ${id}`)
  }
  return game
}
