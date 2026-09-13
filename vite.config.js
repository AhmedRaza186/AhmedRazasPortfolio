import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') && !id.includes('@react-three')) return 'vendor-react';
            if (id.includes('three') || id.includes('@react-three')) return 'vendor-three';
            if (id.includes('gsap')) return 'vendor-gsap';
            if (id.includes('lucide')) return 'vendor-icons';
            if (id.includes('matter-js')) return 'vendor-matter';
            return 'vendor';
          }
        }
      }
    }
  }
})
