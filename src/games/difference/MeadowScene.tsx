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
      <Dino x={friendDiff && right ? 128 : 148} />
      {friendDiff && right ? <Dino x={176} /> : null}
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
    />
  )
}

function Bird() {
  return (
    <g>
      <ellipse cx="64" cy="44" rx="14" ry="9" fill="var(--color-violet)" />
      <circle cx="76" cy="40" r="7" fill="var(--color-violet)" />
      <path d="M82 40 L92 38 L82 44 Z" fill="var(--color-gold)" />
      <circle cx="78" cy="39" r="1.6" fill="var(--color-ink)" />
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
    </g>
  )
}

function Dino({ x }: { x: number }) {
  return (
    <g transform={`translate(${x} 108)`}>
      <ellipse cx="22" cy="36" rx="20" ry="12" fill="var(--color-mascot-body)" />
      <ellipse cx="12" cy="18" rx="12" ry="10" fill="var(--color-mascot-body)" />
      <path d="M34 28 C 48 22, 56 30, 50 38" fill="var(--color-mascot-body)" />
      <circle cx="16" cy="16" r="2.2" fill="var(--color-ink)" />
      <ellipse cx="12" cy="22" rx="5" ry="3" fill="var(--color-mascot-belly)" />
    </g>
  )
}
