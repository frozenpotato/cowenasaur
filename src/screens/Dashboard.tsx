import { useEffect, useRef, useState } from 'react'
import { GameTile } from '../components/GameTile'
import { Mascot, type MascotMood } from '../components/Mascot'
import { SettingsPanel } from '../components/SettingsPanel'
import { StarJar } from '../components/StarJar'
import { useProfile } from '../platform/profile'
import { bestStarsFor, visibleGames } from '../platform/progressState'
import type { Difficulty, GameId } from '../platform/types'
import styles from './Dashboard.module.css'

type DashboardProps = {
  onPlay: (gameId: GameId) => void
}

export function Dashboard({ onPlay }: DashboardProps) {
  const { totalStars, progress, hiddenGameIds, selectDifficulty, setGameHidden } = useProfile()
  const [mood, setMood] = useState<MascotMood>('idle')
  const [selectedGame, setSelectedGame] = useState<GameId | null>(null)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const resetRef = useRef<number>(0)
  const games = visibleGames(hiddenGameIds)

  useEffect(() => {
    return () => window.clearTimeout(resetRef.current)
  }, [])

  function setMoodFor(next: MascotMood, duration: number) {
    window.clearTimeout(resetRef.current)
    setMood(next)
    resetRef.current = window.setTimeout(() => {
      setMood('idle')
    }, duration)
  }

  function handleSelect(gameId: GameId) {
    onPlay(gameId)
  }

  function handleDifficulty(gameId: GameId, difficulty: Difficulty) {
    const unlocked = selectDifficulty(gameId, difficulty)
    if (!unlocked) {
      setMoodFor('tryAgain', 900)
      return
    }
    window.clearTimeout(resetRef.current)
    setSelectedGame(gameId)
    setMood('idle')
  }

  function handleLocked() {
    setMoodFor('tryAgain', 900)
  }

  return (
    <div className={styles.dashboard}>
      <button
        type="button"
        className={styles.settings}
        onClick={() => setSettingsOpen(true)}
        aria-label="Settings"
      >
        <GearIcon />
      </button>

      <header className={styles.header}>
        <button
          type="button"
          className={styles.mascotHit}
          onClick={() => setMoodFor('celebrating', 1600)}
          aria-label="Cowenasaur says hello"
        >
          <Mascot mood={mood} size="sm" />
        </button>
        <h1 className={styles.title}>Cowenasaur</h1>
      </header>

      <div className={styles.games}>
        {games.map((game) => {
          const gameProgress = progress[game.id]
          return (
            <GameTile
              key={game.id}
              game={game}
              selected={selectedGame === game.id}
              unlocked={gameProgress.unlockedDifficulties}
              difficulty={gameProgress.selectedDifficulty}
              bestStars={bestStarsFor(gameProgress, gameProgress.selectedDifficulty)}
              onSelect={() => handleSelect(game.id)}
              onChooseDifficulty={(difficulty) => handleDifficulty(game.id, difficulty)}
              onLockedDifficulty={handleLocked}
            />
          )
        })}
      </div>

      <StarJar totalStars={totalStars} />

      {settingsOpen ? (
        <SettingsPanel
          hiddenGameIds={hiddenGameIds}
          onToggle={(gameId, shown) => setGameHidden(gameId, shown)}
          onClose={() => setSettingsOpen(false)}
        />
      ) : null}
    </div>
  )
}

function GearIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" aria-hidden="true">
      <path
        d="M14 4 H22 L23.5 8.5 L28 7 L32 13 L28.5 16.5 L32 20 L28 26 L23.5 24.5 L22 32 H14 L12.5 24.5 L8 26 L4 20 L7.5 16.5 L4 13 L8 7 L12.5 8.5 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinejoin="round"
      />
      <circle cx="18" cy="18" r="5" fill="none" stroke="currentColor" strokeWidth="2.6" />
    </svg>
  )
}
