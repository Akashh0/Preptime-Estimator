import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  // ADD THIS BLOCK TO FIX THE FRAMER-MOTION ERROR
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion', 'react/jsx-runtime'],
  },
})