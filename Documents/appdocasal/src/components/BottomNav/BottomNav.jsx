import { Dumbbell, Home, Pill, Wallet } from 'lucide-react'
import styles from './BottomNav.module.css'
import { useAppStore } from '../../store'

const items = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'remedios', label: 'Remédios', icon: Pill },
  { id: 'financas', label: 'Finanças', icon: Wallet },
  { id: 'academia', label: 'Academia', icon: Dumbbell }
]

export default function BottomNav() {
  const activeTab = useAppStore((state) => state.activeTab)
  const setActiveTab = useAppStore((state) => state.setActiveTab)

  return (
    <nav className={styles.nav}>
      {items.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          type="button"
          aria-label={label}
          className={`${styles.item} ${activeTab === id ? styles.active : ''}`}
          onClick={() => setActiveTab(id)}
        >
          <Icon size={20} />
          <span>{label}</span>
        </button>
      ))}
    </nav>
  )
}
