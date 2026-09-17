type StarProps = {
  filled: boolean
  size?: number
  className?: string
}

export function Star({ filled, size = 22, className }: StarProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 2.5 L14.9 8.6 L21.5 9.4 L16.6 14 L18 20.5 L12 17.2 L6 20.5 L7.4 14 L2.5 9.4 L9.1 8.6 Z"
        fill={filled ? 'var(--color-gold)' : 'var(--color-canvas-deep)'}
        stroke="var(--color-gold-deep)"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  )
}
