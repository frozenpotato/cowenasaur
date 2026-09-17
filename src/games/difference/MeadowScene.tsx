import type { DiffId } from './differenceLogic'

type MeadowProps = {
  side: 'left' | 'right'
  active: DiffId[]
}

export function MeadowScene({ side, active }: MeadowProps) {
  const right = side === 'right'
  const sunDiff = active.includes('sun')
  const birdDiff = active.includes('bird')
  const flowerDiff = active.includes('flower')
  const friendDiff = active.includes('friend')

  return (
    <svg viewBox="0 0 240 180" aria-hidden="true">
      <rect width="240" height="180" rx="24" fill="#c9ebe8" />
      <rect y="86" width="240" height="94" fill="#e7f6f1" />
      <ellipse cx="120" cy="190" rx="160" ry="80" fill="#8fb57a" />
      <ellipse cx="40" cy="120" rx="50" ry="18" fill="#7ca86a" />
      <rect x="44" y="48" width="12" height="70" rx="6" fill="#8a5a32" />
      <circle cx="50" cy="46" r="28" fill="#3f6f4e" />
      <circle cx="28" cy="58" r="18" fill="#4e865c" />
      <circle cx="72" cy="56" r="16" fill="#4e865c" />

      {sunDiff && right ? <Moon /> : <Sun />}
      {!birdDiff || !right ? <Bird /> : null}
      <Flower color={flowerDiff && right ? 'var(--color-gold)' : 'var(--color-coral)'} />
      <Dino x={friendDiff && right ? 108 : 142} />
      {friendDiff && right ? <Dino x={164} /> : null}
    </svg>
  )
}

function Sun() {
  return (
    <g>
      <circle cx="188" cy="36" r="18" fill="var(--color-sun)" />
      <circle cx="188" cy="36" r="12" fill="var(--color-gold)" />
    </g>
  )
}

function Moon() {
  return (
    <path
      d="M196 22 C 176 28, 176 56, 198 58 C 186 52, 184 30, 196 22 Z"
      fill="var(--color-canvas)"
      stroke="var(--color-gold-deep)"
      strokeWidth="3"
      strokeLinejoin="round"
    />
  )
}

function Bird() {
  return (
    <g>
      <ellipse cx="64" cy="44" rx="14" ry="9" fill="var(--color-violet)" />
      <path d="M54 44 Q46 32 62 36" fill="var(--color-violet-deep)" />
      <circle cx="76" cy="40" r="7" fill="var(--color-violet)" />
      <path d="M82 40 L92 38 L82 44 Z" fill="var(--color-gold)" />
      <circle cx="78" cy="39" r="1.8" fill="var(--color-ink)" />
      <circle cx="78.6" cy="38.4" r="0.6" fill="#fff" />
    </g>
  )
}

function Flower({ color }: { color: string }) {
  return (
    <g>
      <rect x="36" y="128" width="6" height="22" rx="3" fill="var(--color-meadow-deep)" />
      <circle cx="29" cy="124" r="8" fill={color} />
      <circle cx="49" cy="124" r="8" fill={color} />
      <circle cx="39" cy="114" r="8" fill={color} />
      <circle cx="39" cy="132" r="8" fill={color} />
      <circle cx="39" cy="124" r="6" fill="var(--color-gold)" />
      <circle cx="39" cy="124" r="2.4" fill="var(--color-gold-deep)" />
    </g>
  )
}

function Dino({ x }: { x: number }) {
  return (
    <g transform={`translate(${x} 104) scale(0.62)`}>
      <path
        d="M48 40 C 64 34, 78 40, 80 52 C 81 58, 74 60, 62 54 C 54 50, 50 46, 48 42 Z"
        fill="var(--color-mascot-body)"
      />
      <ellipse cx="22" cy="64" rx="10" ry="5" fill="var(--color-mascot-body-shadow)" opacity="0.45" />
      <ellipse cx="44" cy="64" rx="11" ry="5" fill="var(--color-mascot-body-shadow)" opacity="0.45" />
      <path d="M16 40 C 12 54, 16 64, 26 64 C 34 64, 36 54, 32 40 Z" fill="var(--color-mascot-body)" />
      <path d="M34 38 C 30 54, 36 64, 48 64 C 58 64, 58 52, 52 38 Z" fill="var(--color-mascot-body)" />
      <ellipse cx="38" cy="42" rx="22" ry="16" fill="var(--color-mascot-body)" />
      <ellipse cx="36" cy="46" rx="12" ry="9" fill="var(--color-mascot-belly)" />
      <circle cx="28" cy="38" r="4" fill="var(--color-mascot-spots)" />
      <path d="M8 28 C -2 30, 0 42, 10 44 C 18 45, 24 40, 26 34 Z" fill="var(--color-mascot-body)" />
      <ellipse cx="22" cy="28" rx="16" ry="14" fill="var(--color-mascot-body)" />
      <circle cx="24" cy="24" r="4.2" fill="#fff" />
      <circle cx="25" cy="25" r="2.2" fill="var(--color-ink)" />
      <circle cx="26" cy="24.2" r="0.8" fill="#fff" />
      <path
        d="M6 32 Q 14 38 22 34"
        fill="none"
        stroke="var(--color-ink)"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </g>
  )
}
