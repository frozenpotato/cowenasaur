import { useState } from 'react'
import { ProfileProvider, useProfile } from './platform/profile'
import { Dashboard } from './screens/Dashboard'
import { Playing } from './screens/Playing'
import type { AppView } from './platform/types'
import styles from './App.module.css'

export function App() {
  return (
    <ProfileProvider>
      <Meadow />
    </ProfileProvider>
  )
}

function Meadow() {
  const { ready } = useProfile()
  const [view, setView] = useState<AppView>({ screen: 'dashboard' })

  return (
    <div className={styles.stage}>
      <div className={styles.sky} />
      <div className={styles.sun} aria-hidden="true" />
      <div className={styles.hills} aria-hidden="true" />
      {!ready ? null : view.screen === 'dashboard' ? (
        <Dashboard onPlay={(gameId) => setView({ screen: 'playing', gameId })} />
      ) : (
        <Playing gameId={view.gameId} onHome={() => setView({ screen: 'dashboard' })} />
      )}
    </div>
  )
}
