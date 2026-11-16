import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

// The repository is named immaxvel.github.io, so GitHub Pages serves it from the root path.
// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    css: false,
  },
})
