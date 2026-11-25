import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Two pages in one build:
//   /        -> the 2026 site (index.html + src/)
//   /2025/   -> the archived 2025 site (2025/index.html + 2025/src/)
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        archive2025: resolve(__dirname, '2025/index.html'),
      },
    },
  },
})
