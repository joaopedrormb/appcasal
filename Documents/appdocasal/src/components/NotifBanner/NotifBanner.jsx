import { useState } from 'react'
import styles from './NotifBanner.module.css'
import { registerFCMToken } from '../../firebase'
import { dismissNotifBanner, isNotifDismissed, requestNotificationPermission } from '../../lib/notify'
import { useAppStore } from '../../store'

export default function NotifBanner() {
  const householdId = useAppStore((state) => state.householdId)
  const showToast = useAppStore((state) => state.showToast)
  const [dismissed, setDismissed] = useState(isNotifDismissed())

  if (
    dismissed ||
    typeof window === 'undefined' ||
    !('Notification' in window) ||
    window.Notification.permission !== 'default'
  ) {
    return null
  }

  async function handleActivate() {
    const permission = await requestNotificationPermission()
    if (permission === 'granted') {
      await registerFCMToken(householdId)
      showToast('Notificações ativadas!', 'success')
    }
  }

  function handleDismiss() {
    dismissNotifBanner()
    setDismissed(true)
  }

  return (
    <section className={styles.banner}>
      <div>
        <strong>Ative os lembretes</strong>
        <p>Push para horários de remédios, contas e estoque baixo.</p>
      </div>
      <div className={styles.actions}>
        <button type="button" className={styles.primary} onClick={handleActivate}>
          Ativar
        </button>
        <button type="button" className={styles.secondary} onClick={handleDismiss}>
          Agora não
        </button>
      </div>
    </section>
  )
}
