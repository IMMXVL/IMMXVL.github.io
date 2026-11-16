import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

// GitHub Pages serves this project site from /<repository-name>/ on github.io.
// Local dev and tests keep the root path.
const repositoryName = 'immaxvel.github.io'

// https://vite.dev/config/
export default defineConfig({
  base: process.env.GITHUB_ACTIONS ? `/${repositoryName}/` : '/',
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    css: false,
  },
})
