import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath, URL } from 'url';

// https://vite.dev/config/
export default defineConfig({
  base: '/keepintabs/',
  plugins: [react(), tailwindcss()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './testing/setup.js',
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          firebase: ['firebase/app', 'firebase/auth', 'firebase/firestore'],
        },
      },
    },
  },
  resolve: {
    alias: {
      // Use ESM-safe resolution for Vite config
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
