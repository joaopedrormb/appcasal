import { readFileSync } from 'node:fs'
import { spawnSync } from 'node:child_process'

const ref = process.argv[2]

function readTargetFile(path) {
  if (!ref) {
    return readFileSync(path, 'utf8')
  }

  try {
    const result = spawnSync('git', ['show', `${ref}:${path}`], { encoding: 'utf8' })

    return result.status === 0 ? result.stdout : ''
  } catch {
    return ''
  }
}

const pkg = JSON.parse(readTargetFile('package.json') || '{}')
const vite = readTargetFile('vite.config.js')
const html = readTargetFile('index.html')
const firebaseJson = readTargetFile('firebase.json')

if (pkg.name !== 'nossa-casa') throw new Error('package name mismatch')
if (!vite.includes('VitePWA')) throw new Error('missing vite pwa plugin')
if (!vite.includes('short_name: "NossaCasa"')) throw new Error('missing short_name')
if (!html.includes('fonts.googleapis.com')) throw new Error('missing Sora font')
if (!firebaseJson.includes('"functions"')) throw new Error('missing firebase functions config')
