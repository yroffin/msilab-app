export default function MembersPage() {
  return (
    <main className="page-shell">
      <section className="hero card">
        <span className="zone-badge zone-badge--private">Membres · Privé</span>
        <h1>Espace membres</h1>
        <p className="lede">
          Accès réservé aux membres authentifiés. Le contenu de cette zone
          n&apos;est jamais mis en cache par le Service Worker.
        </p>
      </section>
    </main>
  );
}
