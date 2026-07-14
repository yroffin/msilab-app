import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { registerSW } from 'virtual:pwa-register';
import { listPublicNews } from './application/use-cases/list-public-news';
import { PocketBaseNewsRepository } from './infrastructure/pocketbase/news-repository';
import App from './presentation/App';

import { PublicNewsProvider } from './presentation/providers/public-news-provider';
import { ChakraProvider, createSystem, defaultConfig } from "@chakra-ui/react";

const container = document.getElementById('app');
if (container === null) throw new Error('App root element not found');

const newsRepository = new PocketBaseNewsRepository();

const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      colors: {
        brand: {
          50: { value: "#f5f5f5" },
          100: { value: "#e0e0e0" },
          200: { value: "#c2c2c2" },
          300: { value: "#a3a3a3" },
          400: { value: "#858585" },
          500: { value: "#666666" },
          600: { value: "#4d4d4d" },
          700: { value: "#333333" },
          800: { value: "#1a1a1a" },
          900: { value: "#000000" },
        },
      },
    },
  },
});

createRoot(container).render(
  <StrictMode>
    <ChakraProvider value={system}>
      <PublicNewsProvider
        listPublicNews={() => listPublicNews(newsRepository)}
      >
        <App />
      </PublicNewsProvider>
    </ChakraProvider>
  </StrictMode>
);

registerSW({
  immediate: true,
  onNeedRefresh() {
    // TODO: show in-app refresh prompt once UI is wired up
    console.info('[SW] Update available');
  },
  onOfflineReady() {
    console.info('[SW] App ready to work offline');
  }
});
