import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { registerSW } from 'virtual:pwa-register';
import './style.css';
import App from './App';

const container = document.getElementById('app');
if (container === null) throw new Error('App root element not found');

createRoot(container).render(
  <StrictMode>
    <App />
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
