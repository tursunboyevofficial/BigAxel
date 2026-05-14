import path from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const apiTarget = (process.env.RECRUITING_BACKEND_URL || process.env.VITE_RECRUITING_BACKEND_URL || 'http://127.0.0.1:8877').replace(/\/$/, '')

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 8000,
    strictPort: false,
    proxy: {
      '/api': {
        target: apiTarget,
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
