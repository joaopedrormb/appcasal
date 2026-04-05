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
