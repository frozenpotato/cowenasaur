import { ITEMS, type Item, type ItemId } from '../../assets/illustrations/items'
import { shuffle } from '../../platform/scoring'
import type { Difficulty } from '../../platform/types'

export type IdentifyRound = {
  answer: Item
  choices: Item[]
}

type IdentifySpec = {
  choiceCount: number
  rounds: number
  preferFar: boolean
  pool: ItemId[]
}

const SPECS: Record<Difficulty, IdentifySpec> = {
  1: {
    choiceCount: 2,
    rounds: 4,
    preferFar: true,
    pool: ['cat', 'fish', 'bird', 'pig', 'frog', 'bee'],
  },
  2: {
    choiceCount: 3,
    rounds: 4,
    preferFar: false,
    pool: ['cat', 'dog', 'pig', 'hen', 'fox', 'bird', 'fish'],
  },
  3: {
    choiceCount: 4,
    rounds: 5,
    preferFar: false,
    pool: ['cat', 'dog', 'fox', 'pig', 'hen', 'frog', 'fish', 'bird', 'bee'],
  },
}

export function identifyRoundsFor(difficulty: Difficulty): number {
  return SPECS[difficulty].rounds
}

export function buildIdentifySession(difficulty: Difficulty): IdentifyRound[] {
  const spec = SPECS[difficulty]
  const pool = spec.pool.map((id) => ITEMS[id])
  const answers = shuffle(pool).slice(0, spec.rounds)
  return answers.map((answer) => ({
    answer,
    choices: pickChoices(answer, pool, spec),
  }))
}

function pickChoices(answer: Item, pool: Item[], spec: IdentifySpec): Item[] {
  const others = pool.filter((item) => item.id !== answer.id)
  others.sort((left, right) => {
    const leftFar = left.category === answer.category ? 0 : 1
    const rightFar = right.category === answer.category ? 0 : 1
    return spec.preferFar ? rightFar - leftFar : leftFar - rightFar
  })
  return shuffle([answer, ...others.slice(0, spec.choiceCount - 1)])
}
