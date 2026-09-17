import type { Difficulty } from '../platform/types'
import { DIFFICULTIES } from '../platform/types'
import styles from './DifficultyDots.module.css'

type DifficultyDotsProps = {
  unlocked: Difficulty[]
  selected: Difficulty
  onChoose: (difficulty: Difficulty) => void
  onLocked: () => void
}

export function DifficultyDots({
  unlocked,
  selected,
  onChoose,
  onLocked,
}: DifficultyDotsProps) {
  return (
    <div className={styles.row}>
      {DIFFICULTIES.map((difficulty) => {
        const isUnlocked = unlocked.includes(difficulty)
        const isSelected = selected === difficulty
        return (
          <button
            key={difficulty}
            type="button"
            className={[
              styles.dot,
              isUnlocked ? styles.unlocked : styles.locked,
              isSelected ? styles.selected : '',
            ]
              .filter(Boolean)
              .join(' ')}
            aria-label={dotLabel(difficulty, isUnlocked, isSelected)}
            onClick={(event) => {
              event.stopPropagation()
              if (isUnlocked) {
                onChoose(difficulty)
              } else {
                onLocked()
              }
            }}
          />
        )
      })}
    </div>
  )
}

function dotLabel(difficulty: Difficulty, unlocked: boolean, selected: boolean) {
  if (!unlocked) {
    return `Level ${difficulty}, not yet unlocked`
  }
  if (selected) {
    return `Level ${difficulty}, selected`
  }
  return `Level ${difficulty}`
}
