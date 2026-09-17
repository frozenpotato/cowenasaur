import { useEffect, useRef, useState } from 'react'
import { ItemArt } from '../../assets/illustrations/items'
import type { MascotMood } from '../../components/Mascot'
import { useChoiceRound } from '../../platform/play/useChoiceRound'
import type { Difficulty, Stars } from '../../platform/types'
import { buildWordsSession } from './wordsLogic'
import styles from './WordsGame.module.css'

type WordsGameProps = {
  difficulty: Difficulty
  onMood: (mood: MascotMood) => void
  onRound: (round: number) => void
  onComplete: (stars: Stars) => void
}

export function WordsGame({ difficulty, onMood, onRound, onComplete }: WordsGameProps) {
  const [rounds] = useState(() => buildWordsSession(difficulty))
  const { index, busy, wrong, choose } = useChoiceRound<string>({
    totalRounds: rounds.length,
    onMood,
    onRound,
    onComplete,
  })
  const round = rounds[index]
  const chooseRef = useRef(choose)
  const choicesRef = useRef(round.choices)
  const answerRef = useRef(round.answer.id)
  chooseRef.current = choose
  choicesRef.current = round.choices
  answerRef.current = round.answer.id

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.repeat) {
        return
      }
      const key = event.key.toLowerCase()
      const matches = choicesRef.current.filter((item) => item.word[0] === key)
      if (matches.length === 1) {
        event.preventDefault()
        chooseRef.current(matches[0].id, matches[0].id === answerRef.current)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <div className={styles.board}>
      <div className={styles.prompt} aria-label={round.answer.word}>
        <ItemArt id={round.answer.id} className={styles.picture} />
      </div>
      <div className={styles.choices}>
        {round.choices.map((item) => (
          <button
            key={item.id}
            type="button"
            className={[styles.choice, wrong === item.id ? styles.choiceWrong : '']
              .filter(Boolean)
              .join(' ')}
            disabled={busy}
            aria-label={item.word}
            onClick={() => choose(item.id, item.id === round.answer.id)}
          >
            {item.word}
          </button>
        ))}
      </div>
    </div>
  )
}
