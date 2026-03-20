import { defineConfig } from 'vite';

export default defineConfig({
  optimizeDeps: {
    include: ['handlebars'],
  },
  server: {
    port: 5173,
    open: true,
  },
  build: {
    outDir: 'dist',
    minify: 'terser',
  },
});
