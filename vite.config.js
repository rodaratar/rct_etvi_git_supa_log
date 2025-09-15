import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/rct_etvi_git_supa_log/',
  plugins: [react()],
})
