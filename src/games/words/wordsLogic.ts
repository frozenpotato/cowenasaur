import { ITEMS, type Item, type ItemId } from '../../assets/illustrations/items'
import { shuffle } from '../../platform/scoring'
import type { Difficulty } from '../../platform/types'

export type WordRound = {
  answer: Item
  choices: Item[]
}

type WordsSpec = {
  choiceCount: number
  rounds: number
  preferFar: boolean
  pool: ItemId[]
}

const SPECS: Record<Difficulty, WordsSpec> = {
  1: {
    choiceCount: 2,
    rounds: 4,
    preferFar: true,
    pool: ['cat', 'sun', 'bus', 'egg', 'dog', 'hat'],
  },
  2: {
    choiceCount: 2,
    rounds: 4,
    preferFar: true,
    pool: ['cat', 'dog', 'sun', 'hat', 'cup', 'egg', 'bus', 'pig'],
  },
  3: {
    choiceCount: 3,
    rounds: 5,
    preferFar: false,
    pool: ['cat', 'cup', 'hat', 'hen', 'dog', 'bus', 'pig', 'sun', 'bee', 'fox'],
  },
}

export function wordsRoundsFor(difficulty: Difficulty): number {
  return SPECS[difficulty].rounds
}

export function buildWordsSession(difficulty: Difficulty): WordRound[] {
  const spec = SPECS[difficulty]
  const pool = spec.pool.map((id) => ITEMS[id])
  const answers = shuffle(pool).slice(0, spec.rounds)
  return answers.map((answer) => ({
    answer,
    choices: pickChoices(answer, pool, spec),
  }))
}

function pickChoices(answer: Item, pool: Item[], spec: WordsSpec): Item[] {
  const others = pool.filter((item) => item.id !== answer.id)
  others.sort((left, right) => {
    const leftFar = left.word[0] === answer.word[0] ? 0 : 1
    const rightFar = right.word[0] === answer.word[0] ? 0 : 1
    return spec.preferFar ? rightFar - leftFar : leftFar - rightFar
  })
  return shuffle([answer, ...others.slice(0, spec.choiceCount - 1)])
}
