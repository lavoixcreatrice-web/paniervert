'use client'
import { useState } from 'react'
import dynamic from 'next/dynamic'
import Nav from '../components/Nav'

const CarteLeaflet = dynamic(() => import('./CarteLeafletFull'), { ssr: false })

const producteurs = [
  { id: 1, nom: 'Ferme Tremblay', ville: 'Magog', km: 8, type: 'Maraîcher', methode: 'biologique', note: 4.9, produits: 47, lat: 45.2706, lng: -72.1491, emoji: '🌾', desc: 'Légumes biologiques récoltés à la main.', badges: ['🌿 Bio', '🚫 Sans pesticides'] },
  { id: 2, nom: 'Fromagerie Compton', ville: 'Compton', km: 22, type: 'Fromagerie', methode: 'artisanal', note: 4.8, produits: 12, lat: 45.2333, lng: -71.8167, emoji: '🧀', desc: 'Fromages affinés artisanaux primés.', badges: ['✋ Artisanal', '🐄 Lait local'] },
  { id: 3, nom: 'Érablière Roy', ville: 'Austin', km: 19, type: 'Érablière', methode: 'naturel', note: 5.0, produits: 8, lat: 45.2833, lng: -72.2167, emoji: '🍁', desc: '10 000 entailles, aucun produit chimique.', badges: ['🌿 Naturel', '♻️ Éco'] },
  { id: 4, nom: 'Verger Bolduc', ville: 'Orford', km: 14, type: 'Verger', methode: 'raisonne', note: 4.7, produits: 30, lat: 45.3167, lng: -72.1833, emoji: '🍎', desc: '30 variétés de pommes, autocueillette.', badges: ['🔬 Raisonné', '🐝 Pollinisateurs'] },
  { id: 5, nom: 'Rucher des Cantons', ville: 'Bromont', km: 11, type: 'Apiculteur', methode: 'naturel', note: 4.9, produits: 15, lat: 45.3167, lng: -72.6500, emoji: '🍯', desc: '200 ruches en champs sauvages.', badges: ['🌿 Naturel', '🍯 Miel cru'] },
  { id: 6, nom: 'Ferme Biopastorale', ville: 'Waterloo', km: 31, type: 'Élevage', methode: 'biologique', note: 4.8, produits: 9, lat: 45.3500, lng: -72.5167, emoji: '🐄', desc: 'Bovins et volailles plein air certifiés.', badges: ['🌿 Bio', '🐄 Plein air'] },
  { id: 7, nom: 'Jardins Fleuris', ville: 'Sherbrooke', km: 28, type: 'Maraîcher', methode: 'naturel', note: 4.6, produits: 24, lat: 45.4040, lng: -71.8929, emoji: '🌸', desc: 'Fines herbes et fleurs comestibles.', badges: ['🌿 Naturel', '🌸 Fleurs'] },
  { id: 8, nom: 'Boulangerie Altitude', ville: 'Magog', km: 5, type: 'Boulangerie', methode: 'artisanal', note: 5.0, produits: 14, lat: 45.2600, lng: -72.1400, emoji: '🍞', desc: 'Pain au levain, farines locales.', badges: ['✋ Artisanal', '🌾 Farine locale'] },
  { id: 9, nom: 'Microbrasserie Orford', ville: 'Orford', km: 17, type: 'Brasserie', methode: 'artisanal', note: 4.7, produits: 8, lat: 45.3333, lng: -72.2000, emoji: '🍺', desc: 'Bières avec houblon et céréales locaux.', badges: ['✋ Artisanal', '🌾 Local'] },
  { id: 10, nom: 'Cueillette Magog', ville: 'Magog', km: 9, type: 'Verger', methode: 'naturel', note: 4.8, produits: 6, lat: 45.2750, lng: -72.1550, emoji: '🍓', desc: 'Fraises et petits fruits, autocueillette.', badges: ['🌿 Naturel', '✓ Autocueillette'] },
  { id: 11, nom: 'Marché de Magog', ville: 'Magog', km: 3, type: 'Marché', methode: 'mixte', note: 4.9, produits: 120, lat: 45.2580, lng: -72.1480, emoji: '🛒', desc: 'Point de collecte principal — mer & sam.', badges: ['📦 Collecte', '🗓 Mer & Sam'] },
  { id: 12, nom: 'Épicerie Compton', ville: 'Compton', km: 22, type: 'Point collecte', methode: 'mixte', note: 4.7, produits: 60, lat: 45.2300, lng: -71.8100, emoji: '🏪', desc: 'Point de collecte — mar, jeu & sam.', badges: ['📦 Collecte', '🗓 Mer-Ven'] },
]

const typeColors: Record<string, string> = {
  'Maraîcher': '#4ade80', 'Fromagerie': '#fbbf24', 'Érablière': '#f97316',
  'Verger': '#34d399', 'Apiculteur': '#facc15', 'Élevage': '#60a5fa',
  'Boulangerie': '#fb923c', 'Brasserie': '#a78bfa', 'Marché': '#f472b6',
  'Point collecte': '#94a3b8', 'Spécialisé': '#c084fc',
}

const types = ['Tous', 'Maraîcher', 'Fromagerie', 'Érablière', 'Verger', 'Apiculteur', 'Élevage', 'Boulangerie', 'Brasserie', 'Marché', 'Point collecte']

export default function CartePage() {
  const [selectionne, setSelectionne] = useState<number | null>(null)
  const [typeActif, setTypeActif] = useState('Tous')
  const [recherche, setRecherche] = useState('')

  const filtres = producteurs
    .filter(p => typeActif === 'Tous' || p.type === typeActif)
    .filter(p => p.nom.toLowerCase().includes(recherche.toLowerCase()) || p.ville.toLowerCase().includes(recherche.toLowerCase()))

  const produitSelectionne = producteurs.find(p => p.id === selectionne)

  return (
    <main style={{ fontFamily: 'Georgia, serif', height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <Nav page="carte" />

      {/* FILTRES */}
      <div style={{ background: 'white', borderBottom: '1px solid #eee', padding: '10px 3%', display: 'flex', gap: 10, alignItems: 'center', flexShrink: 0, overflowX: 'auto' }}>
        <div style={{ position: 'relative', flexShrink: 0 }}>
          <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', fontSize: 14 }}>🔍</span>
          <input value={recherche} onChange={e => setRecherche(e.target.value)} placeholder="Rechercher..."
            style={{ padding: '7px 10px 7px 30px', borderRadius: 8, border: '1px solid #ddd', fontSize: 13, fontFamily: 'system-ui', outline: 'none', width: 180, color: '#1a1a1a' }} />
        </div>
        <div style={{ width: 1, height: 28, background: '#eee', flexShrink: 0 }} />
        {types.map(t => (
          <button key={t} onClick={() => setTypeActif(t)}
            style={{ background: typeActif === t ? '#1a3a15' : '#f5f5f5', color: typeActif === t ? 'white' : '#555', border: 'none', padding: '7px 14px', borderRadius: 20, fontSize: 12, cursor: 'pointer', fontFamily: 'system-ui', fontWeight: typeActif === t ? 700 : 400, flexShrink: 0 }}>
            {t !== 'Tous' && <span style={{ width: 8, height: 8, borderRadius: '50%', background: typeActif === t ? 'white' : typeColors[t], display: 'inline-block', marginRight: 5 }} />}
            {t}
          </button>
        ))}
        <div style={{ marginLeft: 'auto', fontSize: 13, color: '#888', fontFamily: 'system-ui', flexShrink: 0 }}>{filtres.length} résultat{filtres.length > 1 ? 's' : ''}</div>
      </div>

      {/* CORPS */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* PANNEAU GAUCHE */}
        <div style={{ width: 320, background: '#faf7f0', borderRight: '1px solid #eee', overflowY: 'auto', flexShrink: 0 }}>
          {produitSelectionne && (
            <div style={{ background: '#1a3a15', padding: '20px 20px 16px', borderBottom: '2px solid #2d5a27' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                <div>
                  <div style={{ fontSize: 22, marginBottom: 4 }}>{produitSelectionne.emoji}</div>
                  <div style={{ fontSize: 16, fontWeight: 800, color: '#f5e6c8' }}>{produitSelectionne.nom}</div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', fontFamily: 'system-ui' }}>{produitSelectionne.ville} · {produitSelectionne.km} km · ⭐ {produitSelectionne.note}</div>
                </div>
                <button onClick={() => setSelectionne(null)} style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: 'none', width: 28, height: 28, borderRadius: '50%', cursor: 'pointer', fontSize: 16 }}>✕</button>
              </div>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', fontFamily: 'system-ui', margin: '0 0 12px', lineHeight: 1.5 }}>{produitSelectionne.desc}</p>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 14 }}>
                {produitSelectionne.badges.map(b => (
                  <span key={b} style={{ background: 'rgba(255,255,255,0.15)', color: '#f5e6c8', fontSize: 11, fontFamily: 'system-ui', fontWeight: 600, padding: '3px 8px', borderRadius: 20 }}>{b}</span>
                ))}
              </div>
              <button onClick={() => window.location.href = `/producteurs/${produitSelectionne.id}`}
                style={{ width: '100%', background: '#f5e6c8', color: '#1a3a15', border: 'none', padding: '10px', borderRadius: 8, fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'system-ui' }}>
                Voir la fiche complète →
              </button>
            </div>
          )}
          <div style={{ padding: '12px 0' }}>
            {filtres.map(p => (
              <div key={p.id} onClick={() => setSelectionne(p.id)}
                style={{ padding: '14px 20px', cursor: 'pointer', borderLeft: `3px solid ${selectionne === p.id ? '#1a3a15' : 'transparent'}`, background: selectionne === p.id ? '#f0faf0' : 'transparent', borderBottom: '1px solid #f0f0f0' }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: typeColors[p.type] + '30', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0, border: `2px solid ${typeColors[p.type]}` }}>{p.emoji}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#1a3a15', marginBottom: 2 }}>{p.nom}</div>
                    <div style={{ fontSize: 12, color: '#888', fontFamily: 'system-ui' }}>{p.ville} · {p.km} km · {p.produits} produits</div>
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#1a3a15' }}>⭐ {p.note}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CARTE */}
        <div style={{ flex: 1, position: 'relative' }}>
          <CarteLeaflet producteurs={filtres} selectionne={selectionne} onSelect={setSelectionne} typeColors={typeColors} />
          <div style={{ position: 'absolute', bottom: 20, left: 20, background: 'white', borderRadius: 10, padding: '10px 16px', boxShadow: '0 2px 12px rgba(0,0,0,0.15)', fontFamily: 'system-ui', zIndex: 1000 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#1a3a15' }}>🌾 {filtres.filter(p => !['Marché', 'Point collecte'].includes(p.type)).length} producteurs</div>
            <div style={{ fontSize: 12, color: '#888' }}>📦 {filtres.filter(p => ['Marché', 'Point collecte'].includes(p.type)).length} points de collecte</div>
          </div>
        </div>
      </div>
    </main>
  )
}
