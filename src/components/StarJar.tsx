import styles from './StarJar.module.css'

type StarJarProps = {
  totalStars: number
}

export function StarJar({ totalStars }: StarJarProps) {
  const shown = Math.min(totalStars, 5)

  return (
    <div className={styles.wrap} role="img" aria-label={starLabel(totalStars)}>
      <svg className={styles.jar} viewBox="0 0 88 96" aria-hidden="true">
        <rect x="28" y="6" width="32" height="12" rx="6" fill="var(--color-gold)" />
        <path
          d="M22 22 C 18 22, 14 28, 16 36 L 22 86 C 24 92, 64 92, 66 86 L 72 36 C 74 28, 70 22, 66 22 Z"
          fill="var(--color-canvas)"
          stroke="var(--color-sky-deep)"
          strokeWidth="4"
        />
        {shown > 0 ? (
          <g transform="translate(32 48)">
            {Array.from({ length: shown }, (_, index) => (
              <g key={index} transform={`translate(${(index % 2) * 12} ${Math.floor(index / 2) * 12})`}>
                <polygon points="6,0 7.5,4 12,4.2 8.5,7 9.5,11 6,8.8 2.5,11 3.5,7 0,4.2 4.5,4" fill="var(--color-gold)" />
              </g>
            ))}
          </g>
        ) : null}
      </svg>
      {totalStars > 0 ? <span className={styles.count}>{totalStars}</span> : null}
    </div>
  )
}

function starLabel(totalStars: number) {
  if (totalStars === 0) {
    return 'Star jar, empty'
  }
  return `Star jar, ${totalStars}`
}
