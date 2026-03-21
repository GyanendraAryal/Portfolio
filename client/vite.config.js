import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-ui': ['framer-motion', 'lucide-react', 'clsx', 'tailwind-merge', 'react-hot-toast'],
          'vendor-core': ['react', 'react-dom', 'react-router-dom', 'axios', 'zustand'],
        }
      }
    },
    chunkSizeWarningLimit: 1000,
  }
})
