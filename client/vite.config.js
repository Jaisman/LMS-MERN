// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// export default defineConfig({
//   server: {
//     host:'localhost',
//     port:'5173',
//     proxy: {
//       '/api':'https://lms-mern-ten.vercel.app',
//     },
//   },
//   plugins: [react()],
// });










import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    host: 'localhost',
    port: '5173',
    proxy: {
      '/api': {
        target: 'https://lms-mern-ten.vercel.app',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '') // Optional: Remove '/api' prefix
      },
    },
  },
  plugins: [react()],
});

