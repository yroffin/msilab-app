import { Link } from 'react-router-dom';

export default function PublicPage() {
  return (
    <main className="page-shell">
      <section className="hero card">
        <p className="eyebrow">MSILab App</p>
        <span className="zone-badge zone-badge--public">Zone publique · Offline</span>
        <h1>Le fablab de l&apos;asso</h1>
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
          <span className="zone-badge zone-badge--public">Public · Offline</span>
          <h2>Disponible hors-ligne</h2>
          <p>
            Contenu mis en cache par le Service Worker, consultable sans
            connexion après le premier chargement.
          </p>
        </article>

        <article className="card">
          <span className="zone-badge zone-badge--private">Membres · Privé</span>
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
