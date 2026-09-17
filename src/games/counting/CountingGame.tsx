import { useEffect, useRef, useState } from 'react'
import type { MascotMood } from '../../components/Mascot'
import type { Difficulty, Stars } from '../../platform/types'
import { CountDino } from './CountDino'
import { buildCountingSession, starsFromMistakes } from './countingLogic'
import styles from './CountingGame.module.css'

type CountingGameProps = {
  difficulty: Difficulty
  onMood: (mood: MascotMood) => void
  onRound: (round: number) => void
  onComplete: (stars: Stars) => void
}

export function CountingGame({
  difficulty,
  onMood,
  onRound,
  onComplete,
}: CountingGameProps) {
  const [rounds] = useState(() => buildCountingSession(difficulty))
  const [index, setIndex] = useState(0)
  const [busy, setBusy] = useState(false)
  const [wrong, setWrong] = useState<number | null>(null)
  const mistakesRef = useRef(0)
  const timerRef = useRef(0)
  const round = rounds[index]
  const dinoSize = round.count <= 3 ? 148 : 108
  const chooseRef = useRef<(value: number) => void>(() => {})
  const choicesRef = useRef(round.choices)
  choicesRef.current = round.choices

  useEffect(() => {
    onMood('thinking')
  }, [index, onMood])

  useEffect(() => {
    return () => window.clearTimeout(timerRef.current)
  }, [])

  function choose(value: number) {
    if (busy) {
      return
    }

    if (value !== round.count) {
      mistakesRef.current += 1
      setWrong(value)
      onMood('tryAgain')
      window.clearTimeout(timerRef.current)
      timerRef.current = window.setTimeout(() => {
        setWrong(null)
        onMood('thinking')
      }, 700)
      return
    }

    setBusy(true)
    setWrong(null)
    onMood('celebrating')
    window.clearTimeout(timerRef.current)
    timerRef.current = window.setTimeout(() => {
      const next = index + 1
      if (next >= rounds.length) {
        onComplete(starsFromMistakes(mistakesRef.current))
        return
      }
      setIndex(next)
      onRound(next)
      setBusy(false)
    }, 520)
  }

  chooseRef.current = choose

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.repeat) {
        return
      }
      const value = Number(event.key)
      if (choicesRef.current.includes(value)) {
        event.preventDefault()
        chooseRef.current(value)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <div className={styles.board}>
      <div className={styles.stage} aria-label={`${round.count} dinosaurs`}>
        {round.spots.map((spot, spotIndex) => (
          <div
            key={spotIndex}
            className={styles.spot}
            style={{
              left: `${spot.x}%`,
              top: `${spot.y}%`,
              width: dinoSize,
              transform: `translate(-50%, -50%) rotate(${spot.rotate}deg)`,
            }}
          >
            <CountDino variant={spot.variant} />
          </div>
        ))}
      </div>

      <div className={styles.choices}>
        {round.choices.map((value) => (
          <button
            key={value}
            type="button"
            className={[styles.choice, wrong === value ? styles.choiceWrong : '']
              .filter(Boolean)
              .join(' ')}
            disabled={busy}
            aria-label={`${value}`}
            onClick={() => choose(value)}
          >
            {value}
          </button>
        ))}
      </div>
    </div>
  )
}
