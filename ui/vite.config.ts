import path from 'path';
import { defineConfig } from 'vite';

import tailwindcss from '@tailwindcss/vite';
import svgr from 'vite-plugin-svgr';
import react from '@vitejs/plugin-react-swc';

import pkg from './package.json';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), svgr()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  define: {
    'process.env': {},
    'process.env.NODE_ENV': JSON.stringify(
      process.env.NODE_ENV || 'development',
    ),
    global: 'globalThis',
  },
  css: {
    modules: {
      generateScopedName: 'auth0-[name]__[local]___[hash:base64:5]',
    },
  },
  build: {
    lib: {
      entry: './src/index.tsx',
      name: 'Auth0DocsUI',
      fileName: () => `auth0-docs-ui-${pkg.version}.umd.js`,
      formats: ['umd'],
    },
    rollupOptions: {
      output: {
        exports: 'named',
        // Configure CSS file to have same name as JS bundle
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith('.css')) {
            return `auth0-docs-ui-${pkg.version}.css`;
          }
          return assetInfo.name || '';
        },
      },
    },
  },
});
