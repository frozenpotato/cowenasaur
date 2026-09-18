# Cowenasaur

Local-only learning play for a 3-year-old. One URL, no accounts, no backend. Stars and the mascot carry the experience; the child should not need to read.

This folder is the implementation contract. Prefer it over reconstructing rules from chat history.

## Run

```bash
npm install
npm run dev
```

`npm run build` typechecks, then bundles with Vite. Open the URL Vite prints.

## Stack

| Piece | Choice |
| --- | --- |
| UI | React 19 + TypeScript + Vite 7 |
| Routing | None. `AppView` is `dashboard` or `playing` + `gameId` |
| Style | CSS custom properties in `src/styles/tokens.css` + CSS Modules |
| State | `ProfileContext` + local hooks |
| Persistence | IndexedDB via `idb`, database `cowenasaur` v1 |
| Motion | CSS first. `canvas-confetti` plus CSS bits on completion |
| Content | Local TypeScript, local SVG. No remote assets |

Do not add Next.js, React Router, Tailwind, Redux/Zustand, a mega-engine, or a backend.

## Product rules

- Difficulty is **unlock-based**, shown as **1–3 dots**. Never label Easy / Medium / Hard. Never auto-advance to the next game or next level after a win. Replay unlocked levels freely.
- **2+ stars** on a level unlocks the next level for that game only.
- **Stars** are the only child-facing result. 3 / 2 / 1 from mistakes: 0 → 3, 1 → 2, 2+ → 1. The star jar is a running total (every completion adds stars; it is not “best only”).
- Mascot moods: `idle` / `thinking` / `celebrating` / `tryAgain` / `completed`. No extra moods.
- Keyboard is a second input that maps onto **visible** controls. Never a hidden shortcut.
- Games **never** read or write IndexedDB. They call `onMood`, `onRound`, and `onComplete`. `Playing` + `ProfileProvider` persist.
- There is no `soundEnabled` flag.
- Dashboard settings (gear, top-left) can hide games from the meadow. Hidden games keep their progress. At least one game must stay visible.

## Screens

`src/App.tsx` waits for profile `ready`, then shows meadow chrome (sky, sun, hills) around:

1. **Dashboard** (`src/screens/Dashboard.tsx`) — mascot, visible tiles from the registry, difficulty dots, star jar, and a top-left gear that opens settings (show/hide games).
2. **Playing** (`src/screens/Playing.tsx`) — `GameShell` plus the active game.

Home inside the shell is the way out. Browser Back is not a designed exit.

## Registry

`src/platform/registry.ts` is the catalog. Dashboard order:

| Label | `GameId` | Accent | Doc |
| --- | --- | --- | --- |
| Memory | `memory` | violet | [games/memory.md](games/memory.md) |
| Words | `words` | coral | [games/words.md](games/words.md) |
| Spot | `difference` | teal | [games/spot.md](games/spot.md) |
| Count | `counting` | gold | [games/count.md](games/count.md) |
| Animals | `identify` | leaf | [games/animals.md](games/animals.md) |
| Type | `typing` | apricot | [games/type.md](games/type.md) |
| Pop | `pop` | rose | [games/pop.md](games/pop.md) |

## Layout

```
src/
  App.tsx
  assets/illustrations/     items.tsx, games.tsx (tile art)
  components/               Mascot, ToyButton, Star, StarJar, GameTile, DifficultyDots, SettingsPanel
  games/<id>/               *Game.tsx, *Logic.ts, CSS, extra art
  platform/
    types.ts
    registry.ts
    scoring.ts              starsFromMistakes, shuffle, randomInt
    motion.ts               prefersReducedMotion
    celebrate.ts
    progressState.ts        unlock + best-star rules (pure)
    profile.tsx             context; load/save snapshot
    play/useChoiceRound.ts  shared choice-family loop
    persistence/            IndexedDB
    shell/GameShell.tsx
  screens/                  Dashboard, Playing
  styles/                   tokens.css, global.css, animations.css
```

## Game contract

Every play field receives:

```ts
{
  difficulty: 1 | 2 | 3
  onMood: (mood: MascotMood) => void
  onRound: (round: number) => void
  onComplete: (stars: Stars) => void
}
```

- `onRound` is 0-based progress for the shell dots.
- `onComplete` once per session. `Playing` then records stars and shows the overlay.
- Retry remounts the field with `key={session}`. Do not reset IndexedDB on retry.
- Keep domain rules in `*Logic.ts`. Keep SVG/interaction in the game component.

Three mechanic families (plus type):

| Family | Games | Shared helper |
| --- | --- | --- |
| Choice | Count, Words, Animals | `useChoiceRound` (Words/Animals); Count inlines the same loop |
| Memory | Memory | flip-match reducer in the game |
| Difference | Spot | dual scenes + hotspots |
| Type | Type, Pop | letter-by-letter / rising letters |

Do not collapse these into one engine.

## Scoring and unlocks

`src/platform/scoring.ts`:

- `starsFromMistakes(0) → 3`
- `starsFromMistakes(1) → 2`
- `starsFromMistakes(n≥2) → 1`

`src/platform/progressState.ts`:

- New game: only level 1 unlocked, selected 1.
- On complete: `timesPlayed++`, `lastPlayedAt`, best stars per level (max), **add** earned stars to `totalStars`.
- If `stars >= 2` and `difficulty < 3`, unlock `difficulty + 1`.
- Selecting a locked dot is a no-op (mascot `tryAgain`).

## Persistence

- DB name `cowenasaur`, version 1.
- Stores: `profile` (key `local`, `totalStars`, optional `hiddenGameIds`) and `progress` (key `gameId`).
- `ProfileProvider` loads on mount, writes on `recordResult` / `selectDifficulty` / `setGameHidden`. Extra profile fields do not require an IndexedDB version bump.
- Load/save failures log and fall back to empty in-memory state. Do not crash the child out of play.

## Shell and celebration

`GameShell` owns Home, round dots, small mascot, play area, and the completion overlay (stars, Play again, Home). Overlay gold wash + CSS confetti bits; `celebrate()` also paints `canvas-confetti` onto an overlay canvas.

Skip canvas confetti and hide CSS bits when `prefers-reduced-motion: reduce`.

## Visual language

- Tokens only: meadow, coral, gold, sky, violet, ink. New colors go in `tokens.css`.
- Locked dots use `--color-locked` (`#b7a48a`), not cream.
- Empty stars fill `--color-canvas-deep` and always stroke `--color-gold-deep`.
- Illustrations are inline SVG components, not image files.
- `prefers-reduced-motion` may drop animation, not selected-tile lift or selected-dot scale.

## Adding a game

1. Add a `GameId` in `types.ts`.
2. Register in `registry.ts` (label, accent, tile illustration).
3. Create `src/games/<id>/` with logic + component. Honor the game contract. Do not touch IndexedDB.
4. Wire the switch in `Playing.tsx` (`PlayField` + `roundsFor`).
5. Add `docs/games/<name>.md` and a row in the table above.

## Games

- [Memory](games/memory.md)
- [Words](games/words.md)
- [Spot](games/spot.md)
- [Count](games/count.md)
- [Animals](games/animals.md)
- [Type](games/type.md)
- [Pop](games/pop.md)
