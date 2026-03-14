'use client'
import { useState } from 'react'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

const tous = [
  { id: 1, nom: 'Ferme Tremblay', proprio: 'Jean & Marie Tremblay', ville: 'Magog', km: 8, type: 'Maraîcher', emoji: '🌾', methode: 'biologique', note: 4.9, avis: 47, produits: 47, img: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=400&h=260&fit=crop', desc: 'Légumes biologiques récoltés à la main chaque matin.', badges: ['🌿 Bio certifié', '🚫 Sans pesticides'] },
  { id: 2, nom: 'Fromagerie Compton', proprio: 'Famille Bolduc', ville: 'Compton', km: 22, type: 'Fromagerie', emoji: '🧀', methode: 'artisanal', note: 4.8, avis: 31, produits: 12, img: 'https://images.unsplash.com/photo-1559570278-eb8d71d06403?w=400&h=260&fit=crop', desc: 'Fromages affinés artisanaux primés, lait local sans hormones.', badges: ['✋ Artisanal', '🐄 Lait sans hormones'] },
  { id: 3, nom: 'Érablière Roy', proprio: 'Michel Roy', ville: 'Austin', km: 19, type: 'Érablière', emoji: '🍁', methode: 'naturel', note: 5.0, avis: 28, produits: 8, img: 'https://images.unsplash.com/photo-1589496933738-f5e439be8f2a?w=400&h=260&fit=crop', desc: '10 000 entailles, 4e génération, aucun produit chimique.', badges: ['🌿 100% naturel', '♻️ Écologique'] },
  { id: 4, nom: 'Verger Bolduc', proprio: 'Sophie Bolduc', ville: 'Orford', km: 14, type: 'Verger', emoji: '🍎', methode: 'raisonne', note: 4.7, avis: 22, produits: 30, img: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400&h=260&fit=crop', desc: '30 variétés de pommes, autocueillette, cidre artisanal.', badges: ['🔬 Raisonné', '🐝 Pollinisateurs'] },
  { id: 5, nom: 'Rucher des Cantons', proprio: 'Claire Ouellet', ville: 'Bromont', km: 11, type: 'Apiculteur', emoji: '🍯', methode: 'naturel', note: 4.9, avis: 19, produits: 15, img: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&h=260&fit=crop', desc: '200 ruches en champs sauvages, miel cru non pasteurisé.', badges: ['🌿 Naturel', '🍯 Miel cru'] },
  { id: 6, nom: 'Ferme Biopastorale', proprio: 'Luc Gagnon', ville: 'Waterloo', km: 31, type: 'Élevage', emoji: '🐄', methode: 'biologique', note: 4.8, avis: 14, produits: 9, img: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=400&h=260&fit=crop', desc: 'Bovins et volailles plein air, 100% végétal sans antibiotiques.', badges: ['🌿 Bio certifié', '🐄 Plein air'] },
  { id: 7, nom: 'Jardins Fleuris', proprio: 'Anne Beauchemin', ville: 'Sherbrooke', km: 28, type: 'Maraîcher', emoji: '🌸', methode: 'naturel', note: 4.6, avis: 11, produits: 24, img: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=260&fit=crop', desc: 'Fines herbes, fleurs comestibles et légumes héritage.', badges: ['🌿 Naturel', '🌸 Fleurs comestibles'] },
  { id: 8, nom: 'Boulangerie Altitude', proprio: 'Marc Simard', ville: 'Magog', km: 5, type: 'Boulangerie', emoji: '🍞', methode: 'artisanal', note: 5.0, avis: 38, produits: 14, img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=260&fit=crop', desc: 'Pain au levain cuit chaque matin, farines locales moulues sur pierre.', badges: ['✋ Artisanal', '🌾 Farine locale'] },
  { id: 9, nom: 'Microbrasserie Orford', proprio: 'Équipe Orford', ville: 'Orford', km: 17, type: 'Brasserie', emoji: '🍺', methode: 'artisanal', note: 4.7, avis: 25, produits: 8, img: 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=400&h=260&fit=crop', desc: 'Bières de microbrasserie avec houblon et céréales locaux.', badges: ['✋ Artisanal', '🌾 Ingrédients locaux'] },
  { id: 10, nom: 'Cueillette Magog', proprio: 'Famille Hébert', ville: 'Magog', km: 9, type: 'Verger', emoji: '🍓', methode: 'naturel', note: 4.8, avis: 16, produits: 6, img: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400&h=260&fit=crop', desc: 'Fraises, framboises et petits fruits — autocueillette en saison.', badges: ['🌿 Naturel', '✓ Autocueillette'] },
  { id: 11, nom: 'Ferme Lavande', proprio: 'Isabelle Roy', ville: 'Dunham', km: 38, type: 'Spécialisé', emoji: '💜', methode: 'naturel', note: 4.9, avis: 20, produits: 11, img: 'https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?w=400&h=260&fit=crop', desc: 'Lavande, huiles essentielles et produits cosmétiques naturels.', badges: ['🌿 Naturel', '💜 Spécialisé'] },
  { id: 12, nom: 'Potager Compton', proprio: 'Pierre Nadeau', ville: 'Compton', km: 23, type: 'Maraîcher', emoji: '🥦', methode: 'biologique', note: 4.6, avis: 9, produits: 19, img: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=260&fit=crop', desc: 'Légumes biologiques de saison, semences patrimoniales préservées.', badges: ['🌿 Bio certifié', '🌱 Semences patrimoniales'] },
]

const methodeColors: Record<string, { bg: string; color: string; label: string }> = {
  biologique: { bg: '#dcfce7', color: '#166534', label: '🌿 Biologique' },
  naturel: { bg: '#fef9c3', color: '#854d0e', label: '☀️ Naturel' },
  raisonne: { bg: '#dbeafe', color: '#1e40af', label: '🔬 Raisonné' },
  artisanal: { bg: '#fce7f3', color: '#9d174d', label: '✋ Artisanal' },
}

const types = ['Tous', 'Maraîcher', 'Fromagerie', 'Érablière', 'Verger', 'Apiculteur', 'Élevage', 'Boulangerie', 'Brasserie', 'Spécialisé']
const methodes = ['Toutes', 'biologique', 'naturel', 'raisonne', 'artisanal']
const tris = ['Plus proche', 'Mieux noté', 'Plus de produits', 'Ordre alphabétique']

export default function ProducteursPage() {
  const [recherche, setRecherche] = useState('')
  const [typeActif, setTypeActif] = useState('Tous')
  const [methodeActive, setMethodeActive] = useState('Toutes')
  const [tri, setTri] = useState('Plus proche')
  const [suivis, setSuivis] = useState<number[]>([])
  const [vue, setVue] = useState<'grille' | 'liste'>('grille')

  const toggleSuivi = (id: number) => setSuivis(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id])

  let filtres = tous
    .filter(p => typeActif === 'Tous' || p.type === typeActif)
    .filter(p => methodeActive === 'Toutes' || p.methode === methodeActive)
    .filter(p => p.nom.toLowerCase().includes(recherche.toLowerCase()) || p.ville.toLowerCase().includes(recherche.toLowerCase()))

  if (tri === 'Plus proche') filtres = [...filtres].sort((a, b) => a.km - b.km)
  if (tri === 'Mieux noté') filtres = [...filtres].sort((a, b) => b.note - a.note)
  if (tri === 'Plus de produits') filtres = [...filtres].sort((a, b) => b.produits - a.produits)
  if (tri === 'Ordre alphabétique') filtres = [...filtres].sort((a, b) => a.nom.localeCompare(b.nom))

  return (
    <main style={{ fontFamily: 'Georgia, serif', background: '#faf7f0', minHeight: '100vh' }}>

      <Nav page="producteurs" />

      {/* EN-TÊTE */}
      <div style={{ background: 'linear-gradient(135deg, #1a3a15, #2d5a27)', padding: '56px 5% 48px' }}>
        <div style={{ fontSize: 12, fontFamily: 'system-ui', fontWeight: 700, color: '#4ade80', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: 10 }}>RÉSEAU PANIER VERT</div>
        <h1 style={{ fontSize: 'clamp(32px,5vw,54px)', fontWeight: 900, color: '#f5e6c8', margin: '0 0 12px 0', lineHeight: 1.1 }}>Nos producteurs 👨‍🌾</h1>
        <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.6)', fontFamily: 'system-ui', margin: '0 0 32px 0', maxWidth: 540 }}>
          {tous.length} producteurs locaux en Estrie — des familles passionnées à quelques kilomètres de chez vous.
        </p>

        {/* Barre de recherche */}
        <div style={{ display: 'flex', gap: 12, maxWidth: 600, flexWrap: 'wrap' }}>
          <div style={{ flex: 1, position: 'relative', minWidth: 240 }}>
            <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', fontSize: 16 }}>🔍</span>
            <input
              value={recherche}
              onChange={e => setRecherche(e.target.value)}
              placeholder="Rechercher par nom ou ville..."
              style={{ width: '100%', padding: '13px 14px 13px 42px', borderRadius: 8, border: 'none', fontSize: 15, fontFamily: 'system-ui', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>
          <select value={tri} onChange={e => setTri(e.target.value)}
            style={{ padding: '13px 16px', borderRadius: 8, border: 'none', fontSize: 14, fontFamily: 'system-ui', background: 'rgba(255,255,255,0.15)', color: 'white', cursor: 'pointer', outline: 'none' }}>
            {tris.map(t => <option key={t} value={t} style={{ color: '#333' }}>{t}</option>)}
          </select>
          <div style={{ display: 'flex', background: 'rgba(255,255,255,0.15)', borderRadius: 8, overflow: 'hidden' }}>
            {(['grille', 'liste'] as const).map(v => (
              <button key={v} onClick={() => setVue(v)}
                style={{ padding: '13px 16px', border: 'none', background: vue === v ? 'rgba(255,255,255,0.3)' : 'transparent', color: 'white', cursor: 'pointer', fontSize: 16 }}>
                {v === 'grille' ? '⊞' : '☰'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* FILTRES */}
      <div style={{ background: 'white', borderBottom: '1px solid #eee', padding: '16px 5%', display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', flex: 1 }}>
          <span style={{ fontSize: 13, fontFamily: 'system-ui', color: '#888', fontWeight: 600, alignSelf: 'center' }}>Type :</span>
          {types.map(t => (
            <button key={t} onClick={() => setTypeActif(t)}
              style={{ background: typeActif === t ? '#1a3a15' : '#f5f5f5', color: typeActif === t ? '#f5e6c8' : '#555', border: 'none', padding: '6px 14px', borderRadius: 20, fontSize: 13, cursor: 'pointer', fontFamily: 'system-ui', fontWeight: typeActif === t ? 700 : 400 }}>
              {t}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 13, fontFamily: 'system-ui', color: '#888', fontWeight: 600, alignSelf: 'center' }}>Méthode :</span>
          {methodes.map(m => {
            const mc = m !== 'Toutes' ? methodeColors[m] : null
            return (
              <button key={m} onClick={() => setMethodeActive(m)}
                style={{ background: methodeActive === m ? (mc ? mc.bg : '#1a3a15') : '#f5f5f5', color: methodeActive === m ? (mc ? mc.color : '#f5e6c8') : '#555', border: `1px solid ${methodeActive === m && mc ? mc.color : 'transparent'}`, padding: '6px 14px', borderRadius: 20, fontSize: 13, cursor: 'pointer', fontFamily: 'system-ui', fontWeight: methodeActive === m ? 700 : 400 }}>
                {m === 'Toutes' ? 'Toutes' : methodeColors[m].label}
              </button>
            )
          })}
        </div>
      </div>

      {/* RÉSULTATS */}
      <div style={{ padding: '36px 5%' }}>
        <div style={{ fontSize: 14, fontFamily: 'system-ui', color: '#888', marginBottom: 24 }}>
          {filtres.length} producteur{filtres.length > 1 ? 's' : ''} trouvé{filtres.length > 1 ? 's' : ''}
          {typeActif !== 'Tous' && ` · ${typeActif}`}
          {methodeActive !== 'Toutes' && ` · ${methodeColors[methodeActive].label}`}
        </div>

        {/* VUE GRILLE */}
        {vue === 'grille' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 24 }}>
            {filtres.map(p => {
              const m = methodeColors[p.methode]
              return (
                <div key={p.id} style={{ background: 'white', borderRadius: 16, overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.07)', border: '1px solid #eee', cursor: 'pointer', transition: 'transform 0.2s' }}
                  onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-3px)'}
                  onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'}>
                  <div style={{ position: 'relative', height: 180, overflow: 'hidden', background: '#e8f5e8' }}>
                    <img src={p.img} alt={p.nom} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none' }} />
                    <div style={{ position: 'absolute', top: 10, left: 10, background: m.bg, color: m.color, fontSize: 11, fontFamily: 'system-ui', fontWeight: 700, padding: '4px 10px', borderRadius: 20 }}>{m.label}</div>
                    <div style={{ position: 'absolute', top: 10, right: 10, background: 'rgba(255,255,255,0.92)', color: '#1a3a15', fontSize: 11, fontFamily: 'system-ui', fontWeight: 700, padding: '4px 10px', borderRadius: 20 }}>📍 {p.km} km</div>
                    <button onClick={e => { e.stopPropagation(); toggleSuivi(p.id) }}
                      style={{ position: 'absolute', bottom: 10, right: 10, background: suivis.includes(p.id) ? '#1a3a15' : 'rgba(255,255,255,0.85)', color: suivis.includes(p.id) ? '#f5e6c8' : '#1a3a15', border: 'none', padding: '6px 12px', borderRadius: 20, fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'system-ui' }}>
                      {suivis.includes(p.id) ? '✓ Suivi' : '♡ Suivre'}
                    </button>
                  </div>
                  <div style={{ padding: '18px 20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                      <div>
                        <div style={{ fontSize: 17, fontWeight: 800, color: '#1a3a15' }}>{p.emoji} {p.nom}</div>
                        <div style={{ fontSize: 12, color: '#999', fontFamily: 'system-ui' }}>{p.proprio} · {p.ville}</div>
                      </div>
                      <div style={{ textAlign: 'right', flexShrink: 0 }}>
                        <div style={{ fontSize: 14, fontWeight: 700, color: '#1a3a15' }}>⭐ {p.note}</div>
                        <div style={{ fontSize: 11, color: '#aaa', fontFamily: 'system-ui' }}>{p.avis} avis</div>
                      </div>
                    </div>
                    <p style={{ fontSize: 13, color: '#666', fontFamily: 'system-ui', lineHeight: 1.6, margin: '8px 0 12px' }}>{p.desc}</p>
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 14 }}>
                      {p.badges.map(b => (
                        <span key={b} style={{ background: '#f0faf0', color: '#2d5a27', fontSize: 11, fontFamily: 'system-ui', fontWeight: 600, padding: '3px 8px', borderRadius: 20, border: '1px solid #c8e8c8' }}>{b}</span>
                      ))}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: 13, color: '#888', fontFamily: 'system-ui' }}>{p.produits} produits</span>
                      <button onClick={() => window.location.href = `/producteurs/${p.id}`}
                        style={{ background: '#1a3a15', color: '#f5e6c8', border: 'none', padding: '9px 18px', borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'system-ui' }}>
                        Voir la fiche →
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* VUE LISTE */}
        {vue === 'liste' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {filtres.map(p => {
              const m = methodeColors[p.methode]
              return (
                <div key={p.id} style={{ background: 'white', borderRadius: 14, padding: '18px 24px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', display: 'flex', gap: 20, alignItems: 'center', cursor: 'pointer' }}>
                  <img src={p.img} alt={p.nom} style={{ width: 80, height: 80, borderRadius: 10, objectFit: 'cover', flexShrink: 0 }}
                    onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none' }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 4, flexWrap: 'wrap' }}>
                      <span style={{ fontSize: 16, fontWeight: 800, color: '#1a3a15' }}>{p.emoji} {p.nom}</span>
                      <span style={{ background: m.bg, color: m.color, fontSize: 11, fontFamily: 'system-ui', fontWeight: 700, padding: '2px 8px', borderRadius: 20 }}>{m.label}</span>
                    </div>
                    <div style={{ fontSize: 13, color: '#888', fontFamily: 'system-ui', marginBottom: 6 }}>{p.proprio} · {p.ville} · {p.km} km</div>
                    <p style={{ fontSize: 13, color: '#666', fontFamily: 'system-ui', margin: 0, lineHeight: 1.5 }}>{p.desc}</p>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <div style={{ fontSize: 15, fontWeight: 700, color: '#1a3a15', marginBottom: 2 }}>⭐ {p.note} <span style={{ fontSize: 12, color: '#aaa', fontWeight: 400 }}>({p.avis})</span></div>
                    <div style={{ fontSize: 13, color: '#888', fontFamily: 'system-ui', marginBottom: 12 }}>{p.produits} produits</div>
                    <button onClick={() => window.location.href = `/producteurs/${p.id}`}
                      style={{ background: '#1a3a15', color: '#f5e6c8', border: 'none', padding: '8px 16px', borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'system-ui' }}>
                      Voir la fiche →
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {filtres.length === 0 && (
          <div style={{ textAlign: 'center', padding: '80px 0', color: '#888', fontFamily: 'system-ui' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
            <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Aucun producteur trouvé</div>
            <div style={{ fontSize: 14 }}>Essayez d'autres filtres ou une autre recherche</div>
          </div>
        )}
      </div>

      {/* CTA REJOINDRE */}
      <div style={{ background: '#1a3a15', padding: '60px 5%', textAlign: 'center' }}>
        <h2 style={{ fontSize: 32, fontWeight: 900, color: '#f5e6c8', marginBottom: 12 }}>Vous êtes producteur ? 🌱</h2>
        <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.6)', fontFamily: 'system-ui', marginBottom: 28, maxWidth: 480, margin: '0 auto 28px' }}>
          Rejoignez le réseau Panier Vert et vendez directement à des milliers de clients locaux.
        </p>
        <button onClick={() => window.location.href = '/inscription'}
          style={{ background: '#f5e6c8', color: '#1a3a15', border: 'none', padding: '16px 36px', borderRadius: 8, fontSize: 16, fontWeight: 700, cursor: 'pointer', fontFamily: 'system-ui' }}>
          Créer ma boutique gratuitement →
        </button>
      </div>

      <Footer />
    </main>
  )
}
