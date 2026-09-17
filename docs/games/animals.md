# Animals

See a picture, tap the matching animal picture. Dashboard label **Animals**. Code id `identify`. Accent `leaf`. Family: choice (`useChoiceRound`).

## Files

- `src/games/identify/IdentifyGame.tsx`
- `src/games/identify/identifyLogic.ts`
- `src/games/identify/IdentifyGame.module.css`

Uses animal (and bee) entries from `ITEMS`. Categories: `land`, `water`, `air`, `insect`.

## Play

Each round: prompt picture, then illustrated choice buttons. Same timing as Words. Wrong choice highlights that button. Correct advances after 520ms.

Keycaps `1`…`n` are visible on the buttons so keyboard slots match what the child sees. Keycap color is `--color-ink`.

## Difficulty

| Level | Choices | Rounds | Distractors | Pool |
| --- | --- | --- | --- | --- |
| 1 | 2 | 4 | Prefer **different category** | cat, fish, bird, pig, frog, bee |
| 2 | 3 | 4 | Prefer same category when possible | cat, dog, pig, hen, fox, bird, fish |
| 3 | 4 | 5 | Prefer same category | cat, dog, fox, pig, hen, frog, fish, bird, bee |

Answers = shuffled slice of the pool. Choices = answer + distractors sorted by category distance, then shuffled.

## Input

- Pointer: tap a pictured choice.
- Keyboard: `1`–`4` select the **nth visible button** (1-based). Keys without a button at that slot are ignored.

Unlike Words, keys are slot numbers, not letters, because choices are pictures.

## Shell feedback

`useChoiceRound`: `thinking`, `tryAgain` 700ms, `celebrating` 520ms, `onComplete`.

## Do not

- Do not mix object items (sun, hat, cup, egg, bus) into this pool.
- Do not hide the keycaps; keyboard must map onto visible controls.
- Do not persist from this folder.
