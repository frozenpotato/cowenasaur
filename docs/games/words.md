# Words

See a picture, tap the matching word. Dashboard label **Words**. Code id `words`. Accent `coral`. Family: choice (`useChoiceRound`).

## Files

- `src/games/words/WordsGame.tsx`
- `src/games/words/wordsLogic.ts`
- `src/games/words/WordsGame.module.css`

Content comes from `ITEMS` (`word` + illustration).

## Play

Each round: one prompt picture (`ItemArt`) and word buttons. Correct → brief `celebrating`, next round (or complete). Wrong → that button shakes, `tryAgain`, stay on the round. Busy after a correct pick until the 520ms advance.

Mistakes increment on every wrong tap (`starsFromMistakes` at the end).

## Difficulty

| Level | Choices | Rounds | Distractors | Pool |
| --- | --- | --- | --- | --- |
| 1 | 2 | 4 | Prefer **different first letter** | cat, sun, bus, egg, dog, hat |
| 2 | 2 | 4 | Prefer different first letter | + cup, pig |
| 3 | 3 | 5 | Prefer **same** first letter when possible | cat, cup, hat, hen, dog, bus, pig, sun, bee, fox |

Answers are a shuffled slice of the pool, one picture per round. Choices = answer + sorted distractors, then shuffled onto the row.

## Input

- Pointer: tap a word button.
- Keyboard: letter key matching the **first letter** of exactly one visible word. Ambiguous (two words with the same first letter) is ignored so the key always maps to one visible control.

## Shell feedback

`useChoiceRound` owns mood: `thinking` on each round, `tryAgain` 700ms on miss, `celebrating` 520ms on hit, then `onComplete`.

## Do not

- Do not ask the child to type the word.
- Do not reuse `useChoiceRound` with picture choices; that is Animals.
- Do not read IndexedDB from this folder.
