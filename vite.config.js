import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    global: 'window',
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['@heroicons/react', 'lucide-react', 'framer-motion'],
        }
      }
    }
  },
  server: {
    port: 5173,
    cors: {
      origin: ['https://fittrack-1-yefe.onrender.com'],
      credentials: true
    }
  }
});