import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    proxy: {
      '/api': 'https://lms-mern-aaj1.onrender.com',
    },
  },
  plugins: [react()],
});
