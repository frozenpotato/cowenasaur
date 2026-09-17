import styles from './Mascot.module.css'

export type MascotMood =
  | 'idle'
  | 'thinking'
  | 'celebrating'
  | 'tryAgain'
  | 'completed'

type MascotProps = {
  mood?: MascotMood
  size?: 'md' | 'lg'
  className?: string
}

export function Mascot({ mood = 'idle', size = 'lg', className }: MascotProps) {
  const classes = [styles.root, styles[size], className].filter(Boolean).join(' ')
  const celebrating = mood === 'celebrating' || mood === 'completed'

  return (
    <div className={classes} data-mood={mood} aria-hidden="true">
      <svg className={styles.svg} viewBox="0 0 280 240" aria-hidden="true">
        <g className={styles.tail}>
          <path
            d="M158 150 C 210 132, 248 148, 258 178 C 264 196, 242 204, 198 186 C 176 176, 162 164, 156 156 Z"
            fill="var(--color-mascot-body)"
          />
          <ellipse cx="232" cy="176" rx="8" ry="7" fill="var(--color-mascot-spots)" />
          <ellipse cx="206" cy="168" rx="7" ry="6" fill="var(--color-mascot-spots)" />
        </g>

        <ellipse cx="118" cy="222" rx="20" ry="9" fill="var(--color-mascot-body-shadow)" />
        <ellipse cx="168" cy="224" rx="24" ry="10" fill="var(--color-mascot-body-shadow)" />

        <path
          d="M108 168 C 98 198, 104 224, 122 226 C 138 228, 142 204, 134 168 Z"
          fill="var(--color-mascot-body-shadow)"
        />
        <path
          d="M148 160 C 140 198, 150 226, 172 228 C 192 230, 194 200, 176 160 Z"
          fill="var(--color-mascot-body)"
        />
        <ellipse cx="164" cy="226" rx="20" ry="8" fill="var(--color-mascot-body)" />
        <ellipse cx="148" cy="230" rx="5" ry="4" fill="var(--color-mascot-body)" />
        <ellipse cx="164" cy="232" rx="5" ry="4" fill="var(--color-mascot-body)" />
        <ellipse cx="180" cy="230" rx="5" ry="4" fill="var(--color-mascot-body)" />

        <g className={styles.body}>
          <ellipse
            cx="148"
            cy="158"
            rx="50"
            ry="40"
            fill="var(--color-mascot-body)"
            transform="rotate(-16 148 158)"
          />
          <ellipse
            cx="138"
            cy="170"
            rx="26"
            ry="24"
            fill="var(--color-mascot-belly)"
            transform="rotate(-18 138 170)"
          />
          <circle cx="168" cy="148" r="7" fill="var(--color-mascot-spots)" />
          <circle cx="182" cy="162" r="5" fill="var(--color-mascot-spots)" />
        </g>

        <TinyArm
          x={celebrating ? 102 : 108}
          y={celebrating ? 128 : 150}
          rotation={mood === 'thinking' ? -18 : celebrating ? -55 : 42}
        />
        <TinyArm
          x={celebrating ? 128 : 126}
          y={celebrating ? 124 : 146}
          rotation={mood === 'thinking' ? 8 : celebrating ? -70 : 28}
        />

        <g className={styles.head}>
          <ellipse cx="118" cy="128" rx="22" ry="18" fill="var(--color-mascot-body)" />

          <ellipse cx="108" cy="96" rx="46" ry="40" fill="var(--color-mascot-body)" />
          <path
            d="M78 84 C 36 86, 14 102, 18 122 C 22 142, 46 144, 82 130 C 92 124, 96 112, 94 98 Z"
            fill="var(--color-mascot-body)"
          />
          <path
            d="M78 118 C 42 128, 28 136, 32 142 C 40 152, 68 146, 88 134 Z"
            fill="var(--color-mascot-belly)"
          />
          <path
            d="M92 62 Q 112 48 132 66 Q 122 60 110 62 Q 98 64 92 62 Z"
            fill="var(--color-mascot-body-shadow)"
          />

          <ellipse cx="86" cy="118" rx="9" ry="7" fill="var(--color-mascot-ear)" opacity="0.5" />

          {celebrating ? (
            <path
              d="M96 88 Q 110 74 122 88"
              fill="none"
              stroke="var(--color-ink)"
              strokeWidth="5"
              strokeLinecap="round"
            />
          ) : (
            <g className={styles.eyes}>
              <ellipse cx="78" cy="86" rx="7" ry="8" fill="#fff" opacity="0.9" />
              <circle cx="79" cy="88" r="3.2" fill="var(--color-ink)" />
              <ellipse cx="108" cy="88" rx="16" ry="18" fill="#fff" />
              <circle
                cx={mood === 'thinking' ? 112 : 110}
                cy={mood === 'thinking' ? 82 : 92}
                r="8"
                fill="var(--color-ink)"
              />
              <circle
                cx={mood === 'thinking' ? 115 : 113}
                cy={mood === 'thinking' ? 79 : 89}
                r="2.6"
                fill="#fff"
              />
            </g>
          )}

          <ellipse cx="34" cy="116" rx="4" ry="3" fill="var(--color-ink)" opacity="0.28" />

          {mood === 'thinking' ? (
            <g fill="var(--color-sky-deep)" opacity="0.85">
              <circle cx="168" cy="36" r="3.5" />
              <circle cx="182" cy="22" r="5" />
            </g>
          ) : null}

          <Mouth mood={mood} />
        </g>

        {mood === 'completed' ? (
          <g className={styles.starBurst} fill="var(--color-gold)">
            <polygon points="18,48 21,56 30,56 23,61 26,70 18,64 10,70 13,61 6,56 15,56" />
            <polygon points="236,40 239,47 247,47 240,52 243,60 236,55 229,60 232,52 225,47 233,47" />
          </g>
        ) : null}
      </svg>
    </div>
  )
}

function TinyArm({
  x,
  y,
  rotation,
}: {
  x: number
  y: number
  rotation: number
}) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotation})`}>
      <ellipse cx="0" cy="6" rx="5.5" ry="10" fill="var(--color-mascot-body)" />
      <ellipse cx="1" cy="15" rx="6.5" ry="5" fill="var(--color-mascot-body)" />
      <ellipse cx="-2" cy="21" rx="2.4" ry="4.5" fill="var(--color-mascot-body)" />
      <ellipse cx="5" cy="21" rx="2.4" ry="4.5" fill="var(--color-mascot-body)" />
    </g>
  )
}

function Mouth({ mood }: { mood: MascotMood }) {
  if (mood === 'celebrating' || mood === 'completed') {
    return (
      <path
        d="M40 124 Q 58 146 84 128"
        fill="none"
        stroke="var(--color-ink)"
        strokeWidth="4.5"
        strokeLinecap="round"
      />
    )
  }

  if (mood === 'thinking') {
    return <ellipse cx="52" cy="128" rx="5" ry="4" fill="var(--color-ink)" opacity="0.7" />
  }

  if (mood === 'tryAgain') {
    return (
      <path
        d="M40 128 Q 58 134 80 128"
        fill="none"
        stroke="var(--color-ink)"
        strokeWidth="4"
        strokeLinecap="round"
      />
    )
  }

  return (
    <path
      d="M40 126 Q 58 138 82 126"
      fill="none"
      stroke="var(--color-ink)"
      strokeWidth="4"
      strokeLinecap="round"
    />
  )
}
