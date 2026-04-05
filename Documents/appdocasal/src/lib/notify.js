export function canNotify() {
  return typeof window !== 'undefined' && 'Notification' in window
}

export async function requestNotificationPermission() {
  if (!canNotify()) return 'unsupported'
  return window.Notification.requestPermission()
}
