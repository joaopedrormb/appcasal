importScripts('https://www.gstatic.com/firebasejs/11.6.1/firebase-app-compat.js')
importScripts('https://www.gstatic.com/firebasejs/11.6.1/firebase-messaging-compat.js')

firebase.initializeApp({
  apiKey: 'AIzaSyCdJnx3dYake7jEc7Htfa38sALi4RfOYFw',
  authDomain: 'controle-de-remedios-c1378.firebaseapp.com',
  projectId: 'controle-de-remedios-c1378',
  storageBucket: 'controle-de-remedios-c1378.firebasestorage.app',
  messagingSenderId: '449905516600',
  appId: '1:449905516600:web:e5a9833d7537fdaae906cd'
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
