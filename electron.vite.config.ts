import react from '@vitejs/plugin-react';
import { defineConfig, defineViteConfig, externalizeDepsPlugin } from 'electron-vite';
import { resolve } from 'path';

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()],
  },
  preload: {
    plugins: [externalizeDepsPlugin()],
  },
  renderer: defineViteConfig(({ command, mode }) => {
    if (mode === 'development') {
      return {
        root: 'src/renderer/dev',
        build: {
          rollupOptions: {
            input: {
              main: resolve(__dirname, 'src/renderer/dev/index.html'),
              splash: resolve(__dirname, 'src/renderer/splash.html'),
            },
          },
        },
        plugins: [react({})],
      };
    } else {
      return {
        root: 'src/renderer',
        build: {
          rollupOptions: {
            input: {
              main: resolve(__dirname, 'src/renderer/index.html'),
              splash: resolve(__dirname, 'src/renderer/splash.html'),
            },
          },
        },
        plugins: [react({})],
      };
    }
  }),
});
