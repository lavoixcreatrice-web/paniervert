'use client'
import { useState } from 'react'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import Link from 'next/link'

const points = [
  {
    id: 1, nom: 'Café Rioux', type: 'Café', ville: 'Magog', adresse: '123 rue Principale, Magog',
    horaire: 'Lun-Ven 7h-18h · Sam 8h-17h', emoji: '☕', note: 4.9, avis: 42,
    lat: 45.27, lng: -72.15, dispo: true,
    jours: ['Mardi', 'Vendredi'],
    description: 'Récupérez votre panier en savourant un café artisanal. Stationnement gratuit.',
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&q=80',
    tags: ['Café', 'WiFi', 'Stationnement']
  },
  {
    id: 2, nom: 'Boulangerie Altitude', type: 'Boulangerie', ville: 'Magog', adresse: '45 rue du Lac, Magog',
    horaire: 'Mar-Sam 6h30-17h', emoji: '🍞', note: 5.0, avis: 67,
    lat: 45.28, lng: -72.14, dispo: true,
    jours: ['Lundi', 'Mercredi', 'Vendredi'],
    description: 'Combinez votre collecte avec l\'achat du pain du jour. Odeur de pain frais garantie!',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&q=80',
    tags: ['Boulangerie', 'Pain frais', 'Accessible']
  },
  {
    id: 3, nom: 'Épicerie La Ferm\'ette', type: 'Épicerie', ville: 'Compton', adresse: '78 chemin de la Rivière, Compton',
    horaire: 'Lun-Sam 8h-19h · Dim 9h-17h', emoji: '🛒', note: 4.8, avis: 35,
    lat: 45.22, lng: -71.82, dispo: true,
    jours: ['Mercredi', 'Samedi'],
    description: 'Épicerie locale spécialisée en produits régionaux. Idéal pour faire vos emplettes en même temps.',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&q=80',
    tags: ['Épicerie', 'Produits locaux', 'Ouvert dimanche']
  },
  {
    id: 4, nom: 'Microbrasserie Orford', type: 'Brasserie', ville: 'Orford', adresse: '12 montée des Sommets, Orford',
    horaire: 'Mer-Dim 11h-21h', emoji: '🍺', note: 4.7, avis: 88,
    lat: 45.32, lng: -72.19, dispo: true,
    jours: ['Jeudi', 'Dimanche'],
    description: 'Récupérez votre panier et profitez d\'une bière artisanale sur la terrasse avec vue sur le mont Orford.',
    image: 'https://images.unsplash.com/photo-1566633806827-5e3e72b8b8e1?w=400&q=80',
    tags: ['Brasserie', 'Terrasse', 'Vue montagne']
  },
  {
    id: 5, nom: 'Fromagerie Compton', type: 'Fromagerie', ville: 'Compton', adresse: '99 route 147, Compton',
    horaire: 'Lun-Sam 9h-17h', emoji: '🧀', note: 4.8, avis: 54,
    lat: 45.23, lng: -71.83, dispo: true,
    jours: ['Mardi', 'Samedi'],
    description: 'Collecte directement à la fromagerie. Possibilité de visiter la cave d\'affinage.',
    image: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400&q=80',
    tags: ['Fromagerie', 'Visite', 'Producteur direct']
  },
  {
    id: 6, nom: 'Centre Communautaire Waterloo', type: 'Centre communautaire', ville: 'Waterloo', adresse: '55 rue de la Mairie, Waterloo',
    horaire: 'Mar & Ven 14h-18h', emoji: '🏢', note: 4.6, avis: 23,
    lat: 45.35, lng: -72.52, dispo: false,
    jours: ['Mardi', 'Vendredi'],
    description: 'Point de collecte communautaire desservant tout le secteur de Waterloo. Grand stationnement.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=80',
    tags: ['Communautaire', 'Grand stationnement', 'Accessible PMR']
  },
  {
    id: 7, nom: 'Rucher des Cantons', type: 'Ferme', ville: 'Bromont', adresse: '234 rang des Érables, Bromont',
    horaire: 'Sam-Dim 9h-16h', emoji: '🍯', note: 4.9, avis: 31,
    lat: 45.31, lng: -72.65, dispo: true,
    jours: ['Samedi'],
    description: 'Collecte à la ferme apicole. Rencontrez les abeilles et achetez le miel directement!',
    image: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=400&q=80',
    tags: ['Ferme', 'Expérience', 'Famille']
  },
  {
    id: 8, nom: 'Marché Public de Sherbrooke', type: 'Marché public', ville: 'Sherbrooke', adresse: 'Place du marché, Sherbrooke',
    horaire: 'Mer & Sam 7h-13h', emoji: '🏪', note: 4.8, avis: 112,
    lat: 45.40, lng: -71.89, dispo: true,
    jours: ['Mercredi', 'Samedi'],
    description: 'Le plus grand point de collecte. Combinez avec votre visite au marché public.',
    image: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=400&q=80',
    tags: ['Marché public', 'Grand choix', 'Ambiance festive']
  },
]

const villes = ['Toutes', 'Magog', 'Compton', 'Orford', 'Waterloo', 'Bromont', 'Sherbrooke']
const types = ['Tous', 'Café', 'Boulangerie', 'Épicerie', 'Brasserie', 'Fromagerie', 'Ferme', 'Marché public', 'Centre communautaire']

export default function PointsCollectePage() {
  const [ville, setVille] = useState('Toutes')
  const [type, setType] = useState('Tous')
  const [selectionne, setSelectionne] = useState<number | null>(null)
  const [jour, setJour] = useState('Tous')

  const jours = ['Tous', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche']

  const pointsFiltres = points.filter(p => {
    const matchVille = ville === 'Toutes' || p.ville === ville
    const matchType = type === 'Tous' || p.type === type
    const matchJour = jour === 'Tous' || p.jours.includes(jour)
    return matchVille && matchType && matchJour
  })

  const pointSelectionne = selectionne ? points.find(p => p.id === selectionne) : null

  return (
    <div style={{ minHeight: '100vh', background: '#f5f0e8', fontFamily: 'Georgia, serif' }}>
      <Nav page="collecte" />

      {/* Hero */}
      <div style={{ background: '#1a3a15', padding: '48px 24px 36px', color: '#f5e6c8' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <p style={{ fontSize: 13, letterSpacing: 3, opacity: 0.6, marginBottom: 8, fontFamily: 'system-ui' }}>RÉSEAU PANIER VERT</p>
          <h1 style={{ fontSize: 'clamp(28px, 5vw, 46px)', fontWeight: 700, marginBottom: 12 }}>
            Points de collecte 📍
          </h1>
          <p style={{ opacity: 0.75, fontSize: 16, fontFamily: 'system-ui', marginBottom: 28 }}>
            {points.length} points dans l'Estrie · Collecte 3× par semaine · Gratuit
          </p>

          {/* Stats */}
          <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
            {[
              { val: '8', label: 'Points actifs' },
              { val: '6', label: 'Villes couvertes' },
              { val: '3×', label: 'Par semaine' },
              { val: '0$', label: 'Frais de collecte' },
            ].map(s => (
              <div key={s.label}>
                <div style={{ fontSize: 28, fontWeight: 700, fontFamily: 'system-ui' }}>{s.val}</div>
                <div style={{ fontSize: 12, opacity: 0.6, fontFamily: 'system-ui' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filtres */}
      <div style={{ background: '#f5f0e8', borderBottom: '2px solid #e8e0d0', padding: '16px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
          <select value={ville} onChange={e => setVille(e.target.value)} style={{
            padding: '10px 14px', borderRadius: 10, border: '2px solid #d4c9b5',
            background: 'white', fontFamily: 'system-ui', fontSize: 13, color: '#1a1a1a', cursor: 'pointer'
          }}>
            {villes.map(v => <option key={v}>{v}</option>)}
          </select>
          <select value={type} onChange={e => setType(e.target.value)} style={{
            padding: '10px 14px', borderRadius: 10, border: '2px solid #d4c9b5',
            background: 'white', fontFamily: 'system-ui', fontSize: 13, color: '#1a1a1a', cursor: 'pointer'
          }}>
            {types.map(t => <option key={t}>{t}</option>)}
          </select>
          <select value={jour} onChange={e => setJour(e.target.value)} style={{
            padding: '10px 14px', borderRadius: 10, border: '2px solid #d4c9b5',
            background: 'white', fontFamily: 'system-ui', fontSize: 13, color: '#1a1a1a', cursor: 'pointer'
          }}>
            {jours.map(j => <option key={j}>{j}</option>)}
          </select>
          <span style={{ fontFamily: 'system-ui', fontSize: 13, color: '#888' }}>
            {pointsFiltres.length} point{pointsFiltres.length > 1 ? 's' : ''} trouvé{pointsFiltres.length > 1 ? 's' : ''}
          </span>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px', display: 'grid', gridTemplateColumns: selectionne ? '1fr 380px' : '1fr', gap: 24 }}>

        {/* Grille des points */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: 20, alignContent: 'start'
        }}>
          {pointsFiltres.map(p => (
            <div
              key={p.id}
              onClick={() => setSelectionne(selectionne === p.id ? null : p.id)}
              style={{
                background: 'white', borderRadius: 16, overflow: 'hidden',
                boxShadow: selectionne === p.id ? '0 0 0 3px #1a3a15' : '0 2px 12px rgba(0,0,0,0.08)',
                cursor: 'pointer', transition: 'all 0.2s', opacity: p.dispo ? 1 : 0.65
              }}
            >
              {/* Image */}
              <div style={{ position: 'relative', height: 160, overflow: 'hidden' }}>
                <img src={p.image} alt={p.nom} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{
                  position: 'absolute', top: 10, left: 10,
                  background: p.dispo ? '#166534' : '#666',
                  color: 'white', padding: '4px 10px', borderRadius: 20,
                  fontSize: 11, fontWeight: 700, fontFamily: 'system-ui'
                }}>
                  {p.dispo ? '● Actif' : '● Complet'}
                </div>
                <div style={{
                  position: 'absolute', top: 10, right: 10,
                  background: 'white', padding: '4px 10px', borderRadius: 20,
                  fontSize: 12, fontWeight: 700, fontFamily: 'system-ui', color: '#1a3a15'
                }}>
                  {p.emoji} {p.type}
                </div>
              </div>

              {/* Infos */}
              <div style={{ padding: '16px' }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1a1a1a', marginBottom: 4 }}>{p.nom}</h3>
                <p style={{ fontSize: 13, color: '#888', fontFamily: 'system-ui', marginBottom: 8 }}>
                  📍 {p.adresse}
                </p>
                <p style={{ fontSize: 12, color: '#555', fontFamily: 'system-ui', marginBottom: 10 }}>
                  🕐 {p.horaire}
                </p>

                {/* Jours de collecte */}
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
                  {p.jours.map(j => (
                    <span key={j} style={{
                      background: '#e8f5e9', color: '#166534',
                      padding: '3px 10px', borderRadius: 20, fontSize: 11,
                      fontWeight: 600, fontFamily: 'system-ui'
                    }}>{j}</span>
                  ))}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontFamily: 'system-ui', fontSize: 13, color: '#888' }}>⭐ {p.note} · {p.avis} avis</span>
                  <button style={{
                    background: '#1a3a15', color: '#f5e6c8',
                    border: 'none', padding: '8px 14px', borderRadius: 8,
                    cursor: 'pointer', fontSize: 12, fontWeight: 600, fontFamily: 'system-ui'
                  }}>
                    Choisir →
                  </button>
                </div>
              </div>
            </div>
          ))}

          {pointsFiltres.length === 0 && (
            <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '60px', color: '#888', fontFamily: 'system-ui' }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>📍</div>
              <p>Aucun point de collecte trouvé pour ces critères</p>
              <button onClick={() => { setVille('Toutes'); setType('Tous'); setJour('Tous') }} style={{
                marginTop: 16, background: '#1a3a15', color: '#f5e6c8',
                border: 'none', padding: '10px 20px', borderRadius: 8, cursor: 'pointer', fontFamily: 'system-ui'
              }}>
                Réinitialiser les filtres
              </button>
            </div>
          )}
        </div>

        {/* Panneau détail */}
        {pointSelectionne && (
          <div style={{
            background: 'white', borderRadius: 20, overflow: 'hidden',
            boxShadow: '0 4px 20px rgba(0,0,0,0.12)', alignSelf: 'start',
            position: 'sticky', top: 20
          }}>
            <div style={{ position: 'relative' }}>
              <img src={pointSelectionne.image} alt={pointSelectionne.nom} style={{ width: '100%', height: 200, objectFit: 'cover' }} />
              <button
                onClick={() => setSelectionne(null)}
                style={{
                  position: 'absolute', top: 12, right: 12,
                  background: 'rgba(0,0,0,0.5)', color: 'white', border: 'none',
                  width: 32, height: 32, borderRadius: '50%', cursor: 'pointer', fontSize: 16
                }}
              >✕</button>
            </div>
            <div style={{ padding: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                <span style={{ fontSize: 28 }}>{pointSelectionne.emoji}</span>
                <div>
                  <h2 style={{ fontSize: 20, fontWeight: 700, color: '#1a1a1a' }}>{pointSelectionne.nom}</h2>
                  <p style={{ fontSize: 13, color: '#888', fontFamily: 'system-ui' }}>{pointSelectionne.type} · {pointSelectionne.ville}</p>
                </div>
              </div>

              <p style={{ fontSize: 14, color: '#555', fontFamily: 'system-ui', lineHeight: 1.7, marginBottom: 16 }}>
                {pointSelectionne.description}
              </p>

              <div style={{ background: '#f5f0e8', borderRadius: 12, padding: '14px', marginBottom: 16 }}>
                <p style={{ fontSize: 12, color: '#888', fontFamily: 'system-ui', marginBottom: 4 }}>📍 Adresse</p>
                <p style={{ fontSize: 14, fontWeight: 600, fontFamily: 'system-ui', color: '#1a1a1a' }}>{pointSelectionne.adresse}</p>
              </div>

              <div style={{ background: '#f5f0e8', borderRadius: 12, padding: '14px', marginBottom: 16 }}>
                <p style={{ fontSize: 12, color: '#888', fontFamily: 'system-ui', marginBottom: 4 }}>🕐 Horaires</p>
                <p style={{ fontSize: 14, fontWeight: 600, fontFamily: 'system-ui', color: '#1a1a1a' }}>{pointSelectionne.horaire}</p>
              </div>

              <div style={{ marginBottom: 20 }}>
                <p style={{ fontSize: 12, color: '#888', fontFamily: 'system-ui', marginBottom: 8 }}>📅 Jours de collecte Panier Vert</p>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {pointSelectionne.jours.map(j => (
                    <span key={j} style={{
                      background: '#1a3a15', color: '#f5e6c8',
                      padding: '6px 14px', borderRadius: 20, fontSize: 13,
                      fontWeight: 600, fontFamily: 'system-ui'
                    }}>{j}</span>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
                {pointSelectionne.tags.map(t => (
                  <span key={t} style={{
                    background: '#e8f5e9', color: '#166534',
                    padding: '4px 12px', borderRadius: 20, fontSize: 12,
                    fontFamily: 'system-ui'
                  }}>✓ {t}</span>
                ))}
              </div>

              <Link href="/panier" style={{
                display: 'block', textAlign: 'center',
                background: '#1a3a15', color: '#f5e6c8',
                padding: '14px', borderRadius: 12, textDecoration: 'none',
                fontFamily: 'system-ui', fontWeight: 700, fontSize: 15
              }}>
                Choisir ce point de collecte →
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* CTA bas */}
      <div style={{ background: '#1a3a15', padding: '48px 24px', color: '#f5e6c8', textAlign: 'center', marginTop: 40 }}>
        <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 12 }}>Vous avez un commerce local ? 🏪</h2>
        <p style={{ opacity: 0.75, fontFamily: 'system-ui', fontSize: 16, marginBottom: 24 }}>
          Devenez point de collecte Panier Vert. Attirez de nouveaux clients et soutenez l'agriculture locale.
        </p>
        <Link href="/inscription" style={{
          background: '#f5e6c8', color: '#1a3a15',
          padding: '14px 28px', borderRadius: 12, textDecoration: 'none',
          fontFamily: 'system-ui', fontWeight: 700, fontSize: 15
        }}>
          Devenir point de collecte →
        </Link>
      </div>

      <Footer />
    </div>
  )
}
