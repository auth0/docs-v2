import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import pkg from './package.json';

export default defineConfig({
  plugins: [
    react({
      babel: {
        parserOpts: {
          plugins: ['decorators-legacy', 'classProperties'],
        },
      },
    }),
    tailwindcss(),
  ],
  define: {
    'process.env': {},
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    global: 'globalThis',
  },
  css: {
    modules: {
      generateScopedName: 'auth0-[name]__[local]___[hash:base64:5]',
    },
  },
  server: {
    cors: true,
    host: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  },
  publicDir: false, // Disable public directory feature for library builds
  build: {
    lib: {
      entry: './src/index.ts',
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
