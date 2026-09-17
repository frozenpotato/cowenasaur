import { shuffle } from '../../platform/scoring'
import type { Difficulty } from '../../platform/types'
import { WORD_LIST } from './wordList'

const ROUNDS: Record<Difficulty, number> = {
  1: 5,
  2: 7,
  3: 10,
}

export function typingRoundsFor(difficulty: Difficulty): number {
  return ROUNDS[difficulty]
}

export function buildTypingSession(difficulty: Difficulty): string[] {
  const count = Math.min(ROUNDS[difficulty], WORD_LIST.length)
  return shuffle(WORD_LIST)
    .slice(0, count)
    .map((entry) => entry.word)
}

export function isLetterKey(key: string): boolean {
  return key.length === 1 && /[a-z]/i.test(key)
}

export function lettersOf(word: string): string[] {
  return [...word]
}
