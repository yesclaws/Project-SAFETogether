import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/incidents": {
        target: "http://app:5000",
        secure: false,
      },
      "/summarize": {
        target: "http://app:5000",
        secure: false,
      }
    }
  }
})
