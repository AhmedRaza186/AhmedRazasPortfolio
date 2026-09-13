import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    tailwindcss(),
    VitePWA({
      strategies: 'injectManifest',
      srcDir: '.',
      filename: 'sw.js',
      registerType: 'autoUpdate',
      includeAssets: ['apple-touch-icon.jpg'],
      injectManifest: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,jpeg,webp,webmanifest}']
      },
      manifest: {
        name: 'Ahmed Raza - Full Stack Developer',
        short_name: 'Ahmed Raza',
        description: 'Product-focused Full Stack Developer building robust MERN architecture with Node.js, Express, and REST APIs, alongside seamless frontend experiences.',
        theme_color: '#0f0f0f',
        background_color: '#0f0f0f',
        display: 'standalone',
        icons: [
          {
            src: '/pwa-192x192.jpg',
            sizes: '192x192',
            type: 'image/jpeg'
          },
          {
            src: '/pwa-512x512.jpg',
            sizes: '512x512',
            type: 'image/jpeg'
          },
          {
            src: '/pwa-512x512.jpg',
            sizes: '512x512',
            type: 'image/jpeg',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react')) return 'vendor-react';
            if (id.includes('gsap')) return 'vendor-gsap';
            if (id.includes('react-syntax-highlighter') || id.includes('react-markdown') || id.includes('remark')) return 'vendor-markdown';
            if (id.includes('lucide')) return 'vendor-icons';
            if (id.includes('matter-js')) return 'vendor-matter';
            return 'vendor';
          }
        }
      }
    }
  }
})
