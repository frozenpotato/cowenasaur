import { useEffect, useRef, useState } from 'react'
import { ItemArt } from '../../assets/illustrations/items'
import type { MascotMood } from '../../components/Mascot'
import { useChoiceRound } from '../../platform/play/useChoiceRound'
import type { Difficulty, Stars } from '../../platform/types'
import { buildIdentifySession } from './identifyLogic'
import styles from './IdentifyGame.module.css'

type IdentifyGameProps = {
  difficulty: Difficulty
  onMood: (mood: MascotMood) => void
  onRound: (round: number) => void
  onComplete: (stars: Stars) => void
}

export function IdentifyGame({ difficulty, onMood, onRound, onComplete }: IdentifyGameProps) {
  const [rounds] = useState(() => buildIdentifySession(difficulty))
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
      const slot = Number(event.key)
      const choice = choicesRef.current[slot - 1]
      if (!choice) {
        return
      }
      event.preventDefault()
      chooseRef.current(choice.id, choice.id === answerRef.current)
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
        {round.choices.map((item, slot) => (
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
            <ItemArt id={item.id} className={styles.option} />
            <span className={styles.keycap}>{slot + 1}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
