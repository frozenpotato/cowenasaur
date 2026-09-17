import type { ButtonHTMLAttributes, ReactNode } from 'react'
import styles from './ToyButton.module.css'

type ToyButtonVariant = 'coral' | 'leaf' | 'cream'

type ToyButtonProps = {
  children: ReactNode
  variant?: ToyButtonVariant
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'>

export function ToyButton({
  children,
  variant = 'coral',
  className,
  type = 'button',
  ...props
}: ToyButtonProps) {
  const classes = [styles.button, styles[variant], className]
    .filter(Boolean)
    .join(' ')

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  )
}
