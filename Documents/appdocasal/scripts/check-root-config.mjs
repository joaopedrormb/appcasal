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
