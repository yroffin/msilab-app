import { Link } from 'react-router-dom';

export default function PublicPage() {
  return (
    <main className="page-shell">
      <section className="hero card">
        <p className="eyebrow">Zone publique</p>
        <h1>MSILab App</h1>
        <p className="lede">
          Pages publiques, actualités et présentation de l&apos;association.
          Disponibles hors-ligne après la première visite.
        </p>
        <div className="hero-actions">
          <Link className="button button-secondary" to="/members">
            Espace membres
          </Link>
        </div>
      </section>

      <section className="grid">
        <article className="card" id="public">
          <p className="eyebrow">Public · Offline</p>
          <h2>Disponible hors-ligne</h2>
          <p>
            Le contenu public est mis en cache par le Service Worker et
            consultable sans connexion après le premier chargement.
          </p>
        </article>

        <article className="card">
          <p className="eyebrow">Membres</p>
          <h2>Accès sécurisé</h2>
          <p>
            Les pages et API membres ne sont jamais mises en cache partagé.
            Une session valide est requise.
          </p>
        </article>
      </section>
    </main>
  );
}
