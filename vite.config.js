import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/token': {
        target: 'https://accounts.spotify.com',
        changeOrigin: true
      }
    }
  }
})
