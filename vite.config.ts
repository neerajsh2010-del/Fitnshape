```ts
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.')
    }
  },

  server: {
    // HMR is disabled in AI Studio via DISABLE_HMR.
    hmr: process.env.DISABLE_HMR !== 'true',

    // Disable file watching when HMR is disabled.
    watch: process.env.DISABLE_HMR === 'true' ? null : {}
  },

  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
});
```
