import { Plus } from 'lucide-react'
import styles from './FAB.module.css'

export default function FAB({ onClick, label }) {
  return (
    <button type="button" aria-label={label} className={styles.fab} onClick={onClick}>
      <Plus size={20} />
    </button>
  )
}
