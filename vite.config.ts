import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

function resolveRequiredPocketBaseUrl(mode: string): string {
  const env = loadEnv(mode, process.cwd(), '');
  const baseUrl = env.VITE_POCKETBASE_URL?.trim();

  if (baseUrl === undefined || baseUrl === '') {
    throw new Error(
      'Missing required configuration: VITE_POCKETBASE_URL must be provided for Vite.'
    );
  }

  try {
    new URL(baseUrl);
  } catch {
    throw new Error(
      `Invalid configuration: VITE_POCKETBASE_URL is not a valid URL (received: ${baseUrl}).`
    );
  }

  return baseUrl;
}

export default defineConfig(({ mode }) => {
  resolveRequiredPocketBaseUrl(mode);

  return {
    base: '/msilab-app/',
    plugins: [
      react(),
      VitePWA({
        registerType: 'autoUpdate',
        strategies: 'injectManifest',
        srcDir: 'src/infrastructure/sw',
        filename: 'sw.ts',
        includeAssets: ['icons/icon.svg', 'icons/maskable-icon.svg'],
        manifest: {
          name: 'MSILab App',
          short_name: 'MSILab',
          description: 'Minimal installable PWA shell for the fablab association.',
          theme_color: '#0f172a',
          background_color: '#0b1220',
          display: 'standalone',
          start_url: '/',
          scope: '/',
          icons: [
            {
              src: '/icons/icon.svg',
              sizes: 'any',
              type: 'image/svg+xml',
              purpose: 'any'
            },
            {
              src: '/icons/maskable-icon.svg',
              sizes: 'any',
              type: 'image/svg+xml',
              purpose: 'maskable'
            }
          ]
        },
        injectManifest: {
          globPatterns: ['**/*.{js,css,html,svg,ico,png,webmanifest}']
        }
      })
    ],
    test: {
      environment: 'jsdom',
      globals: true,
      setupFiles: ['./src/test-setup.ts']
    }
  };
});
