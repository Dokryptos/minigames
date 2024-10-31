import { sentryVitePlugin } from '@sentry/vite-plugin';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import lqip from 'vite-plugin-lqip';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    lqip(),
    sentryVitePlugin({
      org: 'detectivebox',
      project: 'app-2',
      // Auth tokens can be obtained from https://sentry.io/orgredirect/organizations/:orgslug/settings/auth-tokens/
      authToken: process.env.SENTRY_AUTH_TOKEN,
    }),
  ],
  assetsInclude: ['**/*.md'],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          /**
           * This is a manual chunk for the Sentry SDK
           * It represents around 341.72 KB of the bundle, around 25% of the total size
           */
          if (id.includes('sentry')) {
            return 'sentry';
          }

          /**
           * 148.66 KB of the bundle
           * ~9% of the total size
           */
          if (id.includes('libphonenumber-js')) {
            return 'libphonenumber-js';
          }
        },
      },
    },
    sourcemap: true,
  },
});
