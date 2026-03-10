'use client'
import { useState, useMemo } from 'react'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import Link from 'next/link'

const categories = [
  { id: 'tous', label: 'Tous', emoji: '🌿' },
  { id: 'legumes', label: 'Légumes & Fruits', emoji: '🥦' },
  { id: 'laitiers', label: 'Produits laitiers', emoji: '🧀' },
  { id: 'viande', label: 'Viande & Œufs', emoji: '🥚' },
  { id: 'boulangerie', label: 'Boulangerie', emoji: '🍞' },
  { id: 'miel', label: 'Miel & Érable', emoji: '🍯' },
  { id: 'transformes', label: 'Produits transformés', emoji: '🫙' },
  { id: 'boissons', label: 'Boissons', emoji: '🍺' },
  { id: 'naturels', label: 'Produits naturels', emoji: '🌸' },
]

const produits = [
  { id: 1, nom: 'Carottes bio', prix: 3.50, prixPromo: 1.75, surplus: true, categorie: 'legumes', producteur: 'Ferme Tremblay', ville: 'Magog', note: 4.9, emoji: '🥕', dispo: 48, unite: 'botte', image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=300&q=80', bio: true },
  { id: 2, nom: 'Fromage Compton', prix: 14.00, surplus: false, categorie: 'laitiers', producteur: 'Fromagerie Compton', ville: 'Compton', note: 4.8, emoji: '🧀', dispo: 22, unite: '200g', image: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=300&q=80', bio: false },
  { id: 3, nom: 'Sirop d\'érable pur', prix: 18.00, surplus: false, categorie: 'miel', producteur: 'Érablière Roy', ville: 'Austin', note: 5.0, emoji: '🍁', dispo: 35, unite: '500ml', image: 'https://images.unsplash.com/photo-1589375669802-9e9ff42b78bf?w=300&q=80', bio: false },
  { id: 4, nom: 'Pommes Cortland', prix: 4.00, prixPromo: 2.00, surplus: true, categorie: 'legumes', producteur: 'Verger Bolduc', ville: 'Orford', note: 4.7, emoji: '🍎', dispo: 120, unite: 'kg', image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=300&q=80', bio: false },
  { id: 5, nom: 'Miel sauvage', prix: 12.00, prixPromo: 8.00, surplus: true, categorie: 'miel', producteur: 'Rucher des Cantons', ville: 'Bromont', note: 4.9, emoji: '🍯', dispo: 18, unite: '250g', image: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=300&q=80', bio: true },
  { id: 6, nom: 'Pain au levain', prix: 7.50, surplus: false, categorie: 'boulangerie', producteur: 'Boulangerie Altitude', ville: 'Magog', note: 5.0, emoji: '🍞', dispo: 12, unite: 'miche', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&q=80', bio: false },
  { id: 7, nom: 'Laitue Boston', prix: 2.50, prixPromo: 1.25, surplus: true, categorie: 'legumes', producteur: 'Jardins Fleuris', ville: 'Sherbrooke', note: 4.6, emoji: '🥬', dispo: 60, unite: 'tête', image: 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=300&q=80', bio: true },
  { id: 8, nom: 'Bière artisanale IPA', prix: 5.50, surplus: false, categorie: 'boissons', producteur: 'Microbrasserie Orford', ville: 'Orford', note: 4.7, emoji: '🍺', dispo: 72, unite: '473ml', image: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=300&q=80', bio: false },
  { id: 9, nom: 'Œufs fermiers', prix: 6.00, surplus: false, categorie: 'viande', producteur: 'Ferme Biopastorale', ville: 'Waterloo', note: 4.8, emoji: '🥚', dispo: 30, unite: 'douzaine', image: 'https://images.unsplash.com/photo-1518569656558-1f25e69d2fd4?w=300&q=80', bio: true },
  { id: 10, nom: 'Confiture de fraises', prix: 9.00, surplus: false, categorie: 'transformes', producteur: 'Cueillette Magog', ville: 'Magog', note: 4.8, emoji: '🍓', dispo: 25, unite: '250ml', image: 'https://images.unsplash.com/photo-1597528380862-f9d2ab3cfa1f?w=300&q=80', bio: true },
  { id: 11, nom: 'Lavande séchée', prix: 8.50, surplus: false, categorie: 'naturels', producteur: 'Ferme Lavande', ville: 'Dunham', note: 4.9, emoji: '💜', dispo: 40, unite: 'sachet', image: 'https://images.unsplash.com/photo-1611909023032-2d6b3134ecba?w=300&q=80', bio: true },
  { id: 12, nom: 'Courges butternut', prix: 3.00, prixPromo: 1.50, surplus: true, categorie: 'legumes', producteur: 'Potager Compton', ville: 'Compton', note: 4.6, emoji: '🎃', dispo: 80, unite: 'unité', image: 'https://images.unsplash.com/photo-1570586437263-ab629fccc818?w=300&q=80', bio: false },
  { id: 13, nom: 'Tomates cerises', prix: 5.00, surplus: false, categorie: 'legumes', producteur: 'Jardins Fleuris', ville: 'Sherbrooke', note: 4.6, emoji: '🍅', dispo: 45, unite: '500g', image: 'https://images.unsplash.com/photo-1546470427-227c5b2e1bc8?w=300&q=80', bio: true },
  { id: 14, nom: 'Beurre fermier', prix: 8.00, surplus: false, categorie: 'laitiers', producteur: 'Ferme Biopastorale', ville: 'Waterloo', note: 4.8, emoji: '🧈', dispo: 15, unite: '250g', image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=300&q=80', bio: true },
  { id: 15, nom: 'Croissants au beurre', prix: 4.50, surplus: false, categorie: 'boulangerie', producteur: 'Boulangerie Altitude', ville: 'Magog', note: 5.0, emoji: '🥐', dispo: 24, unite: '2 pièces', image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=300&q=80', bio: false },
  { id: 16, nom: 'Tisane de lavande', prix: 7.00, surplus: false, categorie: 'naturels', producteur: 'Ferme Lavande', ville: 'Dunham', note: 4.9, emoji: '🌸', dispo: 30, unite: '20 sachets', image: 'https://images.unsplash.com/photo-1563822249366-3efb23b8e0c9?w=300&q=80', bio: true },
]

const tris = [
  { id: 'populaire', label: 'Populaire' },
  { id: 'prix-asc', label: 'Prix ↑' },
  { id: 'prix-desc', label: 'Prix ↓' },
  { id: 'surplus', label: 'Surplus d\'abord' },
  { id: 'bio', label: 'Bio' },
]

export default function MarchePage() {
  const [categorie, setCategorie] = useState('tous')
  const [recherche, setRecherche] = useState('')
  const [tri, setTri] = useState('populaire')
  const [panier, setPanier] = useState<number[]>([])
  const [vue, setVue] = useState<'grille' | 'liste'>('grille')
  const [notification, setNotification] = useState<string | null>(null)

  const produitsFiltres = useMemo(() => {
    let liste = produits.filter(p => {
      const matchCat = categorie === 'tous' || p.categorie === categorie
      const matchRecherche = p.nom.toLowerCase().includes(recherche.toLowerCase()) || 
                             p.producteur.toLowerCase().includes(recherche.toLowerCase())
      return matchCat && matchRecherche
    })

    if (tri === 'prix-asc') liste = [...liste].sort((a, b) => (a.prixPromo || a.prix) - (b.prixPromo || b.prix))
    if (tri === 'prix-desc') liste = [...liste].sort((a, b) => (b.prixPromo || b.prix) - (a.prixPromo || a.prix))
    if (tri === 'surplus') liste = [...liste].sort((a, b) => (b.surplus ? 1 : 0) - (a.surplus ? 1 : 0))
    if (tri === 'bio') liste = liste.filter(p => p.bio)

    return liste
  }, [categorie, recherche, tri])

  const ajouterAuPanier = (produit: typeof produits[0]) => {
    setPanier(prev => [...prev, produit.id])
    setNotification(`${produit.emoji} ${produit.nom} ajouté au panier !`)
    setTimeout(() => setNotification(null), 2500)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f5f0e8', fontFamily: 'Georgia, serif' }}>
      <Nav page="marche" />

      {/* Notification */}
      {notification && (
        <div style={{
          position: 'fixed', top: 80, right: 20, zIndex: 9999,
          background: '#1a3a15', color: '#f5e6c8',
          padding: '12px 20px', borderRadius: 12,
          boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
          animation: 'slideIn 0.3s ease',
          fontFamily: 'system-ui', fontSize: 14, fontWeight: 600
        }}>
          {notification}
        </div>
      )}

      {/* Hero */}
      <div style={{ background: '#1a3a15', padding: '48px 24px 32px', color: '#f5e6c8' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <p style={{ fontSize: 13, letterSpacing: 3, opacity: 0.6, marginBottom: 8, fontFamily: 'system-ui' }}>MARCHÉ LOCAL</p>
          <h1 style={{ fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 700, marginBottom: 8 }}>
            Produits de l'Estrie 🌿
          </h1>
          <p style={{ opacity: 0.75, fontSize: 16, marginBottom: 24, fontFamily: 'system-ui' }}>
            {produits.length} produits · {produits.filter(p => p.surplus).length} surplus du jour · Livraison 3×/semaine
          </p>

          {/* Barre de recherche */}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <input
              type="text"
              placeholder="🔍 Rechercher un produit ou producteur..."
              value={recherche}
              onChange={e => setRecherche(e.target.value)}
              style={{
                flex: 1, minWidth: 200, padding: '12px 16px',
                borderRadius: 10, border: '2px solid rgba(245,230,200,0.3)',
                background: 'rgba(255,255,255,0.1)', color: '#f5e6c8',
                fontSize: 15, outline: 'none', fontFamily: 'system-ui'
              }}
            />
            <select
              value={tri}
              onChange={e => setTri(e.target.value)}
              style={{
                padding: '12px 16px', borderRadius: 10,
                border: '2px solid rgba(245,230,200,0.3)',
                background: 'rgba(255,255,255,0.1)', color: '#f5e6c8',
                fontSize: 14, fontFamily: 'system-ui', cursor: 'pointer'
              }}
            >
              {tris.map(t => <option key={t.id} value={t.id} style={{ color: '#1a1a1a' }}>{t.label}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Catégories */}
      <div style={{ background: '#f5f0e8', borderBottom: '2px solid #e8e0d0', overflowX: 'auto' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', display: 'flex', gap: 4 }}>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setCategorie(cat.id)}
              style={{
                padding: '14px 16px', border: 'none', cursor: 'pointer',
                background: 'transparent', whiteSpace: 'nowrap',
                fontFamily: 'system-ui', fontSize: 13, fontWeight: categorie === cat.id ? 700 : 400,
                color: categorie === cat.id ? '#1a3a15' : '#666',
                borderBottom: categorie === cat.id ? '3px solid #1a3a15' : '3px solid transparent',
                transition: 'all 0.2s'
              }}
            >
              {cat.emoji} {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Contenu */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}>
        {/* Stats + vue */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
          <p style={{ fontFamily: 'system-ui', color: '#666', fontSize: 14 }}>
            <strong style={{ color: '#1a3a15' }}>{produitsFiltres.length}</strong> produits trouvés
          </p>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => setVue('grille')} style={{
              padding: '8px 12px', borderRadius: 8, border: '2px solid #1a3a15',
              background: vue === 'grille' ? '#1a3a15' : 'transparent',
              color: vue === 'grille' ? 'white' : '#1a3a15',
              cursor: 'pointer', fontSize: 16
            }}>⊞</button>
            <button onClick={() => setVue('liste')} style={{
              padding: '8px 12px', borderRadius: 8, border: '2px solid #1a3a15',
              background: vue === 'liste' ? '#1a3a15' : 'transparent',
              color: vue === 'liste' ? 'white' : '#1a3a15',
              cursor: 'pointer', fontSize: 16
            }}>☰</button>
          </div>
        </div>

        {/* Grille de produits */}
        {vue === 'grille' ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            gap: 20
          }}>
            {produitsFiltres.map(p => (
              <div key={p.id} style={{
                background: 'white', borderRadius: 16,
                overflow: 'hidden',
                boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                transition: 'transform 0.2s, box-shadow 0.2s',
                cursor: 'pointer'
              }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)'
                  ;(e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 24px rgba(0,0,0,0.15)'
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'
                  ;(e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 12px rgba(0,0,0,0.08)'
                }}
              >
                {/* Image */}
                <div style={{ position: 'relative', height: 160, overflow: 'hidden' }}>
                  <img
                    src={p.image}
                    alt={p.nom}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{ position: 'absolute', top: 10, left: 10, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {p.surplus && (
                      <span style={{
                        background: '#dc2626', color: 'white',
                        padding: '3px 8px', borderRadius: 20, fontSize: 11, fontWeight: 700,
                        fontFamily: 'system-ui'
                      }}>SURPLUS</span>
                    )}
                    {p.bio && (
                      <span style={{
                        background: '#166534', color: 'white',
                        padding: '3px 8px', borderRadius: 20, fontSize: 11, fontWeight: 700,
                        fontFamily: 'system-ui'
                      }}>🌿 BIO</span>
                    )}
                  </div>
                  <div style={{
                    position: 'absolute', bottom: 10, right: 10,
                    background: 'rgba(0,0,0,0.5)', color: 'white',
                    padding: '2px 8px', borderRadius: 20, fontSize: 11,
                    fontFamily: 'system-ui'
                  }}>
                    {p.dispo} restants
                  </div>
                </div>

                {/* Infos */}
                <div style={{ padding: '14px 16px' }}>
                  <p style={{ fontSize: 11, color: '#888', marginBottom: 4, fontFamily: 'system-ui' }}>
                    {p.producteur} · {p.ville}
                  </p>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1a1a1a', marginBottom: 8 }}>
                    {p.nom}
                  </h3>

                  {/* Prix */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                    {p.prixPromo ? (
                      <>
                        <span style={{ fontSize: 20, fontWeight: 700, color: '#dc2626', fontFamily: 'system-ui' }}>
                          {p.prixPromo.toFixed(2)}$
                        </span>
                        <span style={{ fontSize: 14, color: '#999', textDecoration: 'line-through', fontFamily: 'system-ui' }}>
                          {p.prix.toFixed(2)}$
                        </span>
                        <span style={{ fontSize: 11, color: '#dc2626', fontWeight: 700, fontFamily: 'system-ui' }}>
                          -{Math.round((1 - p.prixPromo / p.prix) * 100)}%
                        </span>
                      </>
                    ) : (
                      <span style={{ fontSize: 20, fontWeight: 700, color: '#1a3a15', fontFamily: 'system-ui' }}>
                        {p.prix.toFixed(2)}$
                      </span>
                    )}
                    <span style={{ fontSize: 12, color: '#888', fontFamily: 'system-ui' }}>/ {p.unite}</span>
                  </div>

                  {/* Note + bouton */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 13, color: '#888', fontFamily: 'system-ui' }}>⭐ {p.note}</span>
                    <button
                      onClick={() => ajouterAuPanier(p)}
                      style={{
                        background: panier.includes(p.id) ? '#166534' : '#1a3a15',
                        color: '#f5e6c8', border: 'none',
                        padding: '8px 14px', borderRadius: 8, cursor: 'pointer',
                        fontSize: 13, fontWeight: 600, fontFamily: 'system-ui',
                        transition: 'all 0.2s'
                      }}
                    >
                      {panier.includes(p.id) ? '✓ Ajouté' : '🧺 Ajouter'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Vue liste */
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {produitsFiltres.map(p => (
              <div key={p.id} style={{
                background: 'white', borderRadius: 12,
                padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 16,
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
              }}>
                <img src={p.image} alt={p.nom} style={{ width: 70, height: 70, borderRadius: 10, objectFit: 'cover', flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', gap: 6, marginBottom: 4 }}>
                    {p.surplus && <span style={{ background: '#dc2626', color: 'white', padding: '2px 6px', borderRadius: 10, fontSize: 10, fontFamily: 'system-ui', fontWeight: 700 }}>SURPLUS</span>}
                    {p.bio && <span style={{ background: '#166534', color: 'white', padding: '2px 6px', borderRadius: 10, fontSize: 10, fontFamily: 'system-ui', fontWeight: 700 }}>🌿 BIO</span>}
                  </div>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1a1a1a', marginBottom: 2 }}>{p.nom}</h3>
                  <p style={{ fontSize: 12, color: '#888', fontFamily: 'system-ui' }}>{p.producteur} · {p.ville} · ⭐ {p.note}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontFamily: 'system-ui', fontWeight: 700, fontSize: 18, color: p.prixPromo ? '#dc2626' : '#1a3a15' }}>
                    {(p.prixPromo || p.prix).toFixed(2)}$
                  </div>
                  <div style={{ fontSize: 12, color: '#888', fontFamily: 'system-ui' }}>/ {p.unite}</div>
                </div>
                <button
                  onClick={() => ajouterAuPanier(p)}
                  style={{
                    background: panier.includes(p.id) ? '#166534' : '#1a3a15',
                    color: '#f5e6c8', border: 'none',
                    padding: '10px 16px', borderRadius: 8, cursor: 'pointer',
                    fontSize: 13, fontWeight: 600, fontFamily: 'system-ui', flexShrink: 0
                  }}
                >
                  {panier.includes(p.id) ? '✓' : '🧺'}
                </button>
              </div>
            ))}
          </div>
        )}

        {produitsFiltres.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: '#888', fontFamily: 'system-ui' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🌿</div>
            <p style={{ fontSize: 18 }}>Aucun produit trouvé</p>
            <button onClick={() => { setCategorie('tous'); setRecherche('') }} style={{
              marginTop: 16, background: '#1a3a15', color: '#f5e6c8',
              border: 'none', padding: '10px 20px', borderRadius: 8, cursor: 'pointer', fontFamily: 'system-ui'
            }}>
              Voir tous les produits
            </button>
          </div>
        )}
      </div>

      {/* Bouton panier flottant */}
      {panier.length > 0 && (
        <Link href="/panier" style={{
          position: 'fixed', bottom: 24, right: 24, zIndex: 1000,
          background: '#1a3a15', color: '#f5e6c8',
          padding: '16px 24px', borderRadius: 50,
          boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
          textDecoration: 'none', fontFamily: 'system-ui',
          fontWeight: 700, fontSize: 15, display: 'flex', alignItems: 'center', gap: 10
        }}>
          🧺 Mon panier
          <span style={{
            background: '#f5e6c8', color: '#1a3a15',
            width: 24, height: 24, borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 12, fontWeight: 800
          }}>{panier.length}</span>
        </Link>
      )}

      <style>{`
        @keyframes slideIn {
          from { transform: translateX(100px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        input::placeholder { color: rgba(245,230,200,0.5); }
      `}</style>

      <Footer />
    </div>
  )
}
