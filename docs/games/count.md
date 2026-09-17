# Count

How many dinos? Dashboard label **Count**. Code id `counting`. Accent `gold`. Family: choice (inline loop, same timing as `useChoiceRound`).

## Files

- `src/games/counting/CountingGame.tsx`
- `src/games/counting/countingLogic.ts`
- `src/games/counting/CountDino.tsx`
- `src/games/counting/CountingGame.module.css`

`countingLogic` re-exports `starsFromMistakes` from `src/platform/scoring.ts`. Prefer importing scoring from the platform in new code.

## Play

Each round: a meadow of `CountDino` figures in fixed layouts, plus large number buttons. Correct number → `celebrating`, next round. Wrong number → that button marked, `tryAgain` 700ms, stay on the round.

Consecutive rounds avoid repeating the same count when the range allows it.

## Difficulty

| Level | Count range | Choices | Rounds | Distractors |
| --- | --- | --- | --- | --- |
| 1 | 1–3 | 2 | 4 | Prefer **far** from the answer |
| 2 | 1–5 | 2 | 4 | Prefer far |
| 3 | 1–6 | 3 | 5 | Prefer **near** |

Layouts live in `LAYOUTS` keyed by count (percent positions, rotation, variant 0–2). Dino draw size is 148px for counts ≤ 3, 108px otherwise.

## Input

- Pointer: tap a number button (`aria-label` is the digit).
- Keyboard: digit keys **only if that number is currently a visible choice**. Other digits do nothing.

## Shell feedback

Same as other choice games: `thinking` → `tryAgain` / `celebrating` → `onComplete(starsFromMistakes)`.

## Do not

- Do not show the count as text on the stage; the dinos are the prompt (`aria-label` `${count} dinosaurs`).
- Do not use `useChoiceRound` unless you also drop the layout/keyboard specifics. The loop is intentionally duplicated here because Count established the interaction language.
- Do not auto-skip to Words or another game after completion.
