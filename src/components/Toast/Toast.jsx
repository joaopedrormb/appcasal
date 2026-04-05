import { useEffect } from 'react'
import styles from './Toast.module.css'
import { useAppStore } from '../../store'

export default function Toast() {
  const toast = useAppStore((state) => state.toast)
  const clearToast = useAppStore((state) => state.clearToast)

  useEffect(() => {
    if (!toast) return undefined
    const timer = window.setTimeout(clearToast, 3000)
    return () => window.clearTimeout(timer)
  }, [clearToast, toast])

  if (!toast) return null

  return <div className={`${styles.toast} ${styles[toast.type]}`}>{toast.message}</div>
}
