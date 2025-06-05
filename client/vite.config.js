// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
      historyApiFallback: true,
  // Optional: Enable this only during local development to avoid CORS issues
  server: {
    proxy: {
      '/api': {
        target: 'https://insurance-backend-1mft.onrender.com/api/v1', // ✅ your Render backend URL
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '/api')  // Adjust if needed
      }
    }
  }
});
