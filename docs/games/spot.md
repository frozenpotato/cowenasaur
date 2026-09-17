# Spot

Find differences between two meadow scenes. Dashboard label **Spot**. Code id `difference`. Accent `teal`. Family: difference.

## Files

- `src/games/difference/DifferenceGame.tsx` — dual scenes, hotspots, miss handling
- `src/games/difference/differenceLogic.ts` — which differences exist
- `src/games/difference/MeadowScene.tsx` — composed SVG
- `src/games/difference/DifferenceGame.module.css`

## Play

One round: left scene is the “true” meadow; right scene changes the active differences. Invisible hotspots sit on **both** sides at the same percentages. Tap a hotspot → found (both sides). Tap empty scene → miss.

Session ends when every active difference is found. 520ms then `onComplete`.

Mistakes = empty-scene taps (`starsFromMistakes`). Tapping an already-found hotspot is ignored.

## Differences

Fixed order in `SPOTS` (not shuffled). Level N uses the first N entries:

| Order | Id | What changes on the right |
| --- | --- | --- |
| 1 | `sun` | Sun becomes a moon |
| 2 | `friend` | Extra dino appears |
| 3 | `bird` | Bird is missing |
| 4 | `flower` | Flower is gold instead of coral |

| Level | Differences |
| --- | --- |
| 1 | 2 |
| 2 | 3 |
| 3 | 4 |

Progress dots = difference count. `onRound(foundCount)` after each find that is not the last.

`MeadowScene` takes `side` (`left` / `right`) and `active` ids. Only **active** diffs are applied on the right; inactive diffs stay identical so unused hotspots are not lying.

## Input

- Pointer only. Hotspots are the visible (hit) controls; they have `aria-label` `Spot` / `Found`.
- Scene click = miss. Hotspot click `stopPropagation`.
- No keyboard map: there is no labeled key on a hotspot. Do not invent number keys for spots.

## Shell feedback

- Start: `thinking`
- Find: `celebrating`, then `thinking` unless complete
- Miss: `tryAgain` 700ms, scene uses `.miss`

## Art notes

Dinos in the scene are scaled-down T-rexes (same family as Count / mascot), not blobs. Moon has a gold-deep stroke so it reads on the sky.

## Do not

- Do not randomize which diffs appear; order is the difficulty ramp.
- Do not complete on a miss.
- Do not put persistence in this game.
