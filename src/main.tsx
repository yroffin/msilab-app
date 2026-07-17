import "./index.css";

import "@fontsource/comfortaa/400.css";
import "@fontsource/comfortaa/500.css";
import "@fontsource/comfortaa/700.css";

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { registerSW } from 'virtual:pwa-register';
import { listPublicNews } from './application/use-cases/list-public-news';
import App from './presentation/App';

import { PublicNewsProvider } from './presentation/providers/public-news-provider';
import { ChakraProvider, createSystem, defaultConfig } from "@chakra-ui/react";

import { ThemeProvider } from "next-themes";
import { PocketBaseContentsRepository } from "./infrastructure/pocketbase/contents-repository";
import { PublicContentsProvider } from "./presentation/providers/public-contents-provider";
import { listPublicContents } from "./application/use-cases/list-public-contents";
import { AuthProvider } from "./infrastructure/session/Authcontext";
import { SettingsProvider } from "./presentation/providers/SettingsProvider";

const container = document.getElementById('app');
if (container === null) throw new Error('App root element not found');

const contentsRepository = new PocketBaseContentsRepository();

const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      fonts: {
        heading: { value: "comfortaa, sans-serif" },
        body: { value: "comfortaa, sans-serif" },
      }
    },
    semanticTokens: {
      colors: {
        "fg.default": {
          value: { base: "{colors.black}", _dark: "{colors.white}" },
        },
        "bg.default": {
          value: { base: "{colors.white}", _dark: "{colors.black}" },
        },
      },
    },
  }
});

export function ColorModeProvider(props: React.ComponentProps<typeof ThemeProvider>) {
  return (
    <ThemeProvider attribute="class" disableTransitionOnChange {...props} />
  );
}

createRoot(container).render(
  <StrictMode>
    <ChakraProvider value={system}>
      <ColorModeProvider>
        <PublicNewsProvider
          listPublicNews={() => listPublicNews(contentsRepository)}
        >
          <PublicContentsProvider
            listPublicContents={() => listPublicContents(contentsRepository)}
          >
            <AuthProvider>
              <SettingsProvider>
                <App />
              </SettingsProvider>
            </AuthProvider>
          </PublicContentsProvider>
        </PublicNewsProvider>
      </ColorModeProvider>
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
