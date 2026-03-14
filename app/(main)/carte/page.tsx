'use client'
import { useState, useMemo } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'

const CarteLeaflet = dynamic(() => import('./CarteLeafletFull'), { ssr: false })

// ─── Données mock ────────────────────────────────────────────────────────────
const PRODUCTEURS_DATA = [
  {
    id: 1,
    nom: 'Ferme La Bourgade',
    ville: 'Compton',
    region: "Cantons-de-l'Est",
    km: 12,
    type: 'maraicher',
    certifications: ['bio'],
    note: 4.8,
    produits: ['Légumes racines', 'Courges', 'Herbes fraîches', 'Tomates'],
    lat: 45.237, lng: -71.8257,
    emoji: '🥦',
    desc: 'Famille Verville depuis 1978. Nous cultivons 45 acres de légumes biologiques dans les riches terres compostoniennes.',
    abonnement: 'Pro',
    marches: ['Marché de Sherbrooke'],
  },
  {
    id: 2,
    nom: 'Domaine Pinnacle',
    ville: 'Frelighsburg',
    region: "Cantons-de-l'Est",
    km: 28,
    type: 'fruitier',
    certifications: ['equitable'],
    note: 4.9,
    produits: ['Cidre de glace', 'Pommes', 'Pommeau', 'Vinaigre de cidre'],
    lat: 45.0561, lng: -72.8494,
    emoji: '🍎',
    desc: "Au pied du mont Pinnacle, nos cidres de glace sont parmi les plus primés du Québec.",
    abonnement: 'Premium',
    marches: ['Marché de Bedford'],
  },
  {
    id: 3,
    nom: 'Les Serres Épicuriales',
    ville: 'Sherbrooke',
    region: "Cantons-de-l'Est",
    km: 5,
    type: 'maraicher',
    certifications: ['bio'],
    note: 4.7,
    produits: ['Tomates cerises', 'Concombres', 'Poivrons', 'Laitues'],
    lat: 45.4043, lng: -71.8931,
    emoji: '🏡',
    desc: "Cultures en serre géothermique toute l'année — légumes frais même en plein hiver québécois.",
    abonnement: 'Pro',
    marches: ['Marché de la Gare – Sherbrooke'],
  },
  {
    id: 4,
    nom: 'Fromagerie Rumford',
    ville: 'Waterville',
    region: "Cantons-de-l'Est",
    km: 18,
    type: 'laitier',
    certifications: [],
    note: 4.6,
    produits: ['Fromage cheddar', 'Fromage frais', 'Beurre', 'Crème'],
    lat: 45.268, lng: -71.891,
    emoji: '🐄',
    desc: 'Fromagerie artisanale transmise depuis trois générations dans la vallée de la Saint-François.',
    abonnement: 'Starter',
    marches: ['Marché de Coaticook'],
  },
  {
    id: 5,
    nom: 'Élevage Dumont',
    ville: 'Coaticook',
    region: "Cantons-de-l'Est",
    km: 32,
    type: 'viande',
    certifications: ['equitable'],
    note: 4.5,
    produits: ['Agneau', 'Porc', 'Volaille fermière', 'Œufs'],
    lat: 45.1343, lng: -71.8012,
    emoji: '🥩',
    desc: 'Élevage extensif en plein air sur 200 acres. Nos animaux vivent libres, nourris aux grains locaux.',
    abonnement: 'Pro',
    marches: [],
  },
  {
    id: 6,
    nom: 'Rucher des Appalaches',
    ville: 'Mégantic',
    region: "Cantons-de-l'Est",
    km: 55,
    type: 'mixte',
    certifications: ['bio'],
    note: 4.9,
    produits: ['Miel de trèfle', 'Miel de sarrasin', 'Propolis', 'Cire'],
    lat: 45.5838, lng: -70.8804,
    emoji: '🍯',
    desc: 'Rucher certifié biologique aux abords du Parc national du Mont-Mégantic.',
    abonnement: 'Premium',
    marches: ['Marché de Lac-Mégantic'],
  },
  {
    id: 7,
    nom: 'Verger Champêtre',
    ville: 'Dunham',
    region: "Cantons-de-l'Est",
    km: 40,
    type: 'fruitier',
    certifications: [],
    note: 4.4,
    produits: ['Pommes', 'Poires', 'Prunes', 'Confitures'],
    lat: 45.1357, lng: -72.8083,
    emoji: '🍐',
    desc: 'Verger familial de 60 ans dans la Route des vins. Cueillette libre en saison.',
    abonnement: 'Starter',
    marches: ['Marché de Cowansville', 'Marché de Bromont'],
  },
  {
    id: 8,
    nom: 'Boulangerie du Chemin',
    ville: 'North Hatley',
    region: "Cantons-de-l'Est",
    km: 22,
    type: 'mixte',
    certifications: ['bio'],
    note: 4.8,
    produits: ['Pain au levain', 'Brioche', 'Croissants', 'Focaccia'],
    lat: 45.2662, lng: -71.9696,
    emoji: '🍞',
    desc: 'Boulangerie artisanale au bord du lac Massawippi. Farines biologiques locales uniquement.',
    abonnement: 'Pro',
    marches: ['Marché de Magog'],
  },
  {
    id: 9,
    nom: 'Microbrasserie Orford',
    ville: 'Orford',
    region: "Cantons-de-l'Est",
    km: 15,
    type: 'mixte',
    certifications: [],
    note: 4.7,
    produits: ['Bière blonde', 'Bière rousse', 'IPA', 'Bière de saison'],
    lat: 45.3218, lng: -72.1871,
    emoji: '🍺',
    desc: "Bières artisanales brassées avec l'eau de source du mont Orford.",
    abonnement: 'Premium',
    marches: ['Marché de Magog'],
  },
  {
    id: 10,
    nom: 'Érablière Bellevue',
    ville: 'Stanstead',
    region: "Cantons-de-l'Est",
    km: 48,
    type: 'mixte',
    certifications: [],
    note: 4.6,
    produits: ['Sirop pur', 'Beurre d\'érable', 'Tire sur neige', 'Bonbons'],
    lat: 45.0135, lng: -72.0891,
    emoji: '🍁',
    desc: 'Érablière de 4 500 entailles sur les hauteurs de Stanstead, en bordure des États-Unis.',
    abonnement: 'Starter',
    marches: [],
  },
]

const TYPE_COLORS: Record<string, string> = {
  maraicher: '#2D5A1B',
  laitier: '#2E86AB',
  fruitier: '#C0392B',
  viande: '#8B4513',
  mixte: '#8E44AD',
}

const TYPE_LABELS: Record<string, string> = {
  maraicher: '🥦 Maraîcher',
  laitier: '🐄 Laitier',
  fruitier: '🍎 Fruitier',
  viande: '🥩 Viande',
  mixte: '🌾 Mixte',
}

// ─── Composant principal ─────────────────────────────────────────────────────
export default function CartePage() {
  const [selectionne, setSelectionne] = useState<number | null>(null)
  const [recherche, setRecherche] = useState('')
  const [filtreType, setFiltreType] = useState('tous')
  const [filtreCert, setFiltreCert] = useState('tous')

  const producteursFiltres = useMemo(() => {
    return PRODUCTEURS_DATA.filter(p => {
      const okType = filtreType === 'tous' || p.type === filtreType
      const okCert = filtreCert === 'tous' || p.certifications.includes(filtreCert)
      const q = recherche.toLowerCase().trim()
      const okSearch = !q ||
        p.nom.toLowerCase().includes(q) ||
        p.ville.toLowerCase().includes(q) ||
        p.produits.some(pr => pr.toLowerCase().includes(q))
      return okType && okCert && okSearch
    })
  }, [filtreType, filtreCert, recherche])

  const producteurSelectionne = PRODUCTEURS_DATA.find(p => p.id === selectionne)

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      fontFamily: "'Segoe UI', system-ui, sans-serif",
      background: '#1A3A1F',
      overflow: 'hidden',
    }}>
      {/* ── Navbar ── */}
      <nav style={{
        background: '#1A3A1F',
        borderBottom: '1px solid #2D5A34',
        padding: '0 24px',
        height: 56,
        display: 'flex',
        alignItems: 'center',
        gap: 24,
        flexShrink: 0,
      }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
          <span style={{ fontSize: 22 }}>🌿</span>
          <span style={{ color: '#F5F0E8', fontWeight: 700, fontSize: 16 }}>Le Panier Vert</span>
        </Link>
        <div style={{ flex: 1 }} />
        {[
          { href: '/', label: 'Accueil' },
          { href: '/marche', label: 'Marché' },
          { href: '/carte', label: '🗺 Carte' },
          { href: '/producteurs', label: 'Producteurs' },
        ].map(({ href, label }) => (
          <Link key={href} href={href} style={{
            color: href === '/carte' ? '#7EC68A' : '#D4C9B0',
            textDecoration: 'none',
            fontSize: 14,
            fontWeight: href === '/carte' ? 600 : 400,
          }}>
            {label}
          </Link>
        ))}
        <Link href="/connexion" style={{
          background: '#4A8C55',
          color: 'white',
          padding: '6px 16px',
          borderRadius: 20,
          textDecoration: 'none',
          fontSize: 13,
          fontWeight: 600,
        }}>
          Connexion
        </Link>
      </nav>

      {/* ── Barre filtres ── */}
      <div style={{
        background: '#F5F0E8',
        padding: '8px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        flexWrap: 'wrap',
        borderBottom: '1px solid #D4C9B0',
        flexShrink: 0,
      }}>
        {/* Recherche */}
        <div style={{ position: 'relative', minWidth: 200, flex: 1, maxWidth: 280 }}>
          <span style={{ position: 'absolute', left: 9, top: '50%', transform: 'translateY(-50%)', color: '#8B5E3C', fontSize: 14 }}>🔍</span>
          <input
            type="text"
            placeholder="Ferme, ville, produit…"
            value={recherche}
            onChange={e => setRecherche(e.target.value)}
            style={{
              width: '100%',
              padding: '7px 12px 7px 30px',
              border: '1.5px solid #D4C9B0',
              borderRadius: 8,
              fontSize: 13,
              outline: 'none',
              fontFamily: 'inherit',
              background: 'white',
              color: '#1A3A1F',
              boxSizing: 'border-box',
            }}
          />
        </div>

        {/* Filtres type */}
        <span style={{ fontSize: 11, fontWeight: 700, color: '#2D5A34', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Type :</span>
        {[
          { val: 'tous', label: 'Tous' },
          { val: 'maraicher', label: '🥦 Maraîcher' },
          { val: 'laitier', label: '🐄 Laitier' },
          { val: 'fruitier', label: '🍎 Fruitier' },
          { val: 'viande', label: '🥩 Viande' },
          { val: 'mixte', label: '🌾 Mixte' },
        ].map(({ val, label }) => (
          <button
            key={val}
            onClick={() => setFiltreType(val)}
            style={{
              padding: '4px 11px',
              borderRadius: 16,
              border: `1.5px solid ${filtreType === val ? '#2D5A34' : '#D4C9B0'}`,
              background: filtreType === val ? '#2D5A34' : 'white',
              color: filtreType === val ? 'white' : '#1A3A1F',
              fontSize: 12,
              fontWeight: filtreType === val ? 700 : 400,
              cursor: 'pointer',
              fontFamily: 'inherit',
              whiteSpace: 'nowrap',
            }}
          >
            {label}
          </button>
        ))}

        {/* Filtres cert */}
        <span style={{ fontSize: 11, fontWeight: 700, color: '#2D5A34', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Cert. :</span>
        {[
          { val: 'tous', label: 'Tous' },
          { val: 'bio', label: '🌱 Bio' },
          { val: 'equitable', label: '♻️ Équitable' },
        ].map(({ val, label }) => (
          <button
            key={val}
            onClick={() => setFiltreCert(val)}
            style={{
              padding: '4px 11px',
              borderRadius: 16,
              border: `1.5px solid ${filtreCert === val ? '#2D5A34' : '#D4C9B0'}`,
              background: filtreCert === val ? '#2D5A34' : 'white',
              color: filtreCert === val ? 'white' : '#1A3A1F',
              fontSize: 12,
              fontWeight: filtreCert === val ? 700 : 400,
              cursor: 'pointer',
              fontFamily: 'inherit',
            }}
          >
            {label}
          </button>
        ))}

        {/* Compteur */}
        <div style={{ marginLeft: 'auto', background: '#2D5A34', color: '#F5F0E8', padding: '4px 12px', borderRadius: 14, fontSize: 12, fontStyle: 'italic' }}>
          <strong style={{ color: '#D4882A' }}>{producteursFiltres.length}</strong> résultat{producteursFiltres.length !== 1 ? 's' : ''}
        </div>
      </div>

      {/* ── Corps principal ── */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

        {/* Liste gauche */}
        <div style={{
          width: 280,
          background: '#F5F0E8',
          borderRight: '1px solid #D4C9B0',
          display: 'flex',
          flexDirection: 'column',
          flexShrink: 0,
          overflowY: 'auto',
        }}>
          <div style={{ padding: '10px 14px 6px', fontSize: 11, fontWeight: 700, color: '#2D5A34', textTransform: 'uppercase', letterSpacing: '0.07em' }}>
            Producteurs
          </div>

          {producteursFiltres.map(p => {
            const isSelected = p.id === selectionne
            return (
              <div
                key={p.id}
                onClick={() => setSelectionne(isSelected ? null : p.id)}
                style={{
                  padding: '10px 14px',
                  borderBottom: '1px solid #E8E0CC',
                  cursor: 'pointer',
                  background: isSelected ? '#EAF2E0' : 'transparent',
                  borderLeft: `3px solid ${isSelected ? '#4A8C55' : 'transparent'}`,
                  transition: 'all 0.15s',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 20 }}>{p.emoji}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 600, fontSize: 13, color: '#1A3A1F', lineHeight: 1.2 }}>{p.nom}</div>
                    <div style={{ fontSize: 11, color: '#6B5A3C', marginTop: 2 }}>
                      📍 {p.ville} · {p.km} km · ⭐ {p.note}
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 6 }}>
                  <span style={{
                    display: 'inline-block', padding: '1px 7px', borderRadius: 9,
                    background: '#D8ECC8', color: '#1A3A1F', fontSize: 10, fontWeight: 600,
                  }}>
                    {TYPE_LABELS[p.type] || p.type}
                  </span>
                  {p.certifications.map(c => (
                    <span key={c} style={{
                      display: 'inline-block', padding: '1px 7px', borderRadius: 9,
                      background: '#FFF0C0', color: '#7A5A00', fontSize: 10, fontWeight: 600,
                      border: '1px solid #E8C860',
                    }}>
                      {c === 'bio' ? '🌱 Bio' : '♻️ Équit.'}
                    </span>
                  ))}
                </div>

                {/* Produits */}
                {isSelected && (
                  <div style={{ marginTop: 8 }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: '#2D5A34', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>
                      Produits
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                      {p.produits.map(pr => (
                        <span key={pr} style={{
                          padding: '1px 7px', borderRadius: 9,
                          background: 'white', border: '1px solid #D4C9B0',
                          fontSize: 10, color: '#1A3A1F',
                        }}>
                          {pr}
                        </span>
                      ))}
                    </div>
                    <div style={{ marginTop: 8, fontSize: 11, color: '#4A5A3A', fontStyle: 'italic', lineHeight: 1.5 }}>
                      {p.desc}
                    </div>
                    <div style={{ marginTop: 8, display: 'flex', gap: 6 }}>
                      <button style={{
                        flex: 1, padding: '6px 8px', background: '#4A8C55', color: 'white',
                        border: 'none', borderRadius: 6, fontSize: 11, fontWeight: 700,
                        cursor: 'pointer', fontFamily: 'inherit',
                      }}>
                        🛒 Commander
                      </button>
                      <button style={{
                        flex: 1, padding: '6px 8px', background: 'white', color: '#1A3A1F',
                        border: '1.5px solid #4A8C55', borderRadius: 6, fontSize: 11, fontWeight: 600,
                        cursor: 'pointer', fontFamily: 'inherit',
                      }}>
                        📖 Voir fiche
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )
          })}

          {producteursFiltres.length === 0 && (
            <div style={{ padding: 20, textAlign: 'center', color: '#8B7355', fontSize: 13, fontStyle: 'italic' }}>
              Aucun producteur trouvé
            </div>
          )}
        </div>

        {/* Carte Leaflet */}
        <div style={{ flex: 1, height: '100%' }}>
          <CarteLeaflet
            producteurs={producteursFiltres}
            selectionne={selectionne}
            onSelect={id => setSelectionne(id === selectionne ? null : id)}
            typeColors={TYPE_COLORS}
          />
        </div>
      </div>
    </div>
  )
}
