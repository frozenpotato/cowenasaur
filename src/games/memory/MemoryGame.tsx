import { useEffect, useReducer, useRef } from 'react'
import { ITEMS, ItemArt } from '../../assets/illustrations/items'
import type { MascotMood } from '../../components/Mascot'
import { starsFromMistakes } from '../../platform/scoring'
import type { Difficulty, Stars } from '../../platform/types'
import { buildMemoryTiles, isMemoryMatch, memoryPairsFor, type MemoryTile } from './memoryLogic'
import styles from './MemoryGame.module.css'

type MemoryGameProps = {
  difficulty: Difficulty
  onMood: (mood: MascotMood) => void
  onRound: (round: number) => void
  onComplete: (stars: Stars) => void
}

type MemoryState = {
  tiles: MemoryTile[]
  flipped: number[]
  matched: string[]
  locked: boolean
  mismatches: number
}

type MemoryAction =
  | { type: 'flip'; index: number }
  | { type: 'resolve' }

function reduceMemory(state: MemoryState, action: MemoryAction): MemoryState {
  if (action.type === 'resolve') {
    return { ...state, flipped: [], locked: false }
  }

  const { index } = action
  if (state.locked || state.flipped.includes(index) || state.matched.includes(state.tiles[index].itemId)) {
    return state
  }

  if (state.flipped.length === 0) {
    return { ...state, flipped: [index] }
  }

  const first = state.flipped[0]
  if (isMemoryMatch(state.tiles, first, index)) {
    return {
      ...state,
      flipped: [],
      matched: [...state.matched, state.tiles[index].itemId],
    }
  }

  return {
    ...state,
    flipped: [first, index],
    locked: true,
    mismatches: state.mismatches + 1,
  }
}

export function MemoryGame({ difficulty, onMood, onRound, onComplete }: MemoryGameProps) {
  const pairs = memoryPairsFor(difficulty)
  const [state, dispatch] = useReducer(reduceMemory, difficulty, (level) => ({
    tiles: buildMemoryTiles(level),
    flipped: [],
    matched: [],
    locked: false,
    mismatches: 0,
  }))
  const buttonsRef = useRef<Array<HTMLButtonElement | null>>([])
  const completeRef = useRef(false)
  const resolveTimer = useRef(0)
  const moodTimer = useRef(0)
  const callbacks = useRef({ onMood, onRound, onComplete })
  const mismatchesRef = useRef(state.mismatches)
  callbacks.current = { onMood, onRound, onComplete }
  mismatchesRef.current = state.mismatches

  useEffect(() => {
    onMood('thinking')
  }, [onMood])

  useEffect(() => {
    return () => {
      window.clearTimeout(resolveTimer.current)
      window.clearTimeout(moodTimer.current)
    }
  }, [])

  useEffect(() => {
    if (!state.locked) {
      return
    }
    callbacks.current.onMood('tryAgain')
    resolveTimer.current = window.setTimeout(() => {
      dispatch({ type: 'resolve' })
      callbacks.current.onMood('thinking')
    }, 800)
  }, [state.locked])

  useEffect(() => {
    if (state.matched.length === 0 || completeRef.current) {
      return
    }
    callbacks.current.onRound(Math.min(state.matched.length, pairs - 1))
    callbacks.current.onMood('celebrating')
    if (state.matched.length >= pairs) {
      completeRef.current = true
      moodTimer.current = window.setTimeout(() => {
        callbacks.current.onComplete(starsFromMistakes(mismatchesRef.current))
      }, 520)
      return
    }
    moodTimer.current = window.setTimeout(() => callbacks.current.onMood('thinking'), 520)
  }, [state.matched.length, pairs])

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.repeat || state.locked || completeRef.current) {
        return
      }
      const current = buttonsRef.current.findIndex((node) => node === document.activeElement)
      const start = current < 0 ? 0 : current
      if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
        event.preventDefault()
        const step = event.key === 'ArrowRight' ? 1 : -1
        const next = nextOpenIndex(state, start, step)
        buttonsRef.current[next]?.focus()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [state])

  return (
    <div className={styles.board}>
      {state.tiles.map((tile, index) => {
        const faceUp = state.flipped.includes(index) || state.matched.includes(tile.itemId)
        return (
          <button
            key={tile.key}
            ref={(node) => {
              buttonsRef.current[index] = node
            }}
            type="button"
            className={[
              styles.card,
              faceUp ? styles.flipped : '',
              state.matched.includes(tile.itemId) ? styles.matched : '',
            ]
              .filter(Boolean)
              .join(' ')}
            aria-label={faceUp ? ITEMS[tile.itemId].word : 'Card'}
            aria-pressed={faceUp}
            disabled={state.locked || state.matched.includes(tile.itemId)}
            onClick={() => dispatch({ type: 'flip', index })}
          >
            <span className={[styles.face, styles.back].join(' ')} />
            <span className={[styles.face, styles.front].join(' ')}>
              <ItemArt id={tile.itemId} className={styles.art} />
            </span>
          </button>
        )
      })}
    </div>
  )
}

function nextOpenIndex(state: MemoryState, start: number, step: number) {
  for (let offset = 1; offset <= state.tiles.length; offset += 1) {
    const index = (start + step * offset + state.tiles.length) % state.tiles.length
    if (!state.matched.includes(state.tiles[index].itemId)) {
      return index
    }
  }
  return start
}
