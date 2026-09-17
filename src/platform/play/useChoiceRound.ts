import { useEffect, useRef, useState } from 'react'
import type { MascotMood } from '../../components/Mascot'
import { starsFromMistakes } from '../scoring'
import type { Stars } from '../types'

type UseChoiceRoundOptions = {
  totalRounds: number
  onMood: (mood: MascotMood) => void
  onRound: (round: number) => void
  onComplete: (stars: Stars) => void
}

export function useChoiceRound<Choice>(options: UseChoiceRoundOptions) {
  const { totalRounds, onMood, onRound, onComplete } = options
  const [index, setIndex] = useState(0)
  const [busy, setBusy] = useState(false)
  const [wrong, setWrong] = useState<Choice | null>(null)
  const mistakesRef = useRef(0)
  const timerRef = useRef(0)

  useEffect(() => {
    onMood('thinking')
  }, [index, onMood])

  useEffect(() => {
    return () => window.clearTimeout(timerRef.current)
  }, [])

  function choose(choice: Choice, correct: boolean) {
    if (busy) {
      return
    }

    if (!correct) {
      mistakesRef.current += 1
      setWrong(choice)
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
      if (next >= totalRounds) {
        onComplete(starsFromMistakes(mistakesRef.current))
        return
      }
      setIndex(next)
      onRound(next)
      setBusy(false)
    }, 520)
  }

  return { index, busy, wrong, choose }
}
