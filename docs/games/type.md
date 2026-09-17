# Type

Type the letters of a word, one at a time. Dashboard label **Type**. Code id `typing`. Accent `apricot`. Family: type.

## Files

- `src/games/typing/TypingGame.tsx` — letter tiles, keyboard, tap
- `src/games/typing/typingLogic.ts` — round counts, shuffle, letter helpers
- `src/games/typing/wordList.ts` — **edit this list** to add/remove words
- `src/games/typing/TypingGame.module.css`

## Play

Each round is one word shown as large letter tiles. The current letter is lifted and tappable. Typed letters fill gold. Upcoming letters stay muted.

Correct next letter (key or tap on that tile) fills it and moves to the next. Wrong letter key, or tap on a future tile: `tryAgain`, mistake++, stay on the same letter. Already-typed tiles are inert. Non-letter keys (Shift, Space, arrows) are ignored, not mistakes. Key repeat is ignored.

When the word is complete: `celebrating` ~520ms, then the word lifts out and the next word eases in (~320ms + ~380ms). Last word goes to `onComplete` instead. Reduced motion skips the swap animation. No backspace.

Mistakes use `starsFromMistakes` at the end of the session.

## Word list

Categories (`body`, `animal`, `family`) are metadata only. **Every level shuffles the full pool.** Starter words:

- body: mouth, eyes, ears, hand, feet, nose, hair, arm, leg, toes, knee
- animal: dog, cat, elephant, giraffe, pig, hen, bee, fox, fish, frog, bird
- family: mother, father, daughter, grandmother, grandfather, sister, brother, baby, uncle, aunt

Keep entries lowercase letters only (no spaces or hyphens).

## Difficulty

| Level | Words (shell dots) |
| --- | --- |
| 1 | 5 |
| 2 | 7 |
| 3 | 10 |

## Input

- Pointer: tap the current letter tile (`aria-label` is that letter). Tap a later letter = miss.
- Keyboard: a–z maps onto the current visible tile. Case-insensitive.

## Shell feedback

- Start / after a correct letter that is not the last: `thinking`
- Miss: `tryAgain` 700ms
- Word finished: `celebrating`
- Session done: `onComplete`

## Do not

- Do not add an on-screen QWERTY.
- Do not persist from this folder.
- Do not filter the pool by category or word length; only round count changes with difficulty.
