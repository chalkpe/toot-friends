import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/toot-friends/',
  build: { chunkSizeWarningLimit: 2000 },
})
