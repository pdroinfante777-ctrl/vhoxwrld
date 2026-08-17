import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'vhox-google-site-verification',
      transformIndexHtml() {
        const verification = process.env.VITE_GOOGLE_SITE_VERIFICATION?.trim()
        return verification
          ? [{ tag: 'meta', attrs: { name: 'google-site-verification', content: verification }, injectTo: 'head' }]
          : []
      },
    },
  ],
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    sourcemap: false,
  },
  preview: { host: true },
})
