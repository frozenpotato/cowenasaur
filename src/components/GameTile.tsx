import { DifficultyDots } from './DifficultyDots'
import { Star } from './Star'
import type { GameDefinition } from '../platform/registry'
import type { Difficulty, Stars } from '../platform/types'
import styles from './GameTile.module.css'

type GameTileProps = {
  game: GameDefinition
  selected: boolean
  unlocked: Difficulty[]
  difficulty: Difficulty
  bestStars: 0 | Stars
  onSelect: () => void
  onChooseDifficulty: (difficulty: Difficulty) => void
  onLockedDifficulty: () => void
}

export function GameTile({
  game,
  selected,
  unlocked,
  difficulty,
  bestStars,
  onSelect,
  onChooseDifficulty,
  onLockedDifficulty,
}: GameTileProps) {
  const { Illustration } = game

  return (
    <div
      className={[styles.tile, styles[game.accent], selected ? styles.selected : '']
        .filter(Boolean)
        .join(' ')}
    >
      <button type="button" className={styles.face} onClick={onSelect}>
        <Illustration className={styles.art} />
        <span className={styles.label}>{game.label}</span>
        <span className={styles.stars}>
          <Star filled={bestStars >= 1} />
          <Star filled={bestStars >= 2} />
          <Star filled={bestStars >= 3} />
        </span>
      </button>
      <DifficultyDots
        unlocked={unlocked}
        selected={difficulty}
        onChoose={onChooseDifficulty}
        onLocked={onLockedDifficulty}
      />
    </div>
  )
}
