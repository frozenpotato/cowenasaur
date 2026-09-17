type ArtProps = {
  className?: string
}

export function MemoryArt({ className }: ArtProps) {
  return (
    <svg className={className} viewBox="0 0 120 88" aria-hidden="true">
      <rect x="8" y="18" width="52" height="62" rx="12" fill="var(--color-violet-deep)" />
      <circle cx="34" cy="40" r="5" fill="var(--color-canvas)" />
      <circle cx="34" cy="56" r="5" fill="var(--color-canvas)" />
      <rect x="48" y="8" width="52" height="62" rx="12" fill="var(--color-violet)" />
      <rect x="54" y="14" width="40" height="50" rx="8" fill="var(--color-canvas)" />
      <polygon points="74,28 77,36 86,37 79,43 81,52 74,47 67,52 69,43 62,37 71,36" fill="var(--color-gold)" />
    </svg>
  )
}

export function WordsArt({ className }: ArtProps) {
  return (
    <svg className={className} viewBox="0 0 120 88" aria-hidden="true">
      <text
        x="60"
        y="62"
        textAnchor="middle"
        fill="var(--color-coral)"
        fontFamily="Fredoka, sans-serif"
        fontSize="48"
        fontWeight="700"
      >
        cat
      </text>
    </svg>
  )
}

export function SpotArt({ className }: ArtProps) {
  return (
    <svg className={className} viewBox="0 0 120 88" aria-hidden="true">
      <ellipse cx="36" cy="50" rx="22" ry="26" fill="var(--color-sky)" />
      <ellipse cx="36" cy="58" rx="12" ry="14" fill="var(--color-canvas)" />
      <ellipse cx="86" cy="50" rx="22" ry="26" fill="var(--color-sky)" />
      <ellipse cx="86" cy="58" rx="12" ry="14" fill="var(--color-canvas)" />
      <circle cx="98" cy="34" r="9" fill="var(--color-coral)" />
    </svg>
  )
}

export function CountArt({ className }: ArtProps) {
  return (
    <svg className={className} viewBox="0 0 120 88" aria-hidden="true">
      <circle cx="30" cy="46" r="16" fill="var(--color-gold)" />
      <circle cx="60" cy="46" r="16" fill="var(--color-gold)" />
      <circle cx="90" cy="46" r="16" fill="var(--color-gold)" />
    </svg>
  )
}

export function AnimalsArt({ className }: ArtProps) {
  return (
    <svg className={className} viewBox="0 0 120 88" aria-hidden="true">
      <circle cx="60" cy="52" r="24" fill="var(--color-meadow)" />
      <circle cx="42" cy="32" r="11" fill="var(--color-meadow)" />
      <circle cx="78" cy="32" r="11" fill="var(--color-meadow)" />
      <circle cx="44" cy="32" r="4.5" fill="var(--color-mascot-ear)" />
      <circle cx="76" cy="32" r="4.5" fill="var(--color-mascot-ear)" />
      <circle cx="52" cy="50" r="3.5" fill="var(--color-ink)" />
      <circle cx="68" cy="50" r="3.5" fill="var(--color-ink)" />
      <ellipse cx="60" cy="60" rx="5" ry="3.5" fill="var(--color-mascot-ear)" />
    </svg>
  )
}

export function TypeArt({ className }: ArtProps) {
  return (
    <svg className={className} viewBox="0 0 120 88" aria-hidden="true">
      <rect x="18" y="22" width="28" height="36" rx="8" fill="var(--color-apricot)" />
      <rect x="46" y="14" width="28" height="44" rx="8" fill="var(--color-gold)" />
      <rect x="74" y="22" width="28" height="36" rx="8" fill="var(--color-apricot)" />
      <text
        x="32"
        y="48"
        textAnchor="middle"
        fill="var(--color-ink)"
        fontFamily="Fredoka, sans-serif"
        fontSize="22"
        fontWeight="700"
      >
        a
      </text>
      <text
        x="60"
        y="44"
        textAnchor="middle"
        fill="var(--color-ink)"
        fontFamily="Fredoka, sans-serif"
        fontSize="22"
        fontWeight="700"
      >
        b
      </text>
      <text
        x="88"
        y="48"
        textAnchor="middle"
        fill="var(--color-ink)"
        fontFamily="Fredoka, sans-serif"
        fontSize="22"
        fontWeight="700"
      >
        c
      </text>
    </svg>
  )
}
