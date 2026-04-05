importScripts('https://www.gstatic.com/firebasejs/11.6.1/firebase-app-compat.js')
importScripts('https://www.gstatic.com/firebasejs/11.6.1/firebase-messaging-compat.js')

firebase.initializeApp({
  apiKey: 'COLE_AQUI',
  authDomain: 'COLE_AQUI',
  projectId: 'COLE_AQUI',
  storageBucket: 'COLE_AQUI',
  messagingSenderId: 'COLE_AQUI',
  appId: 'COLE_AQUI'
})

const messaging = firebase.messaging()

messaging.onBackgroundMessage((payload) => {
  const title = payload.notification?.title || 'Nossa Casa'
  const options = {
    body: payload.notification?.body || 'Novo lembrete',
    icon: '/icons/icon-192.png',
    data: payload.data || {}
  }

  self.registration.showNotification(title, options)
})

self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  event.waitUntil(clients.openWindow('/'))
})
