import { useEffect, useRef, useState } from 'react'
import type { MascotMood } from '../../components/Mascot'
import type { GameDefinition } from '../registry'
import type { Stars } from '../types'
import styles from './PlaceholderPlay.module.css'

const TOTAL_ROUNDS = 3

type PlaceholderPlayProps = {
  game: GameDefinition
  onMood: (mood: MascotMood) => void
  onRound: (round: number) => void
  onComplete: (stars: Stars) => void
}

export function PlaceholderPlay({
  game,
  onMood,
  onRound,
  onComplete,
}: PlaceholderPlayProps) {
  const { Illustration } = game
  const [round, setRound] = useState(0)
  const [busy, setBusy] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const timerRef = useRef(0)

  useEffect(() => {
    onMood('thinking')
    buttonRef.current?.focus()
  }, [onMood, round])

  useEffect(() => {
    return () => window.clearTimeout(timerRef.current)
  }, [])

  function handleTap() {
    if (busy) {
      return
    }
    setBusy(true)
    onMood('celebrating')
    timerRef.current = window.setTimeout(() => {
      const next = round + 1
      if (next >= TOTAL_ROUNDS) {
        onComplete(3)
        return
      }
      setRound(next)
      onRound(next)
      setBusy(false)
    }, 480)
  }

  return (
    <button
      ref={buttonRef}
      type="button"
      className={[styles.target, styles[game.accent]].join(' ')}
      onClick={handleTap}
      aria-label={game.label}
    >
      <Illustration className={styles.art} />
    </button>
  )
}

export { TOTAL_ROUNDS }
