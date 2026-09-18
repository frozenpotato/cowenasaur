import { useEffect, useState } from 'react'
import { GAMES } from '../platform/registry'
import type { GameId } from '../platform/types'
import { ToyButton } from './ToyButton'
import styles from './SettingsPanel.module.css'

type SettingsPanelProps = {
  hiddenGameIds: GameId[]
  onToggle: (gameId: GameId, hidden: boolean) => boolean
  onClose: () => void
}

export function SettingsPanel({ hiddenGameIds, onToggle, onClose }: SettingsPanelProps) {
  const hidden = new Set(hiddenGameIds)
  const [notice, setNotice] = useState('')

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onClose])

  return (
    <div className={styles.overlay}>
      <div className={styles.sheet} role="dialog" aria-label="Settings" aria-modal="true">
        <h2 className={styles.title}>Games</h2>
        <p className={styles.hint}>Hide a game to keep it off the meadow.</p>
        <ul className={styles.list}>
          {GAMES.map((game) => {
            const shown = !hidden.has(game.id)
            return (
              <li key={game.id}>
                <button
                  type="button"
                  className={[styles.row, shown ? styles.shown : styles.hidden].join(' ')}
                  aria-pressed={shown}
                  onClick={() => {
                    const ok = onToggle(game.id, shown)
                    setNotice(ok ? '' : 'Keep at least one game on the meadow.')
                  }}
                >
                  <span className={styles.label}>{game.label}</span>
                  <span className={styles.state}>{shown ? 'On' : 'Off'}</span>
                </button>
              </li>
            )
          })}
        </ul>
        {notice ? <p className={styles.notice}>{notice}</p> : null}
        <ToyButton className={styles.done} variant="coral" onClick={onClose} aria-label="Done">
          Done
        </ToyButton>
      </div>
    </div>
  )
}
