import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { registerSW } from 'virtual:pwa-register';
import { listPublicNews } from './application/use-cases/list-public-news';
import { PocketBaseNewsRepository } from './infrastructure/pocketbase/news-repository';
import './style.css';
import App from './presentation/App';
import { PublicNewsProvider } from './presentation/providers/public-news-provider';

const container = document.getElementById('app');
if (container === null) throw new Error('App root element not found');

const newsRepository = new PocketBaseNewsRepository();

createRoot(container).render(
  <StrictMode>
    <PublicNewsProvider
      listPublicNews={() => listPublicNews(newsRepository)}
    >
      <App />
    </PublicNewsProvider>
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
