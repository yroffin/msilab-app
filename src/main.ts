import './style.css';
import { registerSW } from 'virtual:pwa-register';

const app = document.querySelector<HTMLDivElement>('#app');

if (app === null) {
  throw new Error('App root element not found');
}

app.innerHTML = `
  <main class="page-shell">
    <section class="hero card">
      <p class="eyebrow">Installable PWA baseline</p>
      <h1>MSILab App</h1>
      <p class="lede">
        A compact public shell designed to install cleanly, relaunch offline,
        and keep private data outside the shared cache.
      </p>
      <div class="hero-actions">
        <a class="button button-primary" href="#public">Public area</a>
        <a class="button button-secondary" href="#members">Members area</a>
      </div>
    </section>

    <section class="grid">
      <article class="card" id="public">
        <p class="eyebrow">Public</p>
        <h2>Offline-friendly shell</h2>
        <p>
          Public pages, metadata, and assets are cached for repeat visits and
          installed launches.
        </p>
      </article>

      <article class="card" id="members">
        <p class="eyebrow">Members</p>
        <h2>Private traffic stays private</h2>
        <p>
          Authenticated requests and real-time member traffic are excluded from
          the shared service worker cache.
        </p>
      </article>
    </section>

    <footer class="status card">
      <div>
        <p class="eyebrow">PWA status</p>
        <p class="status-line">Installable shell ready</p>
      </div>
      <p class="status-note" id="sw-status">Service worker will activate after build.</p>
    </footer>
  </main>
`;

const updateSwStatus = registerSW({
  immediate: true,
  onNeedRefresh() {
    const status = document.querySelector<HTMLElement>('#sw-status');
    if (status !== null) {
      status.textContent = 'Update available. Refresh to load the latest shell.';
    }
  },
  onOfflineReady() {
    const status = document.querySelector<HTMLElement>('#sw-status');
    if (status !== null) {
      status.textContent = 'Offline-ready assets cached for the installed app.';
    }
  }
});

void updateSwStatus;
