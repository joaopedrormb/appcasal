import { existsSync, readFileSync } from 'node:fs'

if (!existsSync('public/icons/icon-192.png')) throw new Error('missing 192 icon')
if (!existsSync('public/icons/icon-512.png')) throw new Error('missing 512 icon')

const sw = readFileSync('public/firebase-messaging-sw.js', 'utf8')
if (!sw.includes('firebase-app-compat')) throw new Error('missing compat app import')
if (!sw.includes('onBackgroundMessage')) throw new Error('missing background handler')
