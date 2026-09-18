import { shuffle } from '../../platform/scoring'
import type { Difficulty } from '../../platform/types'

const ROUNDS: Record<Difficulty, number> = {
  1: 5,
  2: 7,
  3: 10,
}

const WAVE_SIZE: Record<Difficulty, number> = {
  1: 3,
  2: 4,
  3: 5,
}

const RISE_MS: Record<Difficulty, number> = {
  1: 9000,
  2: 7000,
  3: 5000,
}

const EASY = [...'abcdehimnopst']
const WIDER = [...'abcdefghiklmnoprstuwy']
const FULL = [...'abcdefghijklmnopqrstuvwxyz']

const POOLS: Record<Difficulty, string[]> = {
  1: EASY,
  2: WIDER,
  3: FULL,
}

export const LANES = [14, 30, 46, 62, 78, 90]

export type PopWave = {
  letters: string[]
  riseMs: number
}

export type FloaterKind = 'confetti' | 'rainbow' | 'circle' | 'star' | 'heart' | 'triangle'

export type Floater = {
  id: string
  kind: FloaterKind
  x: number
  size: number
  duration: number
  delay: number
  restTop: number
  color: string
}

const FLOATER_KINDS: FloaterKind[] = ['confetti', 'rainbow', 'circle', 'star', 'heart', 'triangle']

const FLOATER_COLORS = [
  'var(--color-coral)',
  'var(--color-gold)',
  'var(--color-violet)',
  'var(--color-rose)',
  'var(--color-sky)',
  'var(--color-apricot)',
  'var(--color-meadow)',
]

export function popRoundsFor(difficulty: Difficulty): number {
  return ROUNDS[difficulty]
}

export function buildPopSession(difficulty: Difficulty): PopWave[] {
  const count = ROUNDS[difficulty]
  const size = WAVE_SIZE[difficulty]
  const riseMs = RISE_MS[difficulty]
  const pool = POOLS[difficulty]
  return Array.from({ length: count }, () => ({
    letters: shuffle(pool).slice(0, size),
    riseMs,
  }))
}

export function pickLanes(count: number): number[] {
  return shuffle(LANES).slice(0, count)
}

export function isLetterKey(key: string): boolean {
  return key.length === 1 && /[a-z]/i.test(key)
}

export function buildFloaters(count = 16): Floater[] {
  return Array.from({ length: count }, (_, index) => ({
    id: `floater-${index}`,
    kind: FLOATER_KINDS[index % FLOATER_KINDS.length],
    x: 8 + ((index * 19) % 84),
    size: 10 + (index % 6) * 2,
    duration: 10000 + (index % 8) * 900,
    delay: (index * 640) % 7200,
    restTop: 12 + ((index * 13) % 70),
    color: FLOATER_COLORS[index % FLOATER_COLORS.length],
  }))
}
