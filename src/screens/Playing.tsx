import { useState } from 'react'
import { GameShell } from '../platform/shell/GameShell'
import { PlaceholderPlay, TOTAL_ROUNDS } from '../platform/shell/PlaceholderPlay'
import { getGame } from '../platform/registry'
import { useProfile } from '../platform/profile'
import type { GameId, Stars } from '../platform/types'
import type { MascotMood } from '../components/Mascot'

type PlayingProps = {
  gameId: GameId
  onHome: () => void
}

export function Playing({ gameId, onHome }: PlayingProps) {
  const game = getGame(gameId)
  const { progress, recordResult } = useProfile()
  const difficulty = progress[gameId].selectedDifficulty
  const [session, setSession] = useState(0)
  const [round, setRound] = useState(0)
  const [mood, setMood] = useState<MascotMood>('thinking')
  const [result, setResult] = useState<Stars | null>(null)

  function handleComplete(stars: Stars) {
    setMood('completed')
    setResult(stars)
    recordResult(gameId, difficulty, stars)
  }

  function handleRetry() {
    setResult(null)
    setRound(0)
    setMood('thinking')
    setSession((value) => value + 1)
  }

  return (
    <GameShell
      game={game}
      mood={mood}
      round={result === null ? round : TOTAL_ROUNDS - 1}
      totalRounds={TOTAL_ROUNDS}
      result={result}
      onHome={onHome}
      onRetry={handleRetry}
    >
      <PlaceholderPlay
        key={session}
        game={game}
        onMood={setMood}
        onRound={setRound}
        onComplete={handleComplete}
      />
    </GameShell>
  )
}
