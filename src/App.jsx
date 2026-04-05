import { useEffect } from 'react'
import styles from './App.module.css'
import BottomNav from './components/BottomNav/BottomNav'
import Toast from './components/Toast/Toast'
import NotifBanner from './components/NotifBanner/NotifBanner'
import Home from './modules/Home/Home'
import Remedios from './modules/Remedios/Remedios'
import Financas from './modules/Financas/Financas'
import Academia from './modules/Academia/Academia'
import { onForegroundMessage, registerFCMToken } from './firebase'
import { useAppCollections } from './hooks/useFirestore'
import { useAppStore } from './store'

const tabs = [
  { id: 'home', component: Home },
  { id: 'remedios', component: Remedios },
  { id: 'financas', component: Financas },
  { id: 'academia', component: Academia }
]

function DataSync() {
  useAppCollections()
  return null
}

export default function App() {
  const activeTab = useAppStore((state) => state.activeTab)
  const householdId = useAppStore((state) => state.householdId)
  const showToast = useAppStore((state) => state.showToast)

  useEffect(() => {
    const unsubscribe = onForegroundMessage((payload) => {
      showToast(payload.notification?.body || 'Nova notificação recebida', 'info')
    })

    if (typeof window !== 'undefined' && window.Notification?.permission === 'granted') {
      registerFCMToken(householdId).catch(() => {})
    }

    return unsubscribe
  }, [householdId, showToast])

  return (
    <div className={styles.appShell}>
      <DataSync />
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>🏠 Nossa Casa</p>
          <h1 className={styles.title}>João Pedro &amp; Tefinha</h1>
        </div>
        <span className={styles.firebaseStatus}>Firebase</span>
      </header>

      <NotifBanner />

      <main className={styles.main}>
        {tabs.map(({ id, component: Component }) => (
          <section key={id} className={activeTab === id ? styles.tabVisible : styles.tabHidden}>
            <Component />
          </section>
        ))}
      </main>

      <BottomNav />
      <Toast />
    </div>
  )
}
