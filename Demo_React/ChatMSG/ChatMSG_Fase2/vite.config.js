import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Redirige /api al servidor Express para que las cookies httpOnly funcionen
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true
      }
    }
  }
})
