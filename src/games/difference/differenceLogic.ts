import type { Difficulty } from '../../platform/types'

export type DiffId = 'sun' | 'bird' | 'flower' | 'friend'

export type DifferenceSpot = {
  id: DiffId
  x: number
  y: number
  size: number
}

export const SPOTS: DifferenceSpot[] = [
  { id: 'sun', x: 78, y: 20, size: 22 },
  { id: 'friend', x: 68, y: 72, size: 28 },
  { id: 'bird', x: 27, y: 24, size: 20 },
  { id: 'flower', x: 16, y: 70, size: 22 },
]

const COUNT: Record<Difficulty, number> = {
  1: 2,
  2: 3,
  3: 4,
}

export function differenceCountFor(difficulty: Difficulty): number {
  return COUNT[difficulty]
}

export function pickDifferenceSpots(difficulty: Difficulty): DifferenceSpot[] {
  return SPOTS.slice(0, COUNT[difficulty])
}
