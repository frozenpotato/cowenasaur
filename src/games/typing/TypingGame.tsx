import { useEffect, useRef, useState, type AnimationEvent } from 'react'
import type { MascotMood } from '../../components/Mascot'
import { prefersReducedMotion } from '../../platform/motion'
import { starsFromMistakes } from '../../platform/scoring'
import type { Difficulty, Stars } from '../../platform/types'
import { buildTypingSession, isLetterKey, lettersOf } from './typingLogic'
import styles from './TypingGame.module.css'

type TypingGameProps = {
  difficulty: Difficulty
  onMood: (mood: MascotMood) => void
  onRound: (round: number) => void
  onComplete: (stars: Stars) => void
}

type WordPhase = 'play' | 'leaving' | 'entering'

export function TypingGame({ difficulty, onMood, onRound, onComplete }: TypingGameProps) {
  const [words] = useState(() => buildTypingSession(difficulty))
  const [index, setIndex] = useState(0)
  const [cursor, setCursor] = useState(0)
  const [busy, setBusy] = useState(false)
  const [wrong, setWrong] = useState(false)
  const [phase, setPhase] = useState<WordPhase>('play')
  const mistakesRef = useRef(0)
  const timerRef = useRef(0)
  const nextIndexRef = useRef(0)
  const phaseRef = useRef<WordPhase>('play')
  const word = words[index]
  const letters = lettersOf(word)
  const typeRef = useRef<(letter: string) => void>(() => {})
  const busyRef = useRef(busy)
  busyRef.current = busy
  phaseRef.current = phase

  useEffect(() => {
    onMood('thinking')
  }, [index, onMood])

  useEffect(() => {
    return () => window.clearTimeout(timerRef.current)
  }, [])

  function showNextWord() {
    if (phaseRef.current !== 'leaving') {
      return
    }
    phaseRef.current = 'entering'
    const next = nextIndexRef.current
    setIndex(next)
    setCursor(0)
    onRound(next)
    setPhase('entering')
    window.clearTimeout(timerRef.current)
    timerRef.current = window.setTimeout(() => finishEnter(), 420)
  }

  function finishEnter() {
    if (phaseRef.current !== 'entering') {
      return
    }
    phaseRef.current = 'play'
    window.clearTimeout(timerRef.current)
    setPhase('play')
    setBusy(false)
  }

  function miss() {
    if (busy) {
      return
    }
    mistakesRef.current += 1
    setWrong(true)
    onMood('tryAgain')
    window.clearTimeout(timerRef.current)
    timerRef.current = window.setTimeout(() => {
      setWrong(false)
      onMood('thinking')
    }, 700)
  }

  function typeLetter(letter: string) {
    if (busy) {
      return
    }

    const expected = letters[cursor]
    if (letter.toLowerCase() !== expected) {
      miss()
      return
    }

    setWrong(false)
    const nextCursor = cursor + 1
    if (nextCursor >= letters.length) {
      setCursor(nextCursor)
      setBusy(true)
      onMood('celebrating')
      window.clearTimeout(timerRef.current)
      timerRef.current = window.setTimeout(() => {
        const next = index + 1
        if (next >= words.length) {
          onComplete(starsFromMistakes(mistakesRef.current))
          return
        }
        if (prefersReducedMotion()) {
          setIndex(next)
          setCursor(0)
          onRound(next)
          setBusy(false)
          return
        }
        nextIndexRef.current = next
        phaseRef.current = 'leaving'
        setPhase('leaving')
        timerRef.current = window.setTimeout(() => showNextWord(), 340)
      }, 520)
      return
    }

    setCursor(nextCursor)
    onMood('thinking')
  }

  function tapSlot(slot: number) {
    if (busy) {
      return
    }
    if (slot < cursor) {
      return
    }
    if (slot !== cursor) {
      miss()
      return
    }
    typeLetter(letters[slot])
  }

  function handleWordAnimationEnd(event: AnimationEvent<HTMLDivElement>) {
    if (event.target !== event.currentTarget) {
      return
    }
    if (phase === 'leaving') {
      showNextWord()
      return
    }
    if (phase === 'entering') {
      finishEnter()
    }
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
    <div className={styles.board}>
      <div
        className={[
          styles.word,
          phase === 'leaving' ? styles.leaving : '',
          phase === 'entering' ? styles.entering : '',
        ]
          .filter(Boolean)
          .join(' ')}
        aria-label={word}
        onAnimationEnd={handleWordAnimationEnd}
      >
        {letters.map((letter, slot) => {
          const done = slot < cursor
          const current = slot === cursor && !busy
          return (
            <button
              key={`${word}-${slot}`}
              type="button"
              className={[
                styles.letter,
                done ? styles.done : '',
                current ? styles.current : '',
                current && wrong ? styles.wrong : '',
              ]
                .filter(Boolean)
                .join(' ')}
              disabled={busy || done}
              aria-label={letter}
              aria-current={current ? 'true' : undefined}
              onClick={() => tapSlot(slot)}
            >
              {letter}
            </button>
          )
        })}
      </div>
    </div>
  )
}
