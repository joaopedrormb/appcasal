const DISMISS_KEY = 'notif_dismissed'

export function canNotify() {
  return typeof window !== 'undefined' && 'Notification' in window
}

export function isNotifDismissed() {
  if (typeof window === 'undefined') return false
  return window.localStorage.getItem(DISMISS_KEY) === 'true'
}

export function dismissNotifBanner() {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(DISMISS_KEY, 'true')
}

export async function requestNotificationPermission() {
  if (!canNotify()) return 'unsupported'
  return window.Notification.requestPermission()
}
