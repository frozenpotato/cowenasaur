type CountDinoProps = {
  variant?: 0 | 1 | 2
  className?: string
}

const BODIES = ['#6b9a5a', '#4ea8a4', '#c9a24a']
const SHADOWS = ['#5a844c', '#3f8b87', '#a8842e']

export function CountDino({ variant = 0, className }: CountDinoProps) {
  const body = BODIES[variant]
  const shadow = SHADOWS[variant]

  return (
    <svg className={className} viewBox="0 0 84 72" aria-hidden="true">
      <path
        d="M48 40 C 64 34, 78 40, 80 52 C 81 58, 74 60, 62 54 C 54 50, 50 46, 48 42 Z"
        fill={body}
      />
      <ellipse cx="22" cy="64" rx="10" ry="5" fill={shadow} opacity="0.45" />
      <ellipse cx="44" cy="64" rx="11" ry="5" fill={shadow} opacity="0.45" />
      <path d="M16 40 C 12 54, 16 64, 26 64 C 34 64, 36 54, 32 40 Z" fill={body} />
      <path d="M34 38 C 30 54, 36 64, 48 64 C 58 64, 58 52, 52 38 Z" fill={body} />
      <ellipse cx="38" cy="42" rx="22" ry="16" fill={body} />
      <ellipse cx="36" cy="46" rx="12" ry="9" fill="var(--color-mascot-belly)" />
      <circle cx="28" cy="38" r="4" fill="var(--color-mascot-spots)" />
      <path d="M8 28 C -2 30, 0 42, 10 44 C 18 45, 24 40, 26 34 Z" fill={body} />
      <ellipse cx="22" cy="28" rx="16" ry="14" fill={body} />
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
    </svg>
  )
}
