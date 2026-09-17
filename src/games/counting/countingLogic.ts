import { randomInt, shuffle } from '../../platform/scoring'
import type { Difficulty } from '../../platform/types'

export { starsFromMistakes } from '../../platform/scoring'

export type DinoSpot = {
  x: number
  y: number
  rotate: number
  variant: 0 | 1 | 2
}

export type CountingRound = {
  count: number
  choices: number[]
  spots: DinoSpot[]
}

type CountingSpec = {
  min: number
  max: number
  choiceCount: number
  rounds: number
  preferFar: boolean
}

const SPECS: Record<Difficulty, CountingSpec> = {
  1: { min: 1, max: 3, choiceCount: 2, rounds: 4, preferFar: true },
  2: { min: 1, max: 5, choiceCount: 2, rounds: 4, preferFar: true },
  3: { min: 1, max: 6, choiceCount: 3, rounds: 5, preferFar: false },
}

const LAYOUTS: Record<number, DinoSpot[][]> = {
  1: [[{ x: 50, y: 52, rotate: -8, variant: 0 }]],
  2: [
    [
      { x: 32, y: 50, rotate: -12, variant: 0 },
      { x: 68, y: 54, rotate: 10, variant: 1 },
    ],
  ],
  3: [
    [
      { x: 28, y: 58, rotate: -10, variant: 0 },
      { x: 50, y: 38, rotate: 4, variant: 1 },
      { x: 74, y: 56, rotate: 12, variant: 2 },
    ],
  ],
  4: [
    [
      { x: 28, y: 36, rotate: -8, variant: 0 },
      { x: 70, y: 34, rotate: 10, variant: 1 },
      { x: 32, y: 70, rotate: 6, variant: 2 },
      { x: 72, y: 68, rotate: -6, variant: 0 },
    ],
  ],
  5: [
    [
      { x: 22, y: 38, rotate: -12, variant: 0 },
      { x: 50, y: 28, rotate: 4, variant: 1 },
      { x: 78, y: 40, rotate: 10, variant: 2 },
      { x: 34, y: 72, rotate: 8, variant: 1 },
      { x: 66, y: 74, rotate: -8, variant: 0 },
    ],
  ],
  6: [
    [
      { x: 22, y: 32, rotate: -10, variant: 0 },
      { x: 50, y: 24, rotate: 2, variant: 1 },
      { x: 78, y: 34, rotate: 12, variant: 2 },
      { x: 24, y: 70, rotate: 8, variant: 1 },
      { x: 50, y: 78, rotate: -4, variant: 0 },
      { x: 76, y: 68, rotate: -10, variant: 2 },
    ],
  ],
}

export function roundsForDifficulty(difficulty: Difficulty): number {
  return SPECS[difficulty].rounds
}

export function buildCountingSession(difficulty: Difficulty): CountingRound[] {
  const spec = SPECS[difficulty]
  const rounds: CountingRound[] = []
  let previous = 0

  for (let index = 0; index < spec.rounds; index += 1) {
    let count = randomInt(spec.min, spec.max)
    if (spec.max > spec.min) {
      while (count === previous) {
        count = randomInt(spec.min, spec.max)
      }
    }
    previous = count
    const layouts = LAYOUTS[count]
    rounds.push({
      count,
      choices: pickChoices(count, spec),
      spots: layouts[index % layouts.length],
    })
  }

  return rounds
}

function pickChoices(answer: number, spec: CountingSpec): number[] {
  const pool = integers(spec.min, spec.max).filter((value) => value !== answer)
  pool.sort((left, right) => {
    const leftDistance = Math.abs(left - answer)
    const rightDistance = Math.abs(right - answer)
    return spec.preferFar ? rightDistance - leftDistance : leftDistance - rightDistance
  })
  return shuffle([answer, ...pool.slice(0, spec.choiceCount - 1)])
}

function integers(min: number, max: number): number[] {
  return Array.from({ length: max - min + 1 }, (_, index) => min + index)
}
