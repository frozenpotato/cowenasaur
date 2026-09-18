import { useEffect, useRef, useState, type AnimationEvent, type CSSProperties } from 'react'
import type { MascotMood } from '../../components/Mascot'
import { prefersReducedMotion } from '../../platform/motion'
import { randomInt, starsFromMistakes } from '../../platform/scoring'
import type { Difficulty, Stars } from '../../platform/types'
import {
  buildFloaters,
  buildPopSession,
  isLetterKey,
  pickLanes,
  type Floater,
} from './popLogic'
import styles from './PopGame.module.css'

type PopGameProps = {
  difficulty: Difficulty
  onMood: (mood: MascotMood) => void
  onRound: (round: number) => void
  onComplete: (stars: Stars) => void
}

type LiveLetter = {
  id: string
  letter: string
  lane: number
  delayMs: number
  restTop: number
}

type PopBit = {
  id: string
  letter: string
  x: number
  y: number
}

export function PopGame({ difficulty, onMood, onRound, onComplete }: PopGameProps) {
  const [waves] = useState(() => buildPopSession(difficulty))
  const [floaters] = useState(() => buildFloaters())
  const [reduced] = useState(() => prefersReducedMotion())
  const [waveIndex, setWaveIndex] = useState(0)
  const [live, setLive] = useState<LiveLetter[]>([])
  const [pops, setPops] = useState<PopBit[]>([])
  const [wrong, setWrong] = useState(false)
  const mistakesRef = useRef(0)
  const timerRef = useRef(0)
  const waveIndexRef = useRef(0)
  const busyRef = useRef(false)
  const liveRef = useRef<LiveLetter[]>([])
  const popsRef = useRef<PopBit[]>([])
  const letterEls = useRef(new Map<string, HTMLButtonElement>())
  const skyRef = useRef<HTMLDivElement>(null)
  const typeRef = useRef<(letter: string) => void>(() => {})
  const wave = waves[waveIndex]

  function syncLive(next: LiveLetter[]) {
    liveRef.current = next
    setLive(next)
  }

  function syncPops(next: PopBit[]) {
    popsRef.current = next
    setPops(next)
  }

  function spawnWave(index: number) {
    const nextWave = waves[index]
    const lanes = pickLanes(nextWave.letters.length)
    syncLive(
      nextWave.letters.map((letter, slot) => ({
        id: `${index}-${slot}-${letter}`,
        letter,
        lane: lanes[slot],
        delayMs: slot * 480,
        restTop: 16 + randomInt(0, 48),
      })),
    )
    syncPops([])
    onMood('thinking')
  }

  useEffect(() => {
    spawnWave(0)
    return () => window.clearTimeout(timerRef.current)
  }, [])

  useEffect(() => {
    if (!reduced) {
      return
    }

    const timers = liveRef.current.map((entry) =>
      window.setTimeout(() => escapeLetter(entry.id), 12000),
    )
    return () => timers.forEach((id) => window.clearTimeout(id))
  }, [waveIndex, reduced])

  function finishWave() {
    if (liveRef.current.length > 0 || popsRef.current.length > 0) {
      return
    }
    if (busyRef.current) {
      return
    }

    busyRef.current = true
    onMood('celebrating')
    window.clearTimeout(timerRef.current)
    timerRef.current = window.setTimeout(() => {
      const next = waveIndexRef.current + 1
      if (next >= waves.length) {
        onComplete(starsFromMistakes(mistakesRef.current))
        return
      }
      waveIndexRef.current = next
      setWaveIndex(next)
      onRound(next)
      busyRef.current = false
      spawnWave(next)
    }, 520)
  }

  function miss() {
    if (busyRef.current) {
      return
    }
    mistakesRef.current += 1
    setWrong(true)
    onMood('tryAgain')
    window.clearTimeout(timerRef.current)
    timerRef.current = window.setTimeout(() => {
      setWrong(false)
      if (!busyRef.current) {
        onMood('thinking')
      }
    }, 700)
  }

  function escapeLetter(id: string) {
    if (!liveRef.current.some((entry) => entry.id === id)) {
      return
    }
    syncLive(liveRef.current.filter((entry) => entry.id !== id))
    miss()
    finishWave()
  }

  function popLetter(id: string) {
    const entry = liveRef.current.find((item) => item.id === id)
    if (!entry || busyRef.current) {
      return
    }

    const node = letterEls.current.get(id)
    const sky = skyRef.current
    let freeze: { x: number; y: number } | null = null
    if (!reduced && node && sky) {
      const skyBox = sky.getBoundingClientRect()
      const box = node.getBoundingClientRect()
      freeze = { x: box.left - skyBox.left, y: box.top - skyBox.top }
    }

    setWrong(false)
    syncLive(liveRef.current.filter((item) => item.id !== id))
    onMood('thinking')

    if (freeze) {
      syncPops([...popsRef.current, { id, letter: entry.letter, x: freeze.x, y: freeze.y }])
      return
    }

    finishWave()
  }

  function typeLetter(letter: string) {
    if (busyRef.current) {
      return
    }

    const match = liveRef.current.find((entry) => entry.letter === letter)
    if (!match) {
      miss()
      return
    }

    popLetter(match.id)
  }

  function handleRiseEnd(id: string, event: AnimationEvent<HTMLButtonElement>) {
    if (event.target !== event.currentTarget) {
      return
    }
    escapeLetter(id)
  }

  function handlePopEnd(id: string, event: AnimationEvent<HTMLDivElement>) {
    if (event.target !== event.currentTarget) {
      return
    }
    syncPops(popsRef.current.filter((entry) => entry.id !== id))
    finishWave()
  }

  typeRef.current = typeLetter

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.repeat || busyRef.current) {
        return
      }
      if (!isLetterKey(event.key)) {
        return
      }
      event.preventDefault()
      typeRef.current(event.key.toLowerCase())
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <div
      ref={skyRef}
      className={[styles.sky, wrong ? styles.wrong : ''].filter(Boolean).join(' ')}
    >
      {floaters.map((floater) => (
        <FloaterBit key={floater.id} floater={floater} />
      ))}
      {live.map((entry) => (
        <button
          key={entry.id}
          ref={(node) => {
            if (node) {
              letterEls.current.set(entry.id, node)
            } else {
              letterEls.current.delete(entry.id)
            }
          }}
          type="button"
          className={[styles.letter, reduced ? styles.resting : styles.rising].join(' ')}
          style={
            {
              '--x': `${entry.lane}%`,
              '--rise-ms': `${wave.riseMs}ms`,
              '--delay': `${entry.delayMs}ms`,
              '--rest-top': `${entry.restTop}%`,
            } as CSSProperties
          }
          aria-label={entry.letter}
          onClick={() => popLetter(entry.id)}
          onAnimationEnd={(event) => handleRiseEnd(entry.id, event)}
        >
          {entry.letter}
        </button>
      ))}
      {pops.map((entry) => (
        <div
          key={`pop-${entry.id}`}
          className={[styles.letter, styles.popping].join(' ')}
          style={
            {
              '--freeze-x': `${entry.x}px`,
              '--freeze-y': `${entry.y}px`,
            } as CSSProperties
          }
          aria-hidden="true"
          onAnimationEnd={(event) => handlePopEnd(entry.id, event)}
        >
          {entry.letter}
        </div>
      ))}
    </div>
  )
}

function FloaterBit({ floater }: { floater: Floater }) {
  const kindClass =
    floater.kind === 'confetti'
      ? styles.confetti
      : floater.kind === 'circle'
        ? styles.circle
        : floater.kind === 'triangle'
          ? styles.triangle
          : floater.kind === 'rainbow'
            ? styles.rainbow
            : ''

  return (
    <div
      className={[styles.floater, kindClass].filter(Boolean).join(' ')}
      style={
        {
          '--x': `${floater.x}%`,
          '--size': `${floater.size}px`,
          '--duration': `${floater.duration}ms`,
          '--delay': `${floater.delay}ms`,
          '--rest-top': `${floater.restTop}%`,
          '--bit-color': floater.color,
        } as CSSProperties
      }
      aria-hidden="true"
    >
      {floater.kind === 'star' ? <StarBit color={floater.color} /> : null}
      {floater.kind === 'heart' ? <HeartBit color={floater.color} /> : null}
      {floater.kind === 'rainbow' ? <RainbowBit /> : null}
    </div>
  )
}

function StarBit({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <polygon
        points="10,1.4 12.4,7.2 18.6,7.6 13.8,11.8 15.2,18 10,14.6 4.8,18 6.2,11.8 1.4,7.6 7.6,7.2"
        fill={color}
      />
    </svg>
  )
}

function HeartBit({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path
        d="M10 17.2 C10 17.2 2.2 12.2 2.2 6.8 A4 4 0 0 1 10 6.4 A4 4 0 0 1 17.8 6.8 C17.8 12.2 10 17.2 10 17.2Z"
        fill={color}
      />
    </svg>
  )
}

function RainbowBit() {
  return (
    <svg viewBox="0 0 32 16" aria-hidden="true">
      <path d="M3 14 A13 13 0 0 1 29 14" fill="none" stroke="var(--color-coral)" strokeWidth="2.4" />
      <path d="M7 14 A9 9 0 0 1 25 14" fill="none" stroke="var(--color-gold)" strokeWidth="2.4" />
      <path d="M11 14 A5 5 0 0 1 21 14" fill="none" stroke="var(--color-sky)" strokeWidth="2.4" />
    </svg>
  )
}
