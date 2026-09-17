import { ProfileProvider } from './platform/profile'
import { Dashboard } from './screens/Dashboard'
import styles from './App.module.css'

export function App() {
  return (
    <ProfileProvider>
      <div className={styles.stage}>
        <div className={styles.sky} />
        <div className={styles.sun} aria-hidden="true" />
        <div className={styles.hills} aria-hidden="true" />
        <Dashboard />
      </div>
    </ProfileProvider>
  )
}
