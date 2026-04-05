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

const scaffoldDirs = [
  'public',
  'public/icons',
  'functions',
  'src',
  'src/styles',
  'src/firebase',
  'src/store',
  'src/hooks',
  'src/data',
  'src/lib',
  'src/lib/__tests__',
  'src/components',
  'src/components/BottomNav',
  'src/components/BottomSheet',
  'src/components/Toast',
  'src/components/Badge',
  'src/components/EmptyState',
  'src/components/FAB',
  'src/components/NotifBanner',
  'src/modules',
  'src/modules/Home',
  'src/modules/Remedios',
  'src/modules/Financas',
  'src/modules/Academia'
]

const missing = []

for (const dir of scaffoldDirs) {
  if (!existsSync(dir)) {
    missing.push(`missing dir: ${dir}`)
  }
}

for (const file of required) {
  if (!existsSync(file)) {
    missing.push(`missing: ${file}`)
  }
}

if (missing.length > 0) {
  throw new Error(missing.join('\n'))
}
