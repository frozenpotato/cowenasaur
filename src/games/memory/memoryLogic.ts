import { type ItemId } from '../../assets/illustrations/items'
import { shuffle } from '../../platform/scoring'
import type { Difficulty } from '../../platform/types'

export type MemoryTile = {
  key: string
  itemId: ItemId
}

const POOL: ItemId[] = ['cat', 'dog', 'pig', 'hen', 'fish', 'frog', 'bird', 'fox']

const PAIRS: Record<Difficulty, number> = {
  1: 2,
  2: 3,
  3: 4,
}

export function memoryPairsFor(difficulty: Difficulty): number {
  return PAIRS[difficulty]
}

export function buildMemoryTiles(difficulty: Difficulty): MemoryTile[] {
  const pairs = PAIRS[difficulty]
  const items = shuffle(POOL).slice(0, pairs)
  const tiles = items.flatMap((itemId) => [
    { key: `${itemId}-a`, itemId },
    { key: `${itemId}-b`, itemId },
  ])
  return shuffle(tiles)
}

export function isMemoryMatch(tiles: MemoryTile[], first: number, second: number): boolean {
  return tiles[first].itemId === tiles[second].itemId
}
