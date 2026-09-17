# Memory

Flip cards, match pairs. Dashboard label **Memory**. Code id `memory`. Accent `violet`. Family: memory.

## Files

- `src/games/memory/MemoryGame.tsx` — board, flip reducer, keyboard
- `src/games/memory/memoryLogic.ts` — pair counts, tile shuffle, match test
- `src/games/memory/MemoryGame.module.css`

Uses `ITEMS` from `src/assets/illustrations/items.tsx`. Pool: cat, dog, pig, hen, fish, frog, bird, fox.

## Play

One board per session. Cards start face down. Tap a card to flip; tap a second. Match stays up. Mismatch flips back after 800ms (`locked`). Session ends when every pair is matched.

Progress dots = **number of pairs** (not individual cards). `onRound` fires as matches accumulate (`min(matched, pairs - 1)`). Completion after 520ms.

Mistakes = mismatch count (`starsFromMistakes`).

## Difficulty

| Level | Pairs | Cards |
| --- | --- | --- |
| 1 | 2 | 4 |
| 2 | 3 | 6 |
| 3 | 4 | 8 |

`memoryPairsFor` / `buildMemoryTiles` pick `pairs` random items from the pool, duplicate each (`-a` / `-b` keys), shuffle.

## Input

- Pointer: tap a face-down unmatched card.
- Keyboard: Left/Right move focus among unmatched cards. Space/Enter on the focused button is the native click — maps onto the visible card.

While `locked` or complete, flips are ignored.

## Shell feedback

- Start / after resolve: `thinking`
- Match: `celebrating`
- Mismatch: `tryAgain` until cards flip back
- All pairs: `onComplete`

## Do not

- Do not persist mid-board state.
- Do not show words on the card back. Face-up `aria-label` is the item word; face-down is `Card`.
- Do not treat a third flip as allowed while two unmatched cards are showing.
