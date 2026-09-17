export type WordCategory = 'body' | 'animal' | 'family'

export type TypingWord = {
  word: string
  category: WordCategory
}

/** Edit this list to add, remove, or recategorize words. All levels draw from the full pool. */
export const WORD_LIST: TypingWord[] = [
  { word: 'mouth', category: 'body' },
  { word: 'eyes', category: 'body' },
  { word: 'ears', category: 'body' },
  { word: 'hand', category: 'body' },
  { word: 'feet', category: 'body' },
  { word: 'nose', category: 'body' },
  { word: 'hair', category: 'body' },
  { word: 'arm', category: 'body' },
  { word: 'leg', category: 'body' },
  { word: 'toes', category: 'body' },
  { word: 'knee', category: 'body' },
  { word: 'dog', category: 'animal' },
  { word: 'cat', category: 'animal' },
  { word: 'elephant', category: 'animal' },
  { word: 'giraffe', category: 'animal' },
  { word: 'pig', category: 'animal' },
  { word: 'hen', category: 'animal' },
  { word: 'bee', category: 'animal' },
  { word: 'fox', category: 'animal' },
  { word: 'fish', category: 'animal' },
  { word: 'frog', category: 'animal' },
  { word: 'bird', category: 'animal' },
  { word: 'mother', category: 'family' },
  { word: 'father', category: 'family' },
  { word: 'daughter', category: 'family' },
  { word: 'grandmother', category: 'family' },
  { word: 'grandfather', category: 'family' },
  { word: 'sister', category: 'family' },
  { word: 'brother', category: 'family' },
  { word: 'baby', category: 'family' },
  { word: 'uncle', category: 'family' },
  { word: 'aunt', category: 'family' },
]
