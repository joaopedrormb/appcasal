import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

const appRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)))
// Windows: o html-proxy do Vite compara caminhos com replace exacto; c: e C: quebram o cache.
const root =
  process.platform === 'win32' && /^[a-zA-Z]:/.test(appRoot)
    ? appRoot.charAt(0).toUpperCase() + appRoot.slice(1)
    : appRoot

export default defineConfig({
  root,
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icons/icon-192.png', 'icons/icon-512.png'],
      manifest: {
        name: 'Nossa Casa',
        short_name: "NossaCasa",
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
