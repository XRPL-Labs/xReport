import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { terminalPlugin } from './src/terminalPlugin'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), terminalPlugin()],
  server: {
    port: 3000
  },
  preview: {
    port: 3000
  }
})
