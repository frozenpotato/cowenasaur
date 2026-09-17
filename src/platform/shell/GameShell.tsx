import type { ReactNode } from 'react'
import { Mascot, type MascotMood } from '../../components/Mascot'
import { Star } from '../../components/Star'
import { ToyButton } from '../../components/ToyButton'
import type { GameDefinition } from '../registry'
import type { Stars } from '../types'
import styles from './GameShell.module.css'

type GameShellProps = {
  game: GameDefinition
  mood: MascotMood
  round: number
  totalRounds: number
  result: Stars | null
  onHome: () => void
  onRetry: () => void
  children: ReactNode
}

export function GameShell({
  game,
  mood,
  round,
  totalRounds,
  result,
  onHome,
  onRetry,
  children,
}: GameShellProps) {
  const complete = result !== null

  return (
    <div className={[styles.shell, styles[game.accent]].join(' ')}>
      <header className={styles.chrome}>
        <button type="button" className={styles.home} onClick={onHome} aria-label="Home">
          <HomeIcon />
        </button>
        <div className={styles.dots} aria-hidden={complete}>
          {Array.from({ length: totalRounds }, (_, index) => (
            <span
              key={index}
              className={[styles.dot, index <= round ? styles.dotOn : styles.dotOff].join(' ')}
            />
          ))}
        </div>
        <Mascot mood={complete ? 'completed' : mood} size="sm" />
      </header>

      <div className={styles.play}>{complete ? null : children}</div>

      {complete ? (
        <div className={styles.overlay}>
          <Mascot mood="completed" size="md" />
          <div className={styles.reward}>
            <Star filled={result >= 1} size={56} />
            <Star filled={result >= 2} size={56} />
            <Star filled={result >= 3} size={56} />
          </div>
          <div className={styles.actions}>
            <ToyButton onClick={onRetry} aria-label="Play again">
              <AgainIcon />
            </ToyButton>
            <ToyButton variant="cream" onClick={onHome} aria-label="Home">
              <HomeIcon />
            </ToyButton>
          </div>
        </div>
      ) : null}
    </div>
  )
}

function HomeIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" aria-hidden="true">
      <path
        d="M6 16 L18 6 L30 16 V30 H22 V22 H14 V30 H6 Z"
        fill="currentColor"
      />
    </svg>
  )
}

function AgainIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" aria-hidden="true">
      <path
        d="M18 8 A10 10 0 1 1 8 18"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path d="M18 4 L18 14 L26 8 Z" fill="currentColor" />
    </svg>
  )
}
