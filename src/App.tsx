import { useState } from 'react'
import { ProfileProvider } from './platform/profile'
import { Dashboard } from './screens/Dashboard'
import { Playing } from './screens/Playing'
import type { AppView } from './platform/types'
import styles from './App.module.css'

export function App() {
  const [view, setView] = useState<AppView>({ screen: 'dashboard' })

  return (
    <ProfileProvider>
      <div className={styles.stage}>
        <div className={styles.sky} />
        <div className={styles.sun} aria-hidden="true" />
        <div className={styles.hills} aria-hidden="true" />
        {view.screen === 'dashboard' ? (
          <Dashboard onPlay={(gameId) => setView({ screen: 'playing', gameId })} />
        ) : (
          <Playing gameId={view.gameId} onHome={() => setView({ screen: 'dashboard' })} />
        )}
      </div>
    </ProfileProvider>
  )
}
