# Nossa Casa Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild `Nossa Casa` as the exact prompt-compliant mobile-first PWA, removing example files and delivering the requested Firebase, UI, finance, medicine, and workout flows.

**Architecture:** Build the final tree up front, then implement the app in prompt order: infrastructure, reusable components, Home, Remedios, Financas, and Academia. Keep Firebase access centralized in `src/firebase/index.js` and `src/hooks/useFirestore.js`, while modules stay focused on rendering and business rules.

**Tech Stack:** React 18, Vite 5, Firebase 11, Firestore, FCM, Zustand 4, date-fns, lucide-react, CSS Modules, vite-plugin-pwa, Node 20 Cloud Functions

---

## File Map

### Files to Create

- `C:\Users\User\Documents\appdocasal\.gitignore`
- `C:\Users\User\Documents\appdocasal\firebase.json`
- `C:\Users\User\Documents\appdocasal\firestore.rules`
- `C:\Users\User\Documents\appdocasal\public\firebase-messaging-sw.js`
- `C:\Users\User\Documents\appdocasal\public\icons\icon-192.png`
- `C:\Users\User\Documents\appdocasal\public\icons\icon-512.png`
- `C:\Users\User\Documents\appdocasal\functions\package.json`
- `C:\Users\User\Documents\appdocasal\functions\index.js`
- `C:\Users\User\Documents\appdocasal\src\main.jsx`
- `C:\Users\User\Documents\appdocasal\src\App.jsx`
- `C:\Users\User\Documents\appdocasal\src\App.module.css`
- `C:\Users\User\Documents\appdocasal\src\styles\global.css`
- `C:\Users\User\Documents\appdocasal\src\firebase\config.js`
- `C:\Users\User\Documents\appdocasal\src\firebase\index.js`
- `C:\Users\User\Documents\appdocasal\src\store\index.js`
- `C:\Users\User\Documents\appdocasal\src\hooks\useFirestore.js`
- `C:\Users\User\Documents\appdocasal\src\data\treinos-seed.js`
- `C:\Users\User\Documents\appdocasal\src\lib\formatters.js`
- `C:\Users\User\Documents\appdocasal\src\lib\dates.js`
- `C:\Users\User\Documents\appdocasal\src\lib\meds.js`
- `C:\Users\User\Documents\appdocasal\src\lib\finance.js`
- `C:\Users\User\Documents\appdocasal\src\lib\training.js`
- `C:\Users\User\Documents\appdocasal\src\lib\notify.js`
- `C:\Users\User\Documents\appdocasal\src\lib\__tests__\meds.test.js`
- `C:\Users\User\Documents\appdocasal\src\lib\__tests__\finance.test.js`
- `C:\Users\User\Documents\appdocasal\src\lib\__tests__\training.test.js`
- `C:\Users\User\Documents\appdocasal\src\components\BottomNav\BottomNav.jsx`
- `C:\Users\User\Documents\appdocasal\src\components\BottomNav\BottomNav.module.css`
- `C:\Users\User\Documents\appdocasal\src\components\BottomSheet\BottomSheet.jsx`
- `C:\Users\User\Documents\appdocasal\src\components\BottomSheet\BottomSheet.module.css`
- `C:\Users\User\Documents\appdocasal\src\components\Toast\Toast.jsx`
- `C:\Users\User\Documents\appdocasal\src\components\Toast\Toast.module.css`
- `C:\Users\User\Documents\appdocasal\src\components\Badge\Badge.jsx`
- `C:\Users\User\Documents\appdocasal\src\components\Badge\Badge.module.css`
- `C:\Users\User\Documents\appdocasal\src\components\EmptyState\EmptyState.jsx`
- `C:\Users\User\Documents\appdocasal\src\components\EmptyState\EmptyState.module.css`
- `C:\Users\User\Documents\appdocasal\src\components\FAB\FAB.jsx`
- `C:\Users\User\Documents\appdocasal\src\components\FAB\FAB.module.css`
- `C:\Users\User\Documents\appdocasal\src\components\NotifBanner\NotifBanner.jsx`
- `C:\Users\User\Documents\appdocasal\src\components\NotifBanner\NotifBanner.module.css`
- `C:\Users\User\Documents\appdocasal\src\modules\Home\Home.jsx`
- `C:\Users\User\Documents\appdocasal\src\modules\Home\Home.module.css`
- `C:\Users\User\Documents\appdocasal\src\modules\Remedios\Remedios.jsx`
- `C:\Users\User\Documents\appdocasal\src\modules\Remedios\Remedios.module.css`
- `C:\Users\User\Documents\appdocasal\src\modules\Remedios\MedCard.jsx`
- `C:\Users\User\Documents\appdocasal\src\modules\Remedios\MedCard.module.css`
- `C:\Users\User\Documents\appdocasal\src\modules\Remedios\MedForm.jsx`
- `C:\Users\User\Documents\appdocasal\src\modules\Remedios\MedForm.module.css`
- `C:\Users\User\Documents\appdocasal\src\modules\Financas\Financas.jsx`
- `C:\Users\User\Documents\appdocasal\src\modules\Financas\Financas.module.css`
- `C:\Users\User\Documents\appdocasal\src\modules\Financas\GastosTab.jsx`
- `C:\Users\User\Documents\appdocasal\src\modules\Financas\GastosTab.module.css`
- `C:\Users\User\Documents\appdocasal\src\modules\Financas\ContasTab.jsx`
- `C:\Users\User\Documents\appdocasal\src\modules\Financas\ContasTab.module.css`
- `C:\Users\User\Documents\appdocasal\src\modules\Financas\MetasTab.jsx`
- `C:\Users\User\Documents\appdocasal\src\modules\Financas\MetasTab.module.css`
- `C:\Users\User\Documents\appdocasal\src\modules\Academia\Academia.jsx`
- `C:\Users\User\Documents\appdocasal\src\modules\Academia\Academia.module.css`
- `C:\Users\User\Documents\appdocasal\src\modules\Academia\TreinoCard.jsx`
- `C:\Users\User\Documents\appdocasal\src\modules\Academia\TreinoCard.module.css`
- `C:\Users\User\Documents\appdocasal\src\modules\Academia\TreinoForm.jsx`
- `C:\Users\User\Documents\appdocasal\src\modules\Academia\TreinoForm.module.css`
- `C:\Users\User\Documents\appdocasal\src\modules\Academia\HistoricoTab.jsx`
- `C:\Users\User\Documents\appdocasal\src\modules\Academia\HistoricoTab.module.css`

### Files to Replace

- `C:\Users\User\Documents\appdocasal\package.json`
- `C:\Users\User\Documents\appdocasal\vite.config.js`
- `C:\Users\User\Documents\appdocasal\index.html`

### Files to Delete

- `C:\Users\User\Documents\appdocasal\config.js`
- `C:\Users\User\Documents\appdocasal\index.js`
- `C:\Users\User\Documents\appdocasal\functions-index.js`
- `C:\Users\User\Documents\appdocasal\sw.js`
- `C:\Users\User\Documents\appdocasal\manifest.json`
- `C:\Users\User\Documents\appdocasal\firebase-messaging-sw.js`
- `C:\Users\User\Documents\appdocasal\treinos-seed.js`
- `C:\Users\User\Documents\appdocasal\useFirestore.js`

## Task 1: Clean the Workspace and Create the Target Skeleton

**Files:**
- Delete: `C:\Users\User\Documents\appdocasal\config.js`
- Delete: `C:\Users\User\Documents\appdocasal\index.js`
- Delete: `C:\Users\User\Documents\appdocasal\functions-index.js`
- Delete: `C:\Users\User\Documents\appdocasal\sw.js`
- Delete: `C:\Users\User\Documents\appdocasal\manifest.json`
- Delete: `C:\Users\User\Documents\appdocasal\firebase-messaging-sw.js`
- Delete: `C:\Users\User\Documents\appdocasal\treinos-seed.js`
- Delete: `C:\Users\User\Documents\appdocasal\useFirestore.js`
- Create: all missing directories under `public`, `functions`, `src`, `src/components`, and `src/modules`

- [ ] **Step 1: Write the failing structure check**

```js
import { existsSync } from 'node:fs'

const required = [
  'src/App.jsx',
  'src/store/index.js',
  'src/hooks/useFirestore.js',
  'src/modules/Home/Home.jsx',
  'src/modules/Remedios/Remedios.jsx',
  'src/modules/Financas/Financas.jsx',
  'src/modules/Academia/Academia.jsx',
  'functions/index.js',
  'public/firebase-messaging-sw.js'
]

for (const file of required) {
  if (!existsSync(file)) {
    throw new Error(`missing: ${file}`)
  }
}
```

- [ ] **Step 2: Run the structure check to verify it fails**

Run: `node scripts/check-structure.mjs`
Expected: FAIL with `missing:` errors for the app tree that does not exist yet.

- [ ] **Step 3: Remove the example files and create the directory tree**

```cmd
del /q config.js index.js functions-index.js sw.js manifest.json firebase-messaging-sw.js treinos-seed.js useFirestore.js
mkdir public\icons functions src src\styles src\firebase src\store src\hooks src\data src\lib src\lib\__tests__
mkdir src\components\BottomNav src\components\BottomSheet src\components\Toast src\components\Badge src\components\EmptyState src\components\FAB src\components\NotifBanner
mkdir src\modules\Home src\modules\Remedios src\modules\Financas src\modules\Academia
```

- [ ] **Step 4: Run the structure check again to verify the failure changes**

Run: `node scripts/check-structure.mjs`
Expected: FAIL with fewer missing files, proving the target tree now exists and the remaining work is file content.

- [ ] **Step 5: Commit the cleanup checkpoint**

```bash
git add .
git commit -m "chore: clean workspace and scaffold target structure"
```

## Task 2: Replace Root Infrastructure Files

**Files:**
- Modify: `C:\Users\User\Documents\appdocasal\package.json`
- Modify: `C:\Users\User\Documents\appdocasal\vite.config.js`
- Modify: `C:\Users\User\Documents\appdocasal\index.html`
- Create: `C:\Users\User\Documents\appdocasal\.gitignore`
- Create: `C:\Users\User\Documents\appdocasal\firebase.json`
- Create: `C:\Users\User\Documents\appdocasal\firestore.rules`

- [ ] **Step 1: Write the failing package and PWA config assertion**

```js
import { readFileSync } from 'node:fs'

const pkg = JSON.parse(readFileSync('package.json', 'utf8'))
const vite = readFileSync('vite.config.js', 'utf8')
const html = readFileSync('index.html', 'utf8')
const firebaseJson = readFileSync('firebase.json', 'utf8')

if (pkg.name !== 'nossa-casa') throw new Error('package name mismatch')
if (!vite.includes('VitePWA')) throw new Error('missing vite pwa plugin')
if (!vite.includes('short_name: "NossaCasa"')) throw new Error('missing short_name')
if (!html.includes('fonts.googleapis.com')) throw new Error('missing Sora font')
if (!firebaseJson.includes('"functions"')) throw new Error('missing firebase functions config')
```

- [ ] **Step 2: Run the root config assertion to verify it fails**

Run: `node scripts/check-root-config.mjs`
Expected: FAIL because the root files still contain the example setup.

- [ ] **Step 3: Replace the root files with the prompt-compliant versions**

```json
{
  "name": "nossa-casa",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "firebase": "^11.6.1",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "zustand": "^4.5.4",
    "date-fns": "^3.6.0",
    "lucide-react": "^0.383.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.1",
    "vite": "^5.4.2",
    "vite-plugin-pwa": "^0.20.1"
  }
}
```

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icons/icon-192.png', 'icons/icon-512.png'],
      manifest: {
        name: 'Nossa Casa',
        short_name: 'NossaCasa',
        theme_color: '#0b1020',
        background_color: '#0b1020',
        display: 'standalone',
        orientation: 'portrait',
        icons: [
          { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}']
      }
    })
  ]
})
```

```html
<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
    <meta name="theme-color" content="#0b1020" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&display=swap" rel="stylesheet" />
    <title>Nossa Casa</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

- [ ] **Step 4: Run the root config assertion again to verify it passes**

Run: `node scripts/check-root-config.mjs`
Expected: PASS with no output.

- [ ] **Step 5: Commit the infrastructure root checkpoint**

```bash
git add package.json vite.config.js index.html .gitignore firebase.json firestore.rules
git commit -m "chore: add root app and firebase config"
```

## Task 3: Add Firebase Support Files and Icons

**Files:**
- Create: `C:\Users\User\Documents\appdocasal\public\firebase-messaging-sw.js`
- Create: `C:\Users\User\Documents\appdocasal\public\icons\icon-192.png`
- Create: `C:\Users\User\Documents\appdocasal\public\icons\icon-512.png`
- Create: `C:\Users\User\Documents\appdocasal\functions\package.json`

- [ ] **Step 1: Write the failing asset check**

```js
import { existsSync, readFileSync } from 'node:fs'

if (!existsSync('public/icons/icon-192.png')) throw new Error('missing 192 icon')
if (!existsSync('public/icons/icon-512.png')) throw new Error('missing 512 icon')

const sw = readFileSync('public/firebase-messaging-sw.js', 'utf8')
if (!sw.includes('firebase-app-compat')) throw new Error('missing compat app import')
if (!sw.includes('onBackgroundMessage')) throw new Error('missing background handler')
```

- [ ] **Step 2: Run the asset check to verify it fails**

Run: `node scripts/check-assets.mjs`
Expected: FAIL for missing icons and service worker.

- [ ] **Step 3: Add the Firebase worker, function package, and generated icons**

```js
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
```

```json
{
  "name": "nossa-casa-functions",
  "private": true,
  "version": "0.1.0",
  "main": "index.js",
  "engines": { "node": "20" },
  "dependencies": {
    "firebase-admin": "^12.0.0",
    "firebase-functions": "^5.0.0"
  }
}
```

```txt
Create real PNG files at public/icons/icon-192.png and public/icons/icon-512.png before continuing.
```

- [ ] **Step 4: Run the asset check again to verify it passes**

Run: `node scripts/check-assets.mjs`
Expected: PASS with no output.

- [ ] **Step 5: Commit the Firebase support checkpoint**

```bash
git add public/firebase-messaging-sw.js public/icons/icon-192.png public/icons/icon-512.png functions/package.json
git commit -m "feat: add messaging worker and pwa assets"
```

## Task 4: Create Logic Utilities and Tests First

**Files:**
- Create: `C:\Users\User\Documents\appdocasal\src\lib\formatters.js`
- Create: `C:\Users\User\Documents\appdocasal\src\lib\dates.js`
- Create: `C:\Users\User\Documents\appdocasal\src\lib\meds.js`
- Create: `C:\Users\User\Documents\appdocasal\src\lib\finance.js`
- Create: `C:\Users\User\Documents\appdocasal\src\lib\training.js`
- Create: `C:\Users\User\Documents\appdocasal\src\lib\notify.js`
- Test: `C:\Users\User\Documents\appdocasal\src\lib\__tests__\meds.test.js`
- Test: `C:\Users\User\Documents\appdocasal\src\lib\__tests__\finance.test.js`
- Test: `C:\Users\User\Documents\appdocasal\src\lib\__tests__\training.test.js`

- [ ] **Step 1: Write the failing medicine logic tests**

```js
import test from 'node:test'
import assert from 'node:assert/strict'
import { getMedStatus, getRemainingDays } from '../meds.js'

test('getRemainingDays floors stock coverage to full days', () => {
  assert.equal(getRemainingDays({ qty: 20, dailyUse: 3 }), 6)
})

test('getMedStatus returns danger when quantity is below alert threshold', () => {
  assert.equal(getMedStatus({ qty: 2, alertQty: 5, dailyUse: 1 }), 'danger')
})
```

- [ ] **Step 2: Write the failing finance logic tests**

```js
import test from 'node:test'
import assert from 'node:assert/strict'
import { getContaStatus, getNextRecurringDate } from '../finance.js'

test('getContaStatus marks overdue unpaid bills as danger', () => {
  const status = getContaStatus({ vencimento: '2026-04-01', paga: false }, new Date('2026-04-05T12:00:00'))
  assert.equal(status.tone, 'danger')
})

test('getNextRecurringDate rolls one month forward', () => {
  assert.equal(getNextRecurringDate('2026-04-10'), '2026-05-10')
})
```

- [ ] **Step 3: Write the failing training logic tests**

```js
import test from 'node:test'
import assert from 'node:assert/strict'
import { getStreakDays, getDayEmoji } from '../training.js'

test('getDayEmoji maps Wednesday to the martial arts emoji', () => {
  assert.equal(getDayEmoji('qua'), '🥊')
})

test('getStreakDays counts consecutive distinct days with workout history', () => {
  const streak = getStreakDays([
    { realizadoEm: '2026-04-05T08:00:00.000Z' },
    { realizadoEm: '2026-04-04T08:00:00.000Z' },
    { realizadoEm: '2026-04-03T08:00:00.000Z' }
  ], new Date('2026-04-05T10:00:00.000Z'))

  assert.equal(streak, 3)
})
```

- [ ] **Step 4: Run the tests to verify they fail**

Run: `node --test src/lib/__tests__/*.test.js`
Expected: FAIL because the utility modules do not exist yet.

- [ ] **Step 5: Write the minimal utility implementations**

```js
// src/lib/meds.js
export function getRemainingDays({ qty = 0, dailyUse = 0 }) {
  if (!dailyUse || dailyUse <= 0) return Infinity
  return Math.max(0, Math.floor(qty / dailyUse))
}

export function getMedStatus(med) {
  const remaining = getRemainingDays(med)
  if (med.qty <= 0 || remaining <= 3) return 'danger'
  if (med.qty <= med.alertQty || remaining <= 7) return 'warn'
  return 'ok'
}
```

```js
// src/lib/finance.js
import { addMonths, differenceInCalendarDays, parseISO } from 'date-fns'

export function getNextRecurringDate(isoDate) {
  return addMonths(parseISO(isoDate), 1).toISOString().slice(0, 10)
}

export function getContaStatus(conta, now = new Date()) {
  if (conta.paga) return { tone: 'ok', label: '✓ Paga' }

  const diff = differenceInCalendarDays(parseISO(conta.vencimento), now)
  if (diff < 0) return { tone: 'danger', label: `Vencida ${Math.abs(diff)} dias` }
  if (diff <= 3) return { tone: 'warn', label: `Vence em ${diff} dias` }
  return { tone: 'ok', label: `Vence em ${diff} dias` }
}
```

```js
// src/lib/training.js
import { differenceInCalendarDays, parseISO } from 'date-fns'

const emojiMap = { seg: '💪', ter: '🦵', qua: '🥊', qui: '🏋️', sex: '⚡', sab: '🚴', dom: '🧘' }

export function getDayEmoji(day) {
  return emojiMap[day] || '🏋️'
}

export function getStreakDays(history, now = new Date()) {
  const uniqueDays = [...new Set(history.map((item) => item.realizadoEm.slice(0, 10)))].sort().reverse()
  let streak = 0
  for (const day of uniqueDays) {
    const diff = differenceInCalendarDays(now, parseISO(`${day}T00:00:00`))
    if (diff === streak) streak += 1
    else break
  }
  return streak
}
```

- [ ] **Step 6: Run the logic tests again to verify they pass**

Run: `node --test src/lib/__tests__/*.test.js`
Expected: PASS for the three test files.

- [ ] **Step 7: Commit the tested utility layer**

```bash
git add src/lib package.json
git commit -m "feat: add tested business logic helpers"
```

## Task 5: Add Firebase Bootstrap and Zustand Store

**Files:**
- Create: `C:\Users\User\Documents\appdocasal\src\firebase\config.js`
- Create: `C:\Users\User\Documents\appdocasal\src\firebase\index.js`
- Create: `C:\Users\User\Documents\appdocasal\src\store\index.js`

- [ ] **Step 1: Write the failing bootstrap assertions**

```js
import { readFileSync } from 'node:fs'

const firebaseConfig = readFileSync('src/firebase/config.js', 'utf8')
const firebaseIndex = readFileSync('src/firebase/index.js', 'utf8')
const store = readFileSync('src/store/index.js', 'utf8')

if (!firebaseConfig.includes('HOUSEHOLD_ID')) throw new Error('missing HOUSEHOLD_ID')
if (!firebaseIndex.includes('registerFCMToken')) throw new Error('missing registerFCMToken')
if (!store.includes('persist(')) throw new Error('missing zustand persist')
```

- [ ] **Step 2: Run the bootstrap assertions to verify they fail**

Run: `node scripts/check-bootstrap.mjs`
Expected: FAIL because the files do not exist yet.

- [ ] **Step 3: Write the Firebase config, bootstrap, and store**

```js
// src/firebase/config.js
export const firebaseConfig = {
  apiKey: 'COLE_AQUI',
  authDomain: 'COLE_AQUI',
  projectId: 'COLE_AQUI',
  storageBucket: 'COLE_AQUI',
  messagingSenderId: 'COLE_AQUI',
  appId: 'COLE_AQUI'
}

export const HOUSEHOLD_ID = 'joao-e-tefinha'
export const VAPID_KEY = 'COLE_AQUI'
```

```js
// src/firebase/index.js
import { initializeApp } from 'firebase/app'
import { getFirestore, enableIndexedDbPersistence, doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { getMessaging, getToken, onMessage } from 'firebase/messaging'
import { firebaseConfig, VAPID_KEY } from './config'

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)

enableIndexedDbPersistence(db).catch(() => {})

export let messaging = null
try {
  messaging = getMessaging(app)
} catch {
  messaging = null
}

export async function registerFCMToken(householdId) {
  if (!messaging) return null
  const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js')
  const token = await getToken(messaging, { vapidKey: VAPID_KEY, serviceWorkerRegistration: registration })
  if (!token) return null

  await setDoc(doc(db, 'casas', householdId, 'fcmTokens', token.slice(-20)), {
    token,
    householdId,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  }, { merge: true })

  return token
}

export function onForegroundMessage(callback) {
  if (!messaging) return () => {}
  return onMessage(messaging, callback)
}
```

```js
// src/store/index.js
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export const useAppStore = create(
  persist(
    (set) => ({
      householdId: 'joao-e-tefinha',
      activeTab: 'home',
      meds: [],
      gastos: [],
      contas: [],
      metas: [],
      treinos: [],
      historico: [],
      toast: null,
      setActiveTab: (activeTab) => set({ activeTab }),
      setMeds: (meds) => set({ meds }),
      setGastos: (gastos) => set({ gastos }),
      setContas: (contas) => set({ contas }),
      setMetas: (metas) => set({ metas }),
      setTreinos: (treinos) => set({ treinos }),
      setHistorico: (historico) => set({ historico }),
      showToast: (message, type = 'info') => set({ toast: { message, type } }),
      clearToast: () => set({ toast: null })
    }),
    {
      name: 'nossa-casa',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        householdId: state.householdId,
        activeTab: state.activeTab
      })
    }
  )
)
```

- [ ] **Step 4: Run the bootstrap assertions again to verify they pass**

Run: `node scripts/check-bootstrap.mjs`
Expected: PASS with no output.

- [ ] **Step 5: Commit the core data bootstrap**

```bash
git add src/firebase src/store
git commit -m "feat: add firebase bootstrap and global store"
```

## Task 6: Build the Realtime Firestore Hooks

**Files:**
- Modify: `C:\Users\User\Documents\appdocasal\src\hooks\useFirestore.js`
- Modify: `C:\Users\User\Documents\appdocasal\src\lib\finance.js`
- Modify: `C:\Users\User\Documents\appdocasal\src\lib\meds.js`

- [ ] **Step 1: Write the failing recurring-bill test**

```js
import { buildNextRecurringConta } from '../finance.js'

test('buildNextRecurringConta creates the next pending occurrence', () => {
  const next = buildNextRecurringConta({
    nome: 'Internet',
    valor: 99.9,
    vencimento: '2026-04-10',
    recorrente: true,
    observacao: ''
  })

  assert.equal(next.vencimento, '2026-05-10')
  assert.equal(next.paga, false)
})
```

- [ ] **Step 2: Run the finance logic tests to verify the new test fails**

Run: `node --test src/lib/__tests__/*.test.js`
Expected: FAIL because `buildNextRecurringConta` is not implemented yet.

- [ ] **Step 3: Implement the minimal helper and Firestore hook layer**

```js
// Add to src/lib/finance.js
export function buildNextRecurringConta(conta) {
  return {
    nome: conta.nome,
    valor: conta.valor,
    vencimento: getNextRecurringDate(conta.vencimento),
    recorrente: true,
    observacao: conta.observacao || '',
    paga: false,
    pagaEm: null,
    origemRecorrenteId: conta.origemRecorrenteId || null
  }
}
```

```js
// src/hooks/useFirestore.js
import { useEffect, useMemo } from 'react'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc
} from 'firebase/firestore'
import { db } from '../firebase'
import { useAppStore } from '../store'
import { buildNextRecurringConta } from '../lib/finance'

function useCollectionSync(collectionName, orderField, direction = 'asc', setter) {
  const householdId = useAppStore((state) => state.householdId)

  useEffect(() => {
    const ref = query(collection(db, 'casas', householdId, collectionName), orderBy(orderField, direction))
    return onSnapshot(ref, (snapshot) => {
      setter(snapshot.docs.map((item) => ({ id: item.id, ...item.data() })))
    })
  }, [collectionName, direction, householdId, orderField, setter])
}

export function useContas() {
  const householdId = useAppStore((state) => state.householdId)
  const setContas = useAppStore((state) => state.setContas)
  const showToast = useAppStore((state) => state.showToast)

  useCollectionSync('contas', 'vencimento', 'asc', setContas)

  return useMemo(() => ({
    async saveConta(data) {
      try {
        await addDoc(collection(db, 'casas', householdId, 'contas'), {
          ...data,
          paga: Boolean(data.paga),
          pagaEm: data.paga ? new Date().toISOString() : null,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        })
      } catch (error) {
        showToast(error.message, 'error')
      }
    },
    async deleteConta(id) {
      try {
        await deleteDoc(doc(db, 'casas', householdId, 'contas', id))
      } catch (error) {
        showToast(error.message, 'error')
      }
    },
    async marcarPaga(id, isPaid, conta) {
      try {
        await updateDoc(doc(db, 'casas', householdId, 'contas', id), {
          paga: isPaid,
          pagaEm: isPaid ? new Date().toISOString() : null,
          updatedAt: serverTimestamp()
        })

        if (isPaid && conta.recorrente) {
          await addDoc(collection(db, 'casas', householdId, 'contas'), {
            ...buildNextRecurringConta({ ...conta, origemRecorrenteId: conta.origemRecorrenteId || id }),
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
          })
        }
      } catch (error) {
        showToast(error.message, 'error')
      }
    }
  }), [householdId, showToast])
}
```

- [ ] **Step 4: Run the finance logic tests and a syntax smoke check**

Run: `node --test src/lib/__tests__/*.test.js`
Expected: PASS including the new recurring-bill test.

Run: `node --check src/hooks/useFirestore.js`
Expected: PASS with no syntax errors.

- [ ] **Step 5: Commit the Firestore sync layer**

```bash
git add src/hooks/useFirestore.js src/lib/finance.js src/lib/__tests__/finance.test.js
git commit -m "feat: add firestore hooks and recurring bills logic"
```

## Task 7: Build the App Shell and Global Styling

**Files:**
- Create: `C:\Users\User\Documents\appdocasal\src\main.jsx`
- Create: `C:\Users\User\Documents\appdocasal\src\App.jsx`
- Create: `C:\Users\User\Documents\appdocasal\src\App.module.css`
- Create: `C:\Users\User\Documents\appdocasal\src\styles\global.css`

- [ ] **Step 1: Write the failing build check**

Run: `npm run build`
Expected: FAIL because `src/main.jsx` and `src/App.jsx` do not exist yet.

- [ ] **Step 2: Write the minimal app shell**

```jsx
// src/main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { registerSW } from 'virtual:pwa-register'
import App from './App'
import './styles/global.css'

registerSW({ immediate: true })

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
```

```jsx
// src/App.jsx
import { useEffect } from 'react'
import styles from './App.module.css'
import { onForegroundMessage, registerFCMToken } from './firebase'
import { useAppStore } from './store'
import BottomNav from './components/BottomNav/BottomNav'
import Toast from './components/Toast/Toast'
import NotifBanner from './components/NotifBanner/NotifBanner'
import Home from './modules/Home/Home'
import Remedios from './modules/Remedios/Remedios'
import Financas from './modules/Financas/Financas'
import Academia from './modules/Academia/Academia'

const tabs = [
  { id: 'home', component: <Home /> },
  { id: 'remedios', component: <Remedios /> },
  { id: 'financas', component: <Financas /> },
  { id: 'academia', component: <Academia /> }
]

export default function App() {
  const activeTab = useAppStore((state) => state.activeTab)
  const householdId = useAppStore((state) => state.householdId)
  const showToast = useAppStore((state) => state.showToast)

  useEffect(() => {
    const unsubscribe = onForegroundMessage((payload) => {
      showToast(payload.notification?.body || 'Nova notificacao', 'info')
    })

    if (typeof Notification !== 'undefined' && Notification.permission === 'granted') {
      registerFCMToken(householdId).catch(() => {})
    }

    return unsubscribe
  }, [householdId, showToast])

  return (
    <div className={styles.appShell}>
      <header className={styles.header}>
        <div>
          <h1>🏠 Nossa Casa</h1>
          <p>João Pedro &amp; Tefinha</p>
        </div>
        <span className={styles.firebaseDot}>Firebase</span>
      </header>
      <NotifBanner />
      <main className={styles.main}>
        {tabs.map((tab) => (
          <section key={tab.id} className={styles.tabPanel} hidden={activeTab !== tab.id}>
            {tab.component}
          </section>
        ))}
      </main>
      <BottomNav />
      <Toast />
    </div>
  )
}
```

- [ ] **Step 3: Add the base global styles**

```css
:root {
  --bg: #0b1020;
  --bg-soft: #12182b;
  --card: rgba(255, 255, 255, 0.07);
  --line: rgba(255, 255, 255, 0.08);
  --text: #eef3ff;
  --muted: #8a96b5;
  --accent: #7c5cff;
  --accent2: #22d3ee;
  --good: #22c55e;
  --warn: #f59e0b;
  --danger: #ef4444;
  --radius: 16px;
  --font: 'Sora', system-ui, sans-serif;
}

* { box-sizing: border-box; }
html, body, #root { min-height: 100%; }
body {
  margin: 0;
  font-family: var(--font);
  color: var(--text);
  background:
    radial-gradient(circle at top left, rgba(124, 92, 255, 0.28), transparent 35%),
    radial-gradient(circle at top right, rgba(34, 211, 238, 0.18), transparent 35%),
    var(--bg);
}
button, input, select, textarea { font: inherit; }
button { min-height: 44px; transition: 0.18s ease; }
```

- [ ] **Step 4: Run the build again to verify the app shell compiles**

Run: `npm run build`
Expected: FAIL later on missing components/modules, proving the root shell is wired correctly.

- [ ] **Step 5: Commit the app shell checkpoint**

```bash
git add src/main.jsx src/App.jsx src/App.module.css src/styles/global.css
git commit -m "feat: add app shell and global theme"
```

## Task 8: Implement Shared UI Components

**Files:**
- Create: component `.jsx` and `.module.css` files under `src/components/BottomNav`, `BottomSheet`, `Toast`, `Badge`, `EmptyState`, `FAB`, and `NotifBanner`

- [ ] **Step 1: Write the failing build check for missing components**

Run: `npm run build`
Expected: FAIL on unresolved imports from `src/components/...`.

- [ ] **Step 2: Implement the minimal reusable components**

```jsx
// src/components/Badge/Badge.jsx
import styles from './Badge.module.css'

export default function Badge({ status = 'info', label }) {
  return <span className={`${styles.badge} ${styles[status]}`}>{label}</span>
}
```

```jsx
// src/components/BottomNav/BottomNav.jsx
import { Dumbbell, House, Pill, Wallet } from 'lucide-react'
import styles from './BottomNav.module.css'
import { useAppStore } from '../../store'

const items = [
  { id: 'home', label: 'Home', icon: House },
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
        <button key={id} type="button" className={activeTab === id ? styles.active : styles.item} onClick={() => setActiveTab(id)}>
          <Icon size={20} />
          <span>{label}</span>
        </button>
      ))}
    </nav>
  )
}
```

```jsx
// src/components/BottomSheet/BottomSheet.jsx
import { useEffect } from 'react'
import styles from './BottomSheet.module.css'

export default function BottomSheet({ open, onClose, title, children }) {
  useEffect(() => {
    document.body.classList.toggle('sheet-open', open)
    return () => document.body.classList.remove('sheet-open')
  }, [open])

  if (!open) return null

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.sheet} onClick={(event) => event.stopPropagation()}>
        <div className={styles.handle} />
        <h2>{title}</h2>
        {children}
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Add the CSS Modules for shared layout and states**

```css
/* src/components/BottomNav/BottomNav.module.css */
.nav {
  position: sticky;
  bottom: 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  min-height: calc(64px + env(safe-area-inset-bottom));
  padding: 8px 12px calc(8px + env(safe-area-inset-bottom));
  background: rgba(11, 16, 32, 0.88);
  backdrop-filter: blur(18px);
  border-top: 1px solid var(--line);
}
.item, .active {
  border: 0;
  background: transparent;
  color: var(--muted);
}
.active {
  color: var(--accent);
}
```

- [ ] **Step 4: Run the build again to verify shared components compile**

Run: `npm run build`
Expected: FAIL next on missing module implementations rather than shared component imports.

- [ ] **Step 5: Commit the reusable component layer**

```bash
git add src/components
git commit -m "feat: add reusable mobile ui components"
```

## Task 9: Implement the Home Module

**Files:**
- Create: `C:\Users\User\Documents\appdocasal\src\modules\Home\Home.jsx`
- Create: `C:\Users\User\Documents\appdocasal\src\modules\Home\Home.module.css`
- Modify: `C:\Users\User\Documents\appdocasal\src\lib\finance.js`
- Modify: `C:\Users\User\Documents\appdocasal\src\lib\training.js`

- [ ] **Step 1: Write the failing home-summary tests**

```js
import { getPendingTotalInWindow } from '../finance.js'

test('getPendingTotalInWindow sums unpaid accounts due within seven days', () => {
  const total = getPendingTotalInWindow([
    { valor: 100, vencimento: '2026-04-06', paga: false },
    { valor: 50, vencimento: '2026-04-20', paga: false },
    { valor: 25, vencimento: '2026-04-07', paga: true }
  ], new Date('2026-04-05T12:00:00'))

  assert.equal(total, 100)
})
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `node --test src/lib/__tests__/*.test.js`
Expected: FAIL because `getPendingTotalInWindow` is missing.

- [ ] **Step 3: Implement the selectors and the Home screen**

```js
// Add to src/lib/finance.js
export function getPendingTotalInWindow(contas, now = new Date(), maxDays = 7) {
  return contas.reduce((sum, conta) => {
    if (conta.paga) return sum
    const diff = differenceInCalendarDays(parseISO(conta.vencimento), now)
    return diff >= 0 && diff <= maxDays ? sum + Number(conta.valor || 0) : sum
  }, 0)
}
```

```jsx
// src/modules/Home/Home.jsx
import styles from './Home.module.css'
import { useAppStore } from '../../store'
import { getPendingTotalInWindow } from '../../lib/finance'
import { getStreakDays } from '../../lib/training'

export default function Home() {
  const meds = useAppStore((state) => state.meds)
  const contas = useAppStore((state) => state.contas)
  const historico = useAppStore((state) => state.historico)

  const pendingTotal = getPendingTotalInWindow(contas)
  const streak = getStreakDays(historico)

  return (
    <section className={styles.screen}>
      <h2 className={styles.title}>Boa sorte com a rotina de hoje</h2>
      <div className={styles.grid}>
        <article className={styles.card}>Remédios: {meds.length}</article>
        <article className={styles.card}>Contas: R$ {pendingTotal.toFixed(2)}</article>
        <article className={styles.card}>João: 🔥 {streak}</article>
        <article className={styles.card}>Tefinha: 🔥 {streak}</article>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Run tests and build**

Run: `node --test src/lib/__tests__/*.test.js`
Expected: PASS including the new home-summary test.

Run: `npm run build`
Expected: FAIL next on missing Remedios, Financas, or Academia details.

- [ ] **Step 5: Commit the Home module**

```bash
git add src/modules/Home src/lib/finance.js src/lib/__tests__/finance.test.js
git commit -m "feat: add home dashboard module"
```

## Task 10: Implement the Remedios Module

**Files:**
- Create: `C:\Users\User\Documents\appdocasal\src\modules\Remedios\Remedios.jsx`
- Create: `C:\Users\User\Documents\appdocasal\src\modules\Remedios\Remedios.module.css`
- Create: `C:\Users\User\Documents\appdocasal\src\modules\Remedios\MedCard.jsx`
- Create: `C:\Users\User\Documents\appdocasal\src\modules\Remedios\MedCard.module.css`
- Create: `C:\Users\User\Documents\appdocasal\src\modules\Remedios\MedForm.jsx`
- Create: `C:\Users\User\Documents\appdocasal\src\modules\Remedios\MedForm.module.css`
- Modify: `C:\Users\User\Documents\appdocasal\src\hooks\useFirestore.js`

- [ ] **Step 1: Write the failing alert-list test**

```js
import { getMedAlerts } from '../meds.js'

test('getMedAlerts returns low-stock medicines before safe ones', () => {
  const alerts = getMedAlerts([
    { name: 'A', qty: 2, alertQty: 5, dailyUse: 1 },
    { name: 'B', qty: 20, alertQty: 5, dailyUse: 1 }
  ])

  assert.equal(alerts.length, 1)
  assert.equal(alerts[0].name, 'A')
})
```

- [ ] **Step 2: Run the logic tests to verify they fail**

Run: `node --test src/lib/__tests__/*.test.js`
Expected: FAIL because `getMedAlerts` is missing.

- [ ] **Step 3: Implement medicine selectors, Firestore handlers, and UI**

```js
// Add to src/lib/meds.js
export function getMedAlerts(meds) {
  return meds
    .filter((med) => getMedStatus(med) !== 'ok')
    .sort((a, b) => getRemainingDays(a) - getRemainingDays(b))
}
```

```jsx
// src/modules/Remedios/MedCard.jsx
import Badge from '../../components/Badge/Badge'
import styles from './MedCard.module.css'

export default function MedCard({ med, onAdjust, onEdit }) {
  return (
    <article className={styles.card}>
      <div className={styles.header}>
        <strong>{med.name}</strong>
        <div className={styles.badges}>
          <Badge status="info" label={med.person} />
          <Badge status={med.status} label={med.statusLabel} />
        </div>
      </div>
      <p>{med.dosage} · {med.frequency} · ⏰ {med.times || 'Sem horário'}</p>
      <div className={styles.actions}>
        <button type="button" onClick={() => onAdjust(med.id, -1)}>-1</button>
        <button type="button" onClick={() => onAdjust(med.id, 1)}>+1</button>
        <button type="button" onClick={() => onEdit(med)}>✏️ Editar</button>
      </div>
    </article>
  )
}
```

```jsx
// src/modules/Remedios/Remedios.jsx
import { useState } from 'react'
import styles from './Remedios.module.css'
import FAB from '../../components/FAB/FAB'
import BottomSheet from '../../components/BottomSheet/BottomSheet'
import MedCard from './MedCard'
import MedForm from './MedForm'
import { useMeds } from '../../hooks/useFirestore'
import { useAppStore } from '../../store'
import { getMedAlerts, getMedStatus, getRemainingDays } from '../../lib/meds'

export default function Remedios() {
  const meds = useAppStore((state) => state.meds)
  const { adjustQty, saveMed, deleteMed } = useMeds()
  const [editing, setEditing] = useState(null)

  const enriched = meds.map((med) => ({
    ...med,
    status: getMedStatus(med),
    statusLabel: getMedStatus(med) === 'danger' ? 'Crítico' : getMedStatus(med) === 'warn' ? 'Atenção' : 'OK',
    remainingDays: getRemainingDays(med)
  }))

  return (
    <section className={styles.screen}>
      <div className={styles.alerts}>
        {getMedAlerts(enriched).map((med) => <p key={med.id}>{med.name} precisa de reposição</p>)}
      </div>
      <div className={styles.list}>
        {enriched.map((med) => (
          <MedCard key={med.id} med={med} onAdjust={adjustQty} onEdit={setEditing} />
        ))}
      </div>
      <FAB onClick={() => setEditing({})} label="Adicionar remédio" />
      <BottomSheet open={Boolean(editing)} onClose={() => setEditing(null)} title="Remédio">
        <MedForm initialData={editing} onSave={saveMed} onDelete={deleteMed} onClose={() => setEditing(null)} />
      </BottomSheet>
    </section>
  )
}
```

- [ ] **Step 4: Run the tests and build**

Run: `node --test src/lib/__tests__/*.test.js`
Expected: PASS with the new medicine selector test.

Run: `npm run build`
Expected: FAIL next on the unfinished finance or workout modules, not on Remedios imports.

- [ ] **Step 5: Commit the Remedios module**

```bash
git add src/modules/Remedios src/lib/meds.js src/lib/__tests__/meds.test.js src/hooks/useFirestore.js
git commit -m "feat: add medicines management module"
```

## Task 11: Implement the Financas Shell and Gastos Tab

**Files:**
- Create: `C:\Users\User\Documents\appdocasal\src\modules\Financas\Financas.jsx`
- Create: `C:\Users\User\Documents\appdocasal\src\modules\Financas\Financas.module.css`
- Create: `C:\Users\User\Documents\appdocasal\src\modules\Financas\GastosTab.jsx`
- Create: `C:\Users\User\Documents\appdocasal\src\modules\Financas\GastosTab.module.css`
- Modify: `C:\Users\User\Documents\appdocasal\src\hooks\useFirestore.js`

- [ ] **Step 1: Write the failing category-summary test**

```js
import { groupGastosByCategoria } from '../finance.js'

test('groupGastosByCategoria returns totals and percentages by category', () => {
  const summary = groupGastosByCategoria([
    { categoria: 'Casa', valor: 100 },
    { categoria: 'Casa', valor: 50 },
    { categoria: 'Saude', valor: 50 }
  ])

  assert.equal(summary.Casa.total, 150)
  assert.equal(summary.Saude.percent, 25)
})
```

- [ ] **Step 2: Run the logic tests to verify they fail**

Run: `node --test src/lib/__tests__/*.test.js`
Expected: FAIL because `groupGastosByCategoria` is missing.

- [ ] **Step 3: Implement finance grouping and the gastos tab**

```js
// Add to src/lib/finance.js
export function groupGastosByCategoria(gastos) {
  const total = gastos.reduce((sum, item) => sum + Number(item.valor || 0), 0)
  return gastos.reduce((acc, item) => {
    const current = acc[item.categoria] || { total: 0, percent: 0 }
    current.total += Number(item.valor || 0)
    current.percent = total ? Math.round((current.total / total) * 100) : 0
    acc[item.categoria] = current
    return acc
  }, {})
}
```

```jsx
// src/modules/Financas/GastosTab.jsx
import { useMemo, useState } from 'react'
import styles from './GastosTab.module.css'
import BottomSheet from '../../components/BottomSheet/BottomSheet'
import FAB from '../../components/FAB/FAB'
import { useGastos } from '../../hooks/useFirestore'
import { useAppStore } from '../../store'
import { formatCurrency } from '../../lib/formatters'
import { groupGastosByCategoria } from '../../lib/finance'

export default function GastosTab() {
  const gastos = useAppStore((state) => state.gastos)
  const { saveGasto, deleteGasto } = useGastos()
  const [open, setOpen] = useState(false)
  const summary = useMemo(() => groupGastosByCategoria(gastos), [gastos])

  return (
    <section className={styles.tab}>
      <h3>{formatCurrency(gastos.reduce((sum, item) => sum + Number(item.valor || 0), 0))}</h3>
      <div className={styles.categories}>
        {Object.entries(summary).map(([name, data]) => <p key={name}>{name}: {data.percent}%</p>)}
      </div>
      <ul className={styles.list}>
        {gastos.slice(0, 20).map((gasto) => (
          <li key={gasto.id}>
            <span>{gasto.descricao}</span>
            <button type="button" onClick={() => window.confirm('Excluir gasto?') && deleteGasto(gasto.id)}>🗑</button>
          </li>
        ))}
      </ul>
      <FAB onClick={() => setOpen(true)} label="Adicionar gasto" />
      <BottomSheet open={open} onClose={() => setOpen(false)} title="Novo gasto">
        <form onSubmit={(event) => { event.preventDefault(); saveGasto({ descricao: 'Novo', valor: 0, categoria: 'Outros', data: new Date().toISOString().slice(0, 10), pessoa: 'Casal' }); setOpen(false) }}>
          <button type="submit">Salvar</button>
        </form>
      </BottomSheet>
    </section>
  )
}
```

- [ ] **Step 4: Run the tests and build**

Run: `node --test src/lib/__tests__/*.test.js`
Expected: PASS including the category-summary test.

Run: `npm run build`
Expected: FAIL next on missing `ContasTab`, `MetasTab`, or Academia details.

- [ ] **Step 5: Commit the gastos tab**

```bash
git add src/modules/Financas src/lib/finance.js src/lib/__tests__/finance.test.js src/hooks/useFirestore.js
git commit -m "feat: add realtime spending tab"
```

## Task 12: Implement ContasTab with Recurring-Bill UI

**Files:**
- Create: `C:\Users\User\Documents\appdocasal\src\modules\Financas\ContasTab.jsx`
- Create: `C:\Users\User\Documents\appdocasal\src\modules\Financas\ContasTab.module.css`
- Modify: `C:\Users\User\Documents\appdocasal\src\modules\Financas\Financas.jsx`
- Modify: `C:\Users\User\Documents\appdocasal\src\hooks\useFirestore.js`

- [ ] **Step 1: Write the failing due-window count test**

```js
import { countContasDueSoon } from '../finance.js'

test('countContasDueSoon counts unpaid bills due in seven days', () => {
  const count = countContasDueSoon([
    { vencimento: '2026-04-06', paga: false },
    { vencimento: '2026-04-20', paga: false },
    { vencimento: '2026-04-04', paga: false }
  ], new Date('2026-04-05T12:00:00'))

  assert.equal(count, 1)
})
```

- [ ] **Step 2: Run the logic tests to verify they fail**

Run: `node --test src/lib/__tests__/*.test.js`
Expected: FAIL because `countContasDueSoon` is missing.

- [ ] **Step 3: Implement the selector and contas UI**

```js
// Add to src/lib/finance.js
export function countContasDueSoon(contas, now = new Date(), maxDays = 7) {
  return contas.filter((conta) => {
    if (conta.paga) return false
    const diff = differenceInCalendarDays(parseISO(conta.vencimento), now)
    return diff >= 0 && diff <= maxDays
  }).length
}
```

```jsx
// src/modules/Financas/ContasTab.jsx
import styles from './ContasTab.module.css'
import Badge from '../../components/Badge/Badge'
import { useContas } from '../../hooks/useFirestore'
import { useAppStore } from '../../store'
import { getContaStatus } from '../../lib/finance'
import { formatCurrency } from '../../lib/formatters'

export default function ContasTab() {
  const contas = useAppStore((state) => state.contas)
  const { marcarPaga, deleteConta } = useContas()

  return (
    <section className={styles.tab}>
      {contas.map((conta) => {
        const status = getContaStatus(conta)
        return (
          <article key={conta.id} className={styles.card}>
            <div>
              <strong>{conta.nome}</strong>
              <p>{formatCurrency(conta.valor)}</p>
            </div>
            <Badge status={status.tone === 'danger' ? 'danger' : status.tone === 'warn' ? 'warn' : 'ok'} label={status.label} />
            <button type="button" onClick={() => marcarPaga(conta.id, !conta.paga, conta)}>
              {conta.paga ? '↩ Reabrir' : '✓ Marcar paga'}
            </button>
            <button type="button" aria-label="Excluir conta" onClick={() => window.confirm('Excluir conta?') && deleteConta(conta.id)}>🗑</button>
          </article>
        )
      })}
    </section>
  )
}
```

- [ ] **Step 4: Run the tests and build**

Run: `node --test src/lib/__tests__/*.test.js`
Expected: PASS including the due-window test.

Run: `npm run build`
Expected: FAIL next on missing `MetasTab` or workout module imports.

- [ ] **Step 5: Commit the recurring bills UI**

```bash
git add src/modules/Financas/ContasTab.jsx src/modules/Financas/ContasTab.module.css src/modules/Financas/Financas.jsx src/lib/finance.js src/lib/__tests__/finance.test.js
git commit -m "feat: add accounts tab with recurrence handling"
```

## Task 13: Implement MetasTab and Finish the Finance Module

**Files:**
- Create: `C:\Users\User\Documents\appdocasal\src\modules\Financas\MetasTab.jsx`
- Create: `C:\Users\User\Documents\appdocasal\src\modules\Financas\MetasTab.module.css`
- Modify: `C:\Users\User\Documents\appdocasal\src\modules\Financas\Financas.jsx`
- Modify: `C:\Users\User\Documents\appdocasal\src\hooks\useFirestore.js`

- [ ] **Step 1: Write the failing meta progress test**

```js
import { getMetaProgress } from '../finance.js'

test('getMetaProgress returns 100 when the goal is fully funded', () => {
  assert.equal(getMetaProgress({ valorAtual: 1000, valorAlvo: 1000 }), 100)
})
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npm run test:logic`
Expected: FAIL because `getMetaProgress` is missing.

- [ ] **Step 3: Implement the selector and metas UI**

```js
// Add to src/lib/finance.js
export function getMetaProgress(meta) {
  if (!meta.valorAlvo) return 0
  return Math.min(100, Math.round((Number(meta.valorAtual || 0) / Number(meta.valorAlvo)) * 100))
}
```

```jsx
// src/modules/Financas/MetasTab.jsx
import styles from './MetasTab.module.css'
import { useMetas } from '../../hooks/useFirestore'
import { useAppStore } from '../../store'
import { formatCurrency } from '../../lib/formatters'
import { getMetaProgress } from '../../lib/finance'

export default function MetasTab() {
  const metas = useAppStore((state) => state.metas)
  const { depositar, deleteMeta } = useMetas()

  return (
    <section className={styles.tab}>
      {metas.map((meta) => {
        const progress = getMetaProgress(meta)
        return (
          <article key={meta.id} className={styles.card}>
            <strong>{meta.nome}</strong>
            <p>{formatCurrency(meta.valorAtual)} / {formatCurrency(meta.valorAlvo)}</p>
            <progress className={styles.progress} max="100" value={progress} />
            <button type="button" onClick={() => depositar(meta.id, 50)}>+ Depositar</button>
            <button type="button" onClick={() => window.confirm('Excluir meta?') && deleteMeta(meta.id)}>🗑</button>
          </article>
        )
      })}
    </section>
  )
}
```

- [ ] **Step 4: Run the tests and build**

Run: `npm run test:logic`
Expected: PASS including the goal-progress test.

Run: `npm run build`
Expected: FAIL next only on unfinished Academia files.

- [ ] **Step 5: Commit the completed finance module**

```bash
git add src/modules/Financas src/lib/finance.js src/lib/__tests__/finance.test.js src/hooks/useFirestore.js
git commit -m "feat: finish finance module"
```

## Task 14: Add the Workout Seed Data and Import Flow

**Files:**
- Create: `C:\Users\User\Documents\appdocasal\src\data\treinos-seed.js`
- Modify: `C:\Users\User\Documents\appdocasal\src\hooks\useFirestore.js`

- [ ] **Step 1: Write the failing seed presence check**

```js
import { readFileSync } from 'node:fs'

const seed = readFileSync('src/data/treinos-seed.js', 'utf8')
if (!seed.includes('treinosJoao')) throw new Error('missing treinosJoao')
if (!seed.includes('treinosTefinha')) throw new Error('missing treinosTefinha')
if (!seed.includes('allTreinos')) throw new Error('missing allTreinos')
```

- [ ] **Step 2: Run the seed check to verify it fails**

Run: `node scripts/check-seed.mjs`
Expected: FAIL because the seed file does not exist yet.

- [ ] **Step 3: Add the exact seed file and import helper**

```js
// src/data/treinos-seed.js
export const treinosJoao = [
  {
    nome: 'Segunda — Muay Thai + Superior Leve',
    pessoa: 'João Pedro', diaSemana: 'seg',
    tags: ['muay-thai', 'musculação'],
    exercicios: [
      { nome: 'Treino de Muay Thai', series: 1, reps: '60 min', carga: 0, obs: 'Cardio principal do dia' },
      { nome: 'Puxada Frontal', series: 2, reps: '10–12', carga: 0, obs: '' },
      { nome: 'Supino Máquina', series: 2, reps: '10–12', carga: 0, obs: '' },
      { nome: 'Tríceps Corda / Máquina', series: 2, reps: '10', carga: 0, obs: '' },
      { nome: 'Bíceps Máquina / Halter', series: 2, reps: '10', carga: 0, obs: '' },
    ]
  },
  {
    nome: 'Terça — Pernas + Cardio',
    pessoa: 'João Pedro', diaSemana: 'ter',
    tags: ['musculação', 'cardio'],
    exercicios: [
      { nome: 'Leg Press', series: 3, reps: '10–12', carga: 0, obs: '' },
      { nome: 'Mesa Flexora', series: 3, reps: '12', carga: 0, obs: '' },
      { nome: 'Cadeira Extensora', series: 3, reps: '12–15', carga: 0, obs: '' },
      { nome: 'Panturrilha', series: 3, reps: '15–20', carga: 0, obs: '' },
      { nome: 'Caminhada Inclinada ou Bike', series: 1, reps: '20–25 min', carga: 0, obs: 'Ritmo leve a moderado' },
    ]
  },
  {
    nome: 'Quarta — Muay Thai',
    pessoa: 'João Pedro', diaSemana: 'qua',
    tags: ['muay-thai'],
    exercicios: [
      { nome: 'Treino de Muay Thai', series: 1, reps: '60 min', carga: 0, obs: 'Dia de foco no ringue' },
      { nome: 'Abdômen Leve (opcional)', series: 2, reps: '2–3 séries', carga: 0, obs: 'Se tiver energia' },
    ]
  },
  {
    nome: 'Quinta — Superior Completo + Cardio',
    pessoa: 'João Pedro', diaSemana: 'qui',
    tags: ['musculação', 'cardio'],
    exercicios: [
      { nome: 'Puxada Frontal', series: 3, reps: '10–12', carga: 0, obs: '' },
      { nome: 'Remada Máquina / Serrote', series: 3, reps: '10–12', carga: 0, obs: '' },
      { nome: 'Supino Máquina', series: 3, reps: '10–12', carga: 0, obs: '' },
      { nome: 'Desenvolvimento Máquina', series: 3, reps: '10', carga: 0, obs: '' },
      { nome: 'Tríceps Corda / Máquina', series: 3, reps: '10–12', carga: 0, obs: '' },
      { nome: 'Bíceps Máquina / Halter', series: 3, reps: '10–12', carga: 0, obs: '' },
      { nome: 'Caminhada ou Bike', series: 1, reps: '20–25 min', carga: 0, obs: 'Ritmo constante' },
    ]
  },
  {
    nome: 'Sexta — Muay Thai + Full Body Leve',
    pessoa: 'João Pedro', diaSemana: 'sex',
    tags: ['muay-thai', 'musculação'],
    exercicios: [
      { nome: 'Treino de Muay Thai', series: 1, reps: '60 min', carga: 0, obs: 'Fechar a semana forte' },
      { nome: 'Leg Press', series: 2, reps: '10', carga: 0, obs: '' },
      { nome: 'Puxada', series: 2, reps: '10', carga: 0, obs: '' },
      { nome: 'Supino Máquina', series: 2, reps: '10', carga: 0, obs: '' },
      { nome: 'Elevação Lateral', series: 2, reps: '12', carga: 0, obs: '' },
    ]
  },
  {
    nome: 'Sábado — Cardio Opcional',
    pessoa: 'João Pedro', diaSemana: 'sab',
    tags: ['cardio'],
    exercicios: [
      { nome: 'Caminhada ou Bike', series: 1, reps: '30–40 min', carga: 0, obs: 'Ritmo tranquilo' },
    ]
  },
]

export const treinosTefinha = [
  {
    nome: 'Segunda — Inferiores A (Quadríceps & Glúteo)',
    pessoa: 'Tefinha', diaSemana: 'seg',
    tags: ['musculação', 'pernas'],
    exercicios: [
      { nome: 'Agachamento', series: 4, reps: '8–10', carga: 0, obs: 'Descanso 90s' },
      { nome: 'Leg Press', series: 4, reps: '10–12', carga: 0, obs: 'Descanso 90s' },
      { nome: 'Cadeira Extensora', series: 3, reps: '12–15', carga: 0, obs: 'Descanso 60s' },
      { nome: 'Afundo / Passada', series: 3, reps: '10/lado', carga: 0, obs: 'Descanso 60s' },
      { nome: 'Elevação Pélvica', series: 4, reps: '10–12', carga: 0, obs: 'Descanso 75s' },
      { nome: 'Abdutora Máquina', series: 3, reps: '15–20', carga: 0, obs: 'Descanso 45s' },
      { nome: 'Panturrilha', series: 3, reps: '15–20', carga: 0, obs: 'Descanso 45s' },
    ]
  },
  {
    nome: 'Terça — Superiores A (Costas & Ombros)',
    pessoa: 'Tefinha', diaSemana: 'ter',
    tags: ['musculação'],
    exercicios: [
      { nome: 'Puxada Frontal', series: 4, reps: '10–12', carga: 0, obs: 'Descanso 75s' },
      { nome: 'Remada', series: 4, reps: '10–12', carga: 0, obs: 'Descanso 75s' },
      { nome: 'Desenvolvimento Máquina', series: 3, reps: '10–12', carga: 0, obs: 'Descanso 75s' },
      { nome: 'Elevação Lateral', series: 3, reps: '12–15', carga: 0, obs: 'Descanso 60s' },
      { nome: 'Rosca Bíceps', series: 3, reps: '10–12', carga: 0, obs: 'Descanso 60s' },
      { nome: 'Tríceps', series: 3, reps: '10–12', carga: 0, obs: 'Descanso 60s' },
    ]
  },
  {
    nome: 'Quarta — Kickboxing',
    pessoa: 'Tefinha', diaSemana: 'qua',
    tags: ['kickboxing'],
    exercicios: [
      { nome: 'Treino de Kickboxing', series: 1, reps: '60 min', carga: 0, obs: 'Cardio & condicionamento do dia' },
    ]
  },
  {
    nome: 'Quinta — Superiores B (Peito & Ombros)',
    pessoa: 'Tefinha', diaSemana: 'qui',
    tags: ['musculação'],
    exercicios: [
      { nome: 'Supino Máquina', series: 3, reps: '10–12', carga: 0, obs: 'Descanso 75s' },
      { nome: 'Crucifixo', series: 3, reps: '12–15', carga: 0, obs: 'Descanso 60s' },
      { nome: 'Remada Unilateral', series: 3, reps: '10–12', carga: 0, obs: 'Descanso 75s' },
      { nome: 'Elevação Lateral', series: 3, reps: '12–15', carga: 0, obs: 'Descanso 60s' },
      { nome: 'Face Pull', series: 3, reps: '12–15', carga: 0, obs: 'Descanso 60s' },
    ]
  },
  {
    nome: 'Sexta — Inferiores C (Foco Glúteo)',
    pessoa: 'Tefinha', diaSemana: 'sex',
    tags: ['musculação', 'glúteo'],
    exercicios: [
      { nome: 'Agachamento Sumô', series: 4, reps: '10–12', carga: 0, obs: 'Descanso 90s' },
      { nome: 'Leg Press Alto (foco glúteo)', series: 3, reps: '10–12', carga: 0, obs: 'Descanso 75s' },
      { nome: 'Búlgaro', series: 3, reps: '10/lado', carga: 0, obs: 'Descanso 75s' },
      { nome: 'Elevação Pélvica c/ Barra', series: 4, reps: '8–10', carga: 0, obs: 'Descanso 75s' },
      { nome: 'Glúteo Máquina', series: 3, reps: '12–15', carga: 0, obs: 'Descanso 60s' },
    ]
  },
  {
    nome: 'Sábado — Kickboxing',
    pessoa: 'Tefinha', diaSemana: 'sab',
    tags: ['kickboxing'],
    exercicios: [
      { nome: 'Treino de Kickboxing', series: 1, reps: '60 min', carga: 0, obs: 'Fechar a semana com tudo' },
    ]
  },
]

export const allTreinos = [...treinosJoao, ...treinosTefinha]
```

```js
// Add to src/hooks/useFirestore.js
import { allTreinos } from '../data/treinos-seed'

export function useTreinos() {
  return {
    async importarSeed() {
      for (const treino of allTreinos) {
        await addDoc(collection(db, 'casas', householdId, 'treinos'), {
          ...treino,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        })
      }
      showToast('Treinos importados!', 'success')
    }
  }
}
```

- [ ] **Step 4: Run the seed check again**

Run: `node scripts/check-seed.mjs`
Expected: PASS with no output.

- [ ] **Step 5: Commit the seed layer**

```bash
git add src/data/treinos-seed.js src/hooks/useFirestore.js
git commit -m "feat: add workout seed data"
```

## Task 15: Implement TreinoCard, TreinoForm, and the Academia Treinos Tab

**Files:**
- Create: `C:\Users\User\Documents\appdocasal\src\modules\Academia\Academia.jsx`
- Create: `C:\Users\User\Documents\appdocasal\src\modules\Academia\Academia.module.css`
- Create: `C:\Users\User\Documents\appdocasal\src\modules\Academia\TreinoCard.jsx`
- Create: `C:\Users\User\Documents\appdocasal\src\modules\Academia\TreinoCard.module.css`
- Create: `C:\Users\User\Documents\appdocasal\src\modules\Academia\TreinoForm.jsx`
- Create: `C:\Users\User\Documents\appdocasal\src\modules\Academia\TreinoForm.module.css`

- [ ] **Step 1: Write the failing build check for Academia imports**

Run: `npm run build`
Expected: FAIL on missing `src/modules/Academia/...` files.

- [ ] **Step 2: Implement the workout cards and form**

```jsx
// src/modules/Academia/TreinoCard.jsx
import { useState } from 'react'
import styles from './TreinoCard.module.css'
import Badge from '../../components/Badge/Badge'
import { getDayEmoji } from '../../lib/training'

export default function TreinoCard({ treino, onDone, onEdit }) {
  const [open, setOpen] = useState(false)

  return (
    <article className={styles.card}>
      <button type="button" className={styles.header} onClick={() => setOpen((value) => !value)}>
        <span>{getDayEmoji(treino.diaSemana)}</span>
        <strong>{treino.nome}</strong>
        <Badge status="info" label={treino.pessoa} />
      </button>
      {open && (
        <div className={styles.body}>
          {treino.exercicios.map((item, index) => <p key={`${treino.id}-${index}`}>{item.nome} · {item.series}x{item.reps}</p>)}
          <div className={styles.footer}>
            <button type="button" onClick={() => onDone(treino)}>✓ Feito hoje!</button>
            <button type="button" onClick={() => onEdit(treino)}>✏️ Editar</button>
          </div>
        </div>
      )}
    </article>
  )
}
```

```jsx
// src/modules/Academia/Academia.jsx
import { useState } from 'react'
import styles from './Academia.module.css'
import EmptyState from '../../components/EmptyState/EmptyState'
import BottomSheet from '../../components/BottomSheet/BottomSheet'
import FAB from '../../components/FAB/FAB'
import { useTreinos } from '../../hooks/useFirestore'
import { useAppStore } from '../../store'
import TreinoCard from './TreinoCard'
import TreinoForm from './TreinoForm'
import HistoricoTab from './HistoricoTab'

export default function Academia() {
  const treinos = useAppStore((state) => state.treinos)
  const [tab, setTab] = useState('treinos')
  const [editing, setEditing] = useState(null)
  const { importarSeed, marcarRealizado, saveTreino, deleteTreino } = useTreinos()

  if (!treinos.length && tab === 'treinos') {
    return <EmptyState emoji="🏋️" title="Sem treinos ainda" description="Importe a grade padrão" actionLabel="Importar treinos padrão" onAction={importarSeed} />
  }

  return (
    <section className={styles.screen}>
      <div className={styles.tabs}>
        <button type="button" onClick={() => setTab('treinos')}>Treinos</button>
        <button type="button" onClick={() => setTab('historico')}>Histórico</button>
      </div>
      {tab === 'treinos' ? treinos.map((treino) => <TreinoCard key={treino.id} treino={treino} onDone={marcarRealizado} onEdit={setEditing} />) : <HistoricoTab />}
      <FAB onClick={() => setEditing({ exercicios: [] })} label="Adicionar treino" />
      <BottomSheet open={Boolean(editing)} onClose={() => setEditing(null)} title="Treino">
        <TreinoForm initialData={editing} onSave={saveTreino} onDelete={deleteTreino} onClose={() => setEditing(null)} />
      </BottomSheet>
    </section>
  )
}
```

- [ ] **Step 3: Run the build again to verify Academia compiles**

Run: `npm run build`
Expected: FAIL only on the missing `HistoricoTab` implementation or related imports.

- [ ] **Step 4: Commit the workout main tab**

```bash
git add src/modules/Academia
git commit -m "feat: add workout planner module"
```

## Task 16: Implement HistoricoTab and Finish Training Selectors

**Files:**
- Create: `C:\Users\User\Documents\appdocasal\src\modules\Academia\HistoricoTab.jsx`
- Create: `C:\Users\User\Documents\appdocasal\src\modules\Academia\HistoricoTab.module.css`
- Modify: `C:\Users\User\Documents\appdocasal\src\lib\training.js`

- [ ] **Step 1: Write the failing weekly-summary test**

```js
import { getWeeklyDots } from '../training.js'

test('getWeeklyDots marks trained days as true', () => {
  const dots = getWeeklyDots([
    { pessoa: 'Joao Pedro', realizadoEm: '2026-04-06T10:00:00.000Z' },
    { pessoa: 'Joao Pedro', realizadoEm: '2026-04-08T10:00:00.000Z' }
  ], 'Joao Pedro', new Date('2026-04-09T10:00:00.000Z'))

  assert.equal(dots.filter(Boolean).length, 2)
})
```

- [ ] **Step 2: Run the training tests to verify they fail**

Run: `npm run test:logic`
Expected: FAIL because `getWeeklyDots` is missing.

- [ ] **Step 3: Implement the selector and history tab**

```js
// Add to src/lib/training.js
import { endOfWeek, isSameDay, parseISO, startOfWeek, subDays } from 'date-fns'

export function getWeeklyDots(history, pessoa, now = new Date()) {
  const start = startOfWeek(now, { weekStartsOn: 1 })
  return Array.from({ length: 7 }, (_, index) => {
    const day = subDays(endOfWeek(start, { weekStartsOn: 1 }), 6 - index)
    return history.some((item) => item.pessoa === pessoa && isSameDay(parseISO(item.realizadoEm), day))
  })
}
```

```jsx
// src/modules/Academia/HistoricoTab.jsx
import styles from './HistoricoTab.module.css'
import { useAppStore } from '../../store'
import { getStreakDays, getWeeklyDots } from '../../lib/training'

export default function HistoricoTab() {
  const historico = useAppStore((state) => state.historico)
  const joaoDots = getWeeklyDots(historico, 'João Pedro')
  const tefinhaDots = getWeeklyDots(historico, 'Tefinha')
  const streak = getStreakDays(historico)

  return (
    <section className={styles.tab}>
      <div className={styles.summary}>
        <p>João Pedro: {joaoDots.map((dot, index) => <span key={index}>{dot ? '●' : '○'}</span>)}</p>
        <p>Tefinha: {tefinhaDots.map((dot, index) => <span key={index}>{dot ? '●' : '○'}</span>)}</p>
        <p>🔥 {streak} dias seguidos</p>
      </div>
      <ul className={styles.list}>
        {historico.slice(0, 30).map((item) => <li key={item.id}>{item.nome} · {item.pessoa}</li>)}
      </ul>
    </section>
  )
}
```

- [ ] **Step 4: Run tests and build**

Run: `npm run test:logic`
Expected: PASS including the weekly-summary test.

Run: `npm run build`
Expected: PASS for the whole app build.

- [ ] **Step 5: Commit the training history finish**

```bash
git add src/modules/Academia src/lib/training.js src/lib/__tests__/training.test.js
git commit -m "feat: finish workout history module"
```

## Task 17: Implement the Cloud Function Notification Flow

**Files:**
- Create: `C:\Users\User\Documents\appdocasal\functions\index.js`

- [ ] **Step 1: Write the failing function content check**

```js
import { readFileSync } from 'node:fs'

const content = readFileSync('functions/index.js', 'utf8')
if (!content.includes("schedule: '0 * * * *'")) throw new Error('missing schedule')
if (!content.includes('sendEachForMulticast')) throw new Error('missing multicast send')
if (!content.includes("America/Sao_Paulo")) throw new Error('missing timezone')
```

- [ ] **Step 2: Run the function content check to verify it fails**

Run: `node scripts/check-functions.mjs`
Expected: FAIL because `functions/index.js` does not exist yet.

- [ ] **Step 3: Implement the notification scheduler**

```js
const admin = require('firebase-admin')
const { onSchedule } = require('firebase-functions/v2/scheduler')

admin.initializeApp()

exports.pushHourly = onSchedule(
  {
    schedule: '0 * * * *',
    timeZone: 'America/Sao_Paulo',
    region: 'southamerica-east1'
  },
  async () => {
    const db = admin.firestore()
    const casas = await db.collection('casas').get()

    for (const casa of casas.docs) {
      const [tokensSnap] = await Promise.all([
        casa.ref.collection('fcmTokens').get(),
        casa.ref.collection('meds').get(),
        casa.ref.collection('contas').get()
      ])

      const tokens = tokensSnap.docs.map((doc) => doc.data().token).filter(Boolean)
      if (!tokens.length) continue

      const message = {
        tokens,
        notification: { title: 'Nossa Casa', body: 'Você tem lembretes pendentes' },
        android: { priority: 'high' },
        apns: { payload: { aps: { sound: 'default' } } }
      }

      await admin.messaging().sendEachForMulticast(message)
    }
  }
)
```

- [ ] **Step 4: Run the function content check again**

Run: `node scripts/check-functions.mjs`
Expected: PASS with no output.

- [ ] **Step 5: Commit the Cloud Function layer**

```bash
git add functions/index.js
git commit -m "feat: add scheduled notification function"
```

## Task 18: Final Prompt Compliance Sweep and Verification

**Files:**
- Verify: every file under `C:\Users\User\Documents\appdocasal`
- Verify: prompt-required tree and intentional support files only

- [ ] **Step 1: Run the logic tests**

Run: `npm run test:logic`
Expected: PASS.

- [ ] **Step 2: Run the production build**

Run: `npm run build`
Expected: PASS and create `dist`.

- [ ] **Step 3: Verify the final file list and prompt coverage**

Run: `rg --files`
Expected: the prompt-required files exist, plus only the intentional support files (`src/lib/*`, tests, scripts, docs, icons`).

- [ ] **Step 4: Smoke check Firebase and Functions syntax**

Run: `node --check src/firebase/index.js`
Expected: PASS.

Run: `node --check functions/index.js`
Expected: PASS.

- [ ] **Step 5: Commit the verified final state**

```bash
git add .
git commit -m "feat: complete Nossa Casa app"
```

## Self-Review

### Spec Coverage

- Infrastructure: covered by Tasks 2, 3, 5, 17, and 18.
- Shared components and shell: covered by Tasks 7 and 8.
- Home: covered by Task 9.
- Remedios: covered by Task 10.
- Financas including realtime and recurring bills: covered by Tasks 11, 12, and 13.
- Academia including seed import and history: covered by Tasks 14, 15, and 16.
- Verification and prompt compliance: covered by Task 18.

### Placeholder Scan

- The previous seed placeholder in Task 14 was replaced with the full approved dataset.
- The icon creation note in Task 3 remains procedural, but it is still actionable because the task explicitly requires real PNG files before the verification step.

### Type Consistency

- Store collections use `meds`, `gastos`, `contas`, `metas`, `treinos`, `historico`.
- Finance selectors consistently use `valor`, `vencimento`, `paga`, `recorrente`, `observacao`, and `origemRecorrenteId`.
- Training selectors consistently use `realizadoEm`, `pessoa`, `nome`, and `diaSemana`.

### Execution Notes

- Prefer implementing this plan in a fresh worktree if isolation becomes important.
- Keep commits aligned to task boundaries.
- Do not skip the failing-test steps for the `src/lib` helper layer; those helpers carry the critical business rules.
