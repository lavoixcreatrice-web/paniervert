export default function Footer() {
  return (
    <footer style={{ background: '#1a3a15', padding: '48px 5% 28px', fontFamily: 'system-ui' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 40, marginBottom: 40 }}>

        {/* Logo */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <span style={{ fontSize: 26 }}>🌱</span>
            <span style={{ fontFamily: 'Georgia, serif', fontSize: 20, fontWeight: 700, color: '#f5e6c8' }}>Panier Vert</span>
          </div>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, margin: 0 }}>
            Le marché alimentaire local de l'Estrie. Connecter producteurs et consommateurs depuis 2024.
          </p>
        </div>

        {/* Acheteurs */}
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#4ade80', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 14 }}>Acheteurs</div>
          {[['/', 'Accueil'], ['/carte', 'Carte interactive'], ['/producteurs', 'Nos producteurs'], ['/panier', 'Mon panier']].map(([href, label]) => (
            <a key={href} href={href} style={{ display: 'block', color: 'rgba(255,255,255,0.5)', fontSize: 14, textDecoration: 'none', marginBottom: 8 }}
              onMouseEnter={e => (e.currentTarget.style.color = '#f5e6c8')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}>{label}</a>
          ))}
        </div>

        {/* Vendeurs */}
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#4ade80', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 14 }}>Vendeurs</div>
          {[['/inscription', 'Créer ma boutique'], ['/dashboard', 'Mon tableau de bord'], ['/inscription', 'Plans & tarifs']].map(([href, label]) => (
            <a key={label} href={href} style={{ display: 'block', color: 'rgba(255,255,255,0.5)', fontSize: 14, textDecoration: 'none', marginBottom: 8 }}
              onMouseEnter={e => (e.currentTarget.style.color = '#f5e6c8')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}>{label}</a>
          ))}
        </div>

        {/* Contact */}
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#4ade80', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 14 }}>Contact</div>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', margin: '0 0 8px' }}>📍 Estrie, Québec</p>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', margin: '0 0 8px' }}>📧 info@paniervert.ca</p>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', margin: 0 }}>📱 819-555-0100</p>
        </div>
      </div>

      <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)' }}>© 2026 Panier Vert · Tous droits réservés</span>
        <div style={{ display: 'flex', gap: 20 }}>
          {['Confidentialité', 'Conditions', 'Accessibilité'].map(l => (
            <a key={l} href="#" style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)', textDecoration: 'none' }}>{l}</a>
          ))}
        </div>
      </div>
    </footer>
  )
}
