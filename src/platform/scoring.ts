import type { Stars } from './types'

export function starsFromMistakes(mistakes: number): Stars {
  if (mistakes <= 0) {
    return 3
  }
  if (mistakes === 1) {
    return 2
  }
  return 1
}

export function shuffle<T>(items: T[]): T[] {
  const next = [...items]
  for (let index = next.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(Math.random() * (index + 1))
    const current = next[index]
    next[index] = next[swap]
    next[swap] = current
  }
  return next
}

export function randomInt(min: number, max: number): number {
  return min + Math.floor(Math.random() * (max - min + 1))
}
