import { initializeApp } from 'firebase/app'
import { getMessaging, getToken, isSupported, onMessage } from 'firebase/messaging'
import { collection, doc, enableIndexedDbPersistence, getFirestore, serverTimestamp, setDoc } from 'firebase/firestore'
import { firebaseConfig, VAPID_KEY } from './config'

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)

enableIndexedDbPersistence(db).catch(() => {})

let messaging = null

async function initMessaging() {
  try {
    if (await isSupported()) {
      messaging = getMessaging(app)
    }
  } catch {
    messaging = null
  }
}

initMessaging()

export { messaging }

export async function registerFCMToken(householdId) {
  if (!messaging || typeof window === 'undefined' || !('Notification' in window)) return null

  const permission =
    window.Notification.permission === 'granted'
      ? 'granted'
      : await window.Notification.requestPermission()

  if (permission !== 'granted') return null

  const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js')
  const token = await getToken(messaging, {
    vapidKey: VAPID_KEY,
    serviceWorkerRegistration: registration
  })

  if (!token) return null

  const tokenRef = doc(collection(db, 'casas', householdId, 'fcmTokens'), token.slice(-20))
  await setDoc(
    tokenRef,
    {
      token,
      householdId,
      updatedAt: serverTimestamp(),
      createdAt: serverTimestamp()
    },
    { merge: true }
  )

  return token
}

export function onForegroundMessage(callback) {
  if (!messaging) return () => {}
  return onMessage(messaging, callback)
}
