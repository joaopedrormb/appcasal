import { existsSync, statSync } from 'node:fs'

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

const forbidden = [
  'config.js',
  'index.js',
  'functions-index.js',
  'sw.js',
  'manifest.json',
  'firebase-messaging-sw.js',
  'treinos-seed.js',
  'useFirestore.js'
]

const missing = []

for (const dir of scaffoldDirs) {
  if (!existsSync(dir) || !statSync(dir).isDirectory()) {
    missing.push(`missing dir: ${dir}`)
  }
}

for (const file of required) {
  if (!existsSync(file)) {
    missing.push(`missing: ${file}`)
  }
}

for (const file of forbidden) {
  if (existsSync(file)) {
    missing.push(`forbidden: ${file}`)
  }
}

if (missing.length > 0) {
  throw new Error(missing.join('\n'))
}
