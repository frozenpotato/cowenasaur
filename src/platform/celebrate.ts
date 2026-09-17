import confettiLib from 'canvas-confetti'
import { prefersReducedMotion } from './motion'
import type { Stars } from './types'

const COLORS = ['#e07a5f', '#e9b44c', '#7ca86a', '#8e7cc3', '#7ec8c3', '#f0d37a']

function getConfetti() {
  const value = confettiLib as unknown
  if (typeof value === 'function') {
    return value as typeof confettiLib
  }
  if (value && typeof value === 'object' && 'default' in value && typeof value.default === 'function') {
    return value.default as typeof confettiLib
  }
  return null
}

export function celebrate(stars: Stars, canvas?: HTMLCanvasElement | null) {
  if (prefersReducedMotion()) {
    return
  }

  try {
    const confetti = getConfetti()
    if (!confetti) {
      return
    }

    const fire = canvas
      ? confetti.create(canvas, { resize: true, useWorker: false })
      : confetti

    const burst = {
      colors: COLORS,
      scalar: 1.05,
      zIndex: 40,
    }

    void fire({
      ...burst,
      particleCount: 80,
      spread: 76,
      startVelocity: 42,
      origin: { y: 0.28 },
    })

    if (stars >= 3) {
      window.setTimeout(() => {
        void fire({
          ...burst,
          particleCount: 52,
          spread: 110,
          startVelocity: 30,
          origin: { y: 0.4 },
        })
      }, 220)
    }
  } catch {
    return
  }
}
