import { useEffect } from 'react'
import styles from './BottomSheet.module.css'

export default function BottomSheet({ open, onClose, title, children }) {
  useEffect(() => {
    if (!open) return undefined
    document.body.classList.add('sheet-open')
    return () => document.body.classList.remove('sheet-open')
  }, [open])

  if (!open) return null

  return (
    <div className={styles.overlay} onClick={onClose} role="presentation">
      <div className={styles.sheet} onClick={(event) => event.stopPropagation()} role="dialog" aria-modal="true">
        <div className={styles.handle} />
        <header className={styles.header}>
          <h2>{title}</h2>
          <button type="button" className={styles.close} onClick={onClose} aria-label="Fechar">
            ×
          </button>
        </header>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  )
}
