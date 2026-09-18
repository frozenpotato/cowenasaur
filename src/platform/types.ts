export type GameId = 'memory' | 'words' | 'difference' | 'counting' | 'identify' | 'typing' | 'pop'

export type Difficulty = 1 | 2 | 3

export type Accent = 'coral' | 'teal' | 'gold' | 'leaf' | 'violet' | 'apricot' | 'rose'

export type Stars = 1 | 2 | 3

export type GameProgress = {
  unlockedDifficulties: Difficulty[]
  selectedDifficulty: Difficulty
  bestStarsByDifficulty: Partial<Record<Difficulty, Stars>>
  timesPlayed: number
  lastPlayedAt: number
}

export const DIFFICULTIES: Difficulty[] = [1, 2, 3]

export type AppView =
  | { screen: 'dashboard' }
  | { screen: 'playing'; gameId: GameId }
