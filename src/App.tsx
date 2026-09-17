import { useEffect, useRef, useState } from 'react'
import { Mascot, type MascotMood } from './components/Mascot'
import { ToyButton } from './components/ToyButton'
import styles from './App.module.css'

export function App() {
  const [mood, setMood] = useState<MascotMood>('idle')
  const resetRef = useRef<number>(0)

  useEffect(() => {
    return () => window.clearTimeout(resetRef.current)
  }, [])

  function celebrate() {
    window.clearTimeout(resetRef.current)
    setMood('celebrating')
    resetRef.current = window.setTimeout(() => {
      setMood('idle')
    }, 1600)
  }

  return (
    <div className={styles.stage}>
      <div className={styles.sky} />
      <div className={styles.sun} aria-hidden="true" />
      <div className={styles.hills} aria-hidden="true" />

      <header className={styles.header}>
        <h1 className={styles.title}>Cowenasaur</h1>
      </header>

      <main className={styles.main}>
        <button
          type="button"
          className={styles.mascotHit}
          onClick={celebrate}
          aria-label="Cowenasaur says hello"
        >
          <Mascot mood={mood} size="lg" />
        </button>
        <ToyButton onClick={celebrate}>Hello!</ToyButton>
      </main>
    </div>
  )
}
