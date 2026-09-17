import { useEffect, useRef, useState } from 'react'
import { GameTile } from '../components/GameTile'
import { Mascot, type MascotMood } from '../components/Mascot'
import { StarJar } from '../components/StarJar'
import { GAMES } from '../platform/registry'
import { bestStarsFor, useProfile } from '../platform/profile'
import type { Difficulty, GameId } from '../platform/types'
import styles from './Dashboard.module.css'

export function Dashboard() {
  const { totalStars, progress, selectDifficulty } = useProfile()
  const [mood, setMood] = useState<MascotMood>('idle')
  const [selectedGame, setSelectedGame] = useState<GameId | null>(null)
  const resetRef = useRef<number>(0)

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
    setSelectedGame(gameId)
    setMoodFor('celebrating', 1200)
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
        {GAMES.map((game) => {
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
    </div>
  )
}
