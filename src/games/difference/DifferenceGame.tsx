import { useEffect, useRef, useState } from 'react'
import type { MascotMood } from '../../components/Mascot'
import { starsFromMistakes } from '../../platform/scoring'
import type { Difficulty, Stars } from '../../platform/types'
import { pickDifferenceSpots, type DiffId } from './differenceLogic'
import { MeadowScene } from './MeadowScene'
import styles from './DifferenceGame.module.css'

type DifferenceGameProps = {
  difficulty: Difficulty
  onMood: (mood: MascotMood) => void
  onRound: (round: number) => void
  onComplete: (stars: Stars) => void
}

export function DifferenceGame({ difficulty, onMood, onRound, onComplete }: DifferenceGameProps) {
  const [spots] = useState(() => pickDifferenceSpots(difficulty))
  const [found, setFound] = useState<DiffId[]>([])
  const [miss, setMiss] = useState(false)
  const mistakesRef = useRef(0)
  const timerRef = useRef(0)
  const completeRef = useRef(false)

  useEffect(() => {
    onMood('thinking')
  }, [onMood])

  useEffect(() => {
    return () => window.clearTimeout(timerRef.current)
  }, [])

  function markFound(id: DiffId) {
    if (completeRef.current || found.includes(id)) {
      return
    }
    const next = [...found, id]
    setFound(next)
    onMood('celebrating')
    if (next.length >= spots.length) {
      completeRef.current = true
      timerRef.current = window.setTimeout(() => {
        onComplete(starsFromMistakes(mistakesRef.current))
      }, 520)
      return
    }
    onRound(next.length)
    timerRef.current = window.setTimeout(() => onMood('thinking'), 520)
  }

  function markMiss() {
    if (completeRef.current) {
      return
    }
    mistakesRef.current += 1
    setMiss(true)
    onMood('tryAgain')
    window.clearTimeout(timerRef.current)
    timerRef.current = window.setTimeout(() => {
      setMiss(false)
      onMood('thinking')
    }, 700)
  }

  return (
    <div className={styles.board}>
      <SceneSide
        side="left"
        spots={spots}
        found={found}
        miss={miss}
        onFound={markFound}
        onMiss={markMiss}
      />
      <SceneSide
        side="right"
        spots={spots}
        found={found}
        miss={miss}
        onFound={markFound}
        onMiss={markMiss}
      />
    </div>
  )
}

function SceneSide({
  side,
  spots,
  found,
  miss,
  onFound,
  onMiss,
}: {
  side: 'left' | 'right'
  spots: ReturnType<typeof pickDifferenceSpots>
  found: DiffId[]
  miss: boolean
  onFound: (id: DiffId) => void
  onMiss: () => void
}) {
  return (
    <div
      className={[styles.scene, miss ? styles.miss : ''].filter(Boolean).join(' ')}
      onClick={onMiss}
    >
      <MeadowScene side={side} active={spots.map((spot) => spot.id)} />
      {spots.map((spot) => {
        const done = found.includes(spot.id)
        return (
          <button
            key={`${side}-${spot.id}`}
            type="button"
            className={[styles.hotspot, done ? styles.found : ''].filter(Boolean).join(' ')}
            style={{
              left: `${spot.x}%`,
              top: `${spot.y}%`,
              width: `${spot.size}%`,
              height: `${spot.size * 1.15}%`,
            }}
            aria-label={done ? 'Found' : 'Spot'}
            onClick={(event) => {
              event.stopPropagation()
              if (!done) {
                onFound(spot.id)
              }
            }}
          />
        )
      })}
    </div>
  )
}
