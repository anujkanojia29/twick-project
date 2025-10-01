import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Optimized for Vercel deployment
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          'twick-studio': ['@twick/studio'],
          'twick-timeline': ['@twick/timeline'],
          'twick-player': ['@twick/live-player'],
          'twick-canvas': ['@twick/canvas'],
          'twick-editor': ['@twick/video-editor'],
          'twick-media': ['@twick/media-utils']
        }
      }
    }
  },
  preview: {
    port: process.env.PORT ? parseInt(process.env.PORT) : 3000,
    host: '0.0.0.0'
  },
  server: {
    port: 3000,
    host: '0.0.0.0'
  }
})