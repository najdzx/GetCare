import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    react({
      jsxRuntime: 'automatic',
      include: [/\.jsx?$/, /node_modules\/react-big-calendar/], // explicitly include big calendar JSX
    }),
  ],
  optimizeDeps: {
    include: ['react-big-calendar'], // pre-bundle it for dev
  },
});
