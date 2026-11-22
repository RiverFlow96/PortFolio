import { configDefaults, defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const sourceDir = fileURLToPath(new URL('./src', import.meta.url))

export default defineConfig({
  base: process.env.VITE_BASE_PATH ?? '/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': sourceDir,
    },
  },
  test: {
    environment: 'jsdom',
    restoreMocks: true,
    exclude: [...configDefaults.exclude, 'e2e/**'],
  },
})
