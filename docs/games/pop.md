# Pop

Letters float slowly up the sky. Type or tap a letter to pop it. Dashboard label **Pop**. Code id `pop`. Accent `rose`. Family: type.

## Files

- `src/games/pop/PopGame.tsx` — rising letters, pop animation, floaters, keyboard, tap
- `src/games/pop/popLogic.ts` — round counts, pools, waves, floater layout
- `src/games/pop/PopGame.module.css`

## Play

Each round is one wave of unique letters that spawn near the bottom and drift up. Smaller confetti, rainbows, and shapes float up behind them and are not tappable.

Correct letter (key that matches a rising tile, or tap on that tile) plays a pop and removes it. Wrong letter key: `tryAgain`, mistake++, letters keep rising. A letter that reaches the top without being popped is a miss and leaves. Non-letter keys (Shift, Space, arrows) are ignored, not mistakes. Key repeat is ignored. No backspace.

When the wave is empty: `celebrating` ~520ms, then the next wave. Last wave goes to `onComplete` instead. Reduced motion parks letters in the sky until typed, tapped, or a long timeout; it skips rise and pop motion.

Mistakes use `starsFromMistakes` at the end of the session.

## Letters

Each wave shuffles a difficulty pool and takes unique letters so one key maps to one tile.

- Level 1: `a b c d e h i m n o p s t`
- Level 2: `a b c d e f g h i k l m n o p r s t u w y`
- Level 3: `a`–`z`

## Difficulty

| Level | Waves (shell dots) | Letters per wave | Rise |
| --- | --- | --- | --- |
| 1 | 5 | 3 | ~9s |
| 2 | 7 | 4 | ~7s |
| 3 | 10 | 5 | ~5s |

## Input

- Pointer: tap a rising letter tile (`aria-label` is that letter).
- Keyboard: a–z maps onto the matching visible tile. Case-insensitive. A letter that is not on screen is a miss.

## Shell feedback

- Start / after a pop that is not the last in the wave: `thinking`
- Miss (wrong key or escape): `tryAgain` 700ms
- Wave finished: `celebrating`
- Session done: `onComplete`

## Do not

- Do not add an on-screen QWERTY.
- Do not persist from this folder.
- Do not make decorations as large as the letters.
