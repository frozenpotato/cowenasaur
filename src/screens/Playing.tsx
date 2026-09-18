import { useState } from 'react'
import type { MascotMood } from '../components/Mascot'
import { CountingGame } from '../games/counting/CountingGame'
import { roundsForDifficulty } from '../games/counting/countingLogic'
import { DifferenceGame } from '../games/difference/DifferenceGame'
import { differenceCountFor } from '../games/difference/differenceLogic'
import { IdentifyGame } from '../games/identify/IdentifyGame'
import { identifyRoundsFor } from '../games/identify/identifyLogic'
import { MemoryGame } from '../games/memory/MemoryGame'
import { memoryPairsFor } from '../games/memory/memoryLogic'
import { PopGame } from '../games/pop/PopGame'
import { popRoundsFor } from '../games/pop/popLogic'
import { TypingGame } from '../games/typing/TypingGame'
import { typingRoundsFor } from '../games/typing/typingLogic'
import { WordsGame } from '../games/words/WordsGame'
import { wordsRoundsFor } from '../games/words/wordsLogic'
import { useProfile } from '../platform/profile'
import { getGame } from '../platform/registry'
import { GameShell } from '../platform/shell/GameShell'
import type { Difficulty, GameId, Stars } from '../platform/types'

type PlayingProps = {
  gameId: GameId
  onHome: () => void
}

export function Playing({ gameId, onHome }: PlayingProps) {
  const game = getGame(gameId)
  const { progress, recordResult } = useProfile()
  const difficulty = progress[gameId].selectedDifficulty
  const totalRounds = roundsFor(gameId, difficulty)
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
      round={result === null ? round : totalRounds - 1}
      totalRounds={totalRounds}
      result={result}
      onHome={onHome}
      onRetry={handleRetry}
    >
      <PlayField
        key={session}
        gameId={gameId}
        difficulty={difficulty}
        onMood={setMood}
        onRound={setRound}
        onComplete={handleComplete}
      />
    </GameShell>
  )
}

function PlayField({
  gameId,
  difficulty,
  onMood,
  onRound,
  onComplete,
}: {
  gameId: GameId
  difficulty: Difficulty
  onMood: (mood: MascotMood) => void
  onRound: (round: number) => void
  onComplete: (stars: Stars) => void
}) {
  const props = { difficulty, onMood, onRound, onComplete }

  switch (gameId) {
    case 'counting':
      return <CountingGame {...props} />
    case 'words':
      return <WordsGame {...props} />
    case 'identify':
      return <IdentifyGame {...props} />
    case 'memory':
      return <MemoryGame {...props} />
    case 'difference':
      return <DifferenceGame {...props} />
    case 'typing':
      return <TypingGame {...props} />
    case 'pop':
      return <PopGame {...props} />
  }
}

function roundsFor(gameId: GameId, difficulty: Difficulty) {
  switch (gameId) {
    case 'counting':
      return roundsForDifficulty(difficulty)
    case 'words':
      return wordsRoundsFor(difficulty)
    case 'identify':
      return identifyRoundsFor(difficulty)
    case 'memory':
      return memoryPairsFor(difficulty)
    case 'difference':
      return differenceCountFor(difficulty)
    case 'typing':
      return typingRoundsFor(difficulty)
    case 'pop':
      return popRoundsFor(difficulty)
  }
}
