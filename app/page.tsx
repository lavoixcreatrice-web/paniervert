'use client'
import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import Nav from './components/Nav'
import Footer from './components/Footer'

const MapEstrie = dynamic(() => import('./MapEstrie'), { ssr: false })

const surplus = [
  { nom: 'Carottes bio', ferme: 'Ferme Tremblay', avant: '3,50$', apres: '1,75$', img: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=200&h=140&fit=crop', pct: 50 },
  { nom: 'Laitue Boston', ferme: 'Jardins Fleuris', avant: '2,50$', apres: '1,25$', img: 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=200&h=140&fit=crop', pct: 50 },
  { nom: 'Courgettes', ferme: 'Ferme Tremblay', avant: '3,00$', apres: '1,50$', img: 'https://images.unsplash.com/photo-1596097635121-14b63b7a0c19?w=200&h=140&fit=crop', pct: 50 },
  { nom: 'Pommes Cortland', ferme: 'Verger Bolduc', avant: '4,00$', apres: '2,00$', img: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=200&h=140&fit=crop', pct: 50 },
  { nom: 'Miel sauvage', ferme: 'Rucher Cantons', avant: '12,00$', apres: '8,00$', img: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=200&h=140&fit=crop', pct: 33 },
]

const producteurs = [
  { id: 1, nom: 'Ferme Tremblay', ville: 'Magog', km: 8, methode: '🌿 Biologique', note: 4.9, produits: 47, img: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=400&h=220&fit=crop', badges: ['Sans pesticides', 'Sans herbicides'] },
  { id: 2, nom: 'Fromagerie Compton', ville: 'Compton', km: 22, methode: '✋ Artisanal', note: 4.8, produits: 12, img: 'https://images.unsplash.com/photo-1559570278-eb8d71d06403?w=400&h=220&fit=crop', badges: ['Lait sans hormones'] },
  { id: 3, nom: 'Érablière Roy', ville: 'Austin', km: 19, methode: '☀️ Naturel', note: 5.0, produits: 8, img: 'https://images.unsplash.com/photo-1589496933738-f5e439be8f2a?w=400&h=220&fit=crop', badges: ['Sans produits chimiques'] },
  { id: 4, nom: 'Verger Bolduc', ville: 'Orford', km: 14, methode: '🔬 Raisonné', note: 4.7, produits: 30, img: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400&h=220&fit=crop', badges: ['Pesticides réduits'] },
  { id: 5, nom: 'Rucher des Cantons', ville: 'Bromont', km: 11, methode: '☀️ Naturel', note: 4.9, produits: 15, img: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&h=220&fit=crop', badges: ['Sans pesticides', 'Miel cru'] },
  { id: 6, nom: 'Ferme Biopastorale', ville: 'Waterloo', km: 31, methode: '🌿 Biologique', note: 4.8, produits: 9, img: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=400&h=220&fit=crop', badges: ['Sans antibiotiques', 'Plein air'] },
]

const produits = [
  { nom: 'Carottes bio', ferme: 'Ferme Tremblay', prix: '3,50$/kg', img: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=200&h=160&fit=crop', cat: 'Légumes' },
  { nom: 'Fromage Compton', ferme: 'Fromagerie Compton', prix: '8,00$/100g', img: 'https://images.unsplash.com/photo-1559570278-eb8d71d06403?w=200&h=160&fit=crop', cat: 'Fromagerie' },
  { nom: 'Sirop d\'érable', ferme: 'Érablière Roy', prix: '14,00$/500ml', img: 'https://images.unsplash.com/photo-1589496933738-f5e439be8f2a?w=200&h=160&fit=crop', cat: 'Érable' },
  { nom: 'Pommes Cortland', ferme: 'Verger Bolduc', prix: '4,00$/kg', img: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=200&h=160&fit=crop', cat: 'Fruits' },
  { nom: 'Miel sauvage', ferme: 'Rucher des Cantons', prix: '12,00$/pot', img: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=200&h=160&fit=crop', cat: 'Miel' },
  { nom: 'Laitue Boston', ferme: 'Ferme Tremblay', prix: '2,50$/tête', img: 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=200&h=160&fit=crop', cat: 'Légumes' },
  { nom: 'Pain au levain', ferme: 'Boulangerie Altitude', prix: '6,50$/pain', img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=200&h=160&fit=crop', cat: 'Boulangerie' },
  { nom: 'Courgettes', ferme: 'Ferme Tremblay', prix: '3,00$/kg', img: 'https://images.unsplash.com/photo-1596097635121-14b63b7a0c19?w=200&h=160&fit=crop', cat: 'Légumes' },
  { nom: 'Bœuf Angus', ferme: 'Ferme Biopastorale', prix: '18,00$/kg', img: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=200&h=160&fit=crop', cat: 'Viandes' },
  { nom: 'Tomates Heirloom', ferme: 'Ferme Tremblay', prix: '5,50$/kg', img: 'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=200&h=160&fit=crop', cat: 'Légumes' },
  { nom: 'Cidre artisanal', ferme: 'Verger Bolduc', prix: '9,00$/750ml', img: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=200&h=160&fit=crop', cat: 'Boissons' },
  { nom: 'Maïs sucré', ferme: 'Ferme Tremblay', prix: '0,75$/épi', img: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=200&h=160&fit=crop', cat: 'Légumes' },
]

const cats = ['Tous', 'Légumes', 'Fruits', 'Fromagerie', 'Érable', 'Miel', 'Boulangerie', 'Viandes', 'Boissons']

export default function Home() {
  const [catActive, setCatActive] = useState('Tous')
  const [panier, setPanier] = useState<string[]>([])
  const scroll = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  const produitsFiltres = catActive === 'Tous' ? produits : produits.filter(p => p.cat === catActive)

  return (
    <main style={{ fontFamily: 'Georgia, serif', background: '#faf7f0' }}>
      <Nav page="accueil" />

      {/* HERO */}
      <section id="carte" style={{ background: 'linear-gradient(135deg, #1a3a15 0%, #2d5a27 50%, #1a3a15 100%)', padding: '60px 5% 50px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center', maxWidth: 1200, margin: '0 auto' }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#4ade80', textTransform: 'uppercase', letterSpacing: '3px', marginBottom: 16 }}>🌿 ESTRIE · QUÉBEC</div>
            <h1 style={{ fontSize: 'clamp(32px,4vw,54px)', fontWeight: 900, color: '#f5e6c8', lineHeight: 1.1, margin: '0 0 20px' }}>
              Le marché local<br />directement chez vous
            </h1>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.65)', lineHeight: 1.75, margin: '0 0 32px', maxWidth: 440 }}>
              Connectez-vous directement aux agriculteurs, fromagers et artisans de l'Estrie. Frais, local, sans intermédiaire.
            </p>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <button onClick={() => scroll('marche')} style={{ background: '#f5e6c8', color: '#1a3a15', border: 'none', padding: '14px 28px', borderRadius: 6, fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'system-ui' }}>
                Découvrir les produits →
              </button>
              <button onClick={() => window.location.href = '/carte'} style={{ background: 'transparent', color: '#f5e6c8', border: '2px solid rgba(245,230,200,0.4)', padding: '14px 28px', borderRadius: 6, fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'system-ui' }}>
                🗺️ Voir la carte
              </button>
            </div>
            <div style={{ display: 'flex', gap: 32, marginTop: 36, flexWrap: 'wrap' }}>
              {[['127', 'Producteurs'], ['2 400+', 'Clients'], ['8 km', 'Distance moy.']].map(([n, l]) => (
                <div key={l}>
                  <div style={{ fontSize: 26, fontWeight: 900, color: '#f5e6c8' }}>{n}</div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', fontFamily: 'system-ui' }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ borderRadius: 16, overflow: 'hidden', height: 380, boxShadow: '0 20px 60px rgba(0,0,0,0.4)' }}>
            <MapEstrie />
          </div>
        </div>
      </section>

      {/* SURPLUS */}
      <section style={{ background: '#c53030', padding: '16px 5%' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, overflowX: 'auto', maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ flexShrink: 0 }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: 'white', textTransform: 'uppercase', letterSpacing: '1px' }}>🔴 SURPLUS DU JOUR</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', fontFamily: 'system-ui' }}>Offres limitées</div>
          </div>
          {surplus.map(s => (
            <div key={s.nom} style={{ flexShrink: 0, background: 'rgba(255,255,255,0.15)', borderRadius: 10, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}
              onClick={() => scroll('marche')}>
              <img src={s.img} alt={s.nom} style={{ width: 44, height: 44, borderRadius: 8, objectFit: 'cover' }} onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none' }} />
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'white', fontFamily: 'system-ui' }}>{s.nom}</div>
                <div style={{ fontSize: 12, fontFamily: 'system-ui' }}>
                  <span style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'line-through', marginRight: 6 }}>{s.avant}</span>
                  <span style={{ color: '#fde047', fontWeight: 800 }}>{s.apres}</span>
                  <span style={{ background: '#fde047', color: '#7c2d12', fontSize: 10, fontWeight: 800, padding: '1px 6px', borderRadius: 10, marginLeft: 6 }}>-{s.pct}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PRODUCTEURS */}
      <section id="producteurs" style={{ padding: '72px 5%', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#2d5a27', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: 8 }}>NOS PRODUCTEURS</div>
            <h2 style={{ fontSize: 'clamp(26px,3vw,40px)', fontWeight: 900, color: '#1a3a15', margin: 0 }}>Des familles passionnées 👨‍🌾</h2>
          </div>
          <button onClick={() => window.location.href = '/producteurs'} style={{ background: 'transparent', color: '#1a3a15', border: '2px solid #1a3a15', padding: '10px 22px', borderRadius: 6, fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'system-ui' }}>
            Voir tous →
          </button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 24 }}>
          {producteurs.map(p => (
            <div key={p.id} style={{ background: 'white', borderRadius: 14, overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.07)', cursor: 'pointer' }}
              onClick={() => window.location.href = `/producteurs/${p.id}`}>
              <div style={{ height: 160, overflow: 'hidden', background: '#e8f5e8' }}>
                <img src={p.img} alt={p.nom} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none' }} />
              </div>
              <div style={{ padding: '16px 18px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <div style={{ fontSize: 15, fontWeight: 800, color: '#1a3a15' }}>{p.nom}</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#2d5a27' }}>⭐ {p.note}</div>
                </div>
                <div style={{ fontSize: 12, color: '#888', fontFamily: 'system-ui', marginBottom: 10 }}>{p.ville} · {p.km} km · {p.produits} produits</div>
                <div style={{ display: 'inline-block', background: '#f0faf0', color: '#2d5a27', fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 20, fontFamily: 'system-ui', marginBottom: 10 }}>{p.methode}</div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 14 }}>
                  {p.badges.map(b => <span key={b} style={{ background: '#f5f5f5', color: '#666', fontSize: 11, padding: '2px 8px', borderRadius: 20, fontFamily: 'system-ui' }}>{b}</span>)}
                </div>
                <button style={{ width: '100%', background: '#1a3a15', color: '#f5e6c8', border: 'none', padding: '9px', borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'system-ui' }}>
                  Voir les produits →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PANIER INTELLIGENT */}
      <section style={{ background: '#1a3a15', padding: '72px 5%' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#4ade80', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: 12 }}>PANIER INTELLIGENT</div>
            <h2 style={{ fontSize: 'clamp(26px,3vw,40px)', fontWeight: 900, color: '#f5e6c8', margin: '0 0 24px' }}>Votre épicerie locale,<br />livrée automatiquement</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              {[['1', 'Choisissez vos producteurs', 'Sélectionnez parmi 127 fermes locales certifiées'],
                ['2', 'Personnalisez votre panier', 'Légumes, fruits, fromages, viandes selon vos préférences'],
                ['3', 'Choisissez la livraison', 'Domicile, point de collecte ou marché public'],
                ['4', 'Recevez chaque semaine', 'Récolté le matin, livré le jour même']].map(([n, t, d]) => (
                <div key={n} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                  <div style={{ width: 34, height: 34, borderRadius: '50%', background: '#4ade80', color: '#1a3a15', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, fontWeight: 900, flexShrink: 0 }}>{n}</div>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: '#f5e6c8', marginBottom: 3 }}>{t}</div>
                    <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', fontFamily: 'system-ui' }}>{d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { id: 'solo', emoji: '🌱', titre: 'Solo', sous: '1–2 personnes', prix: '29$', unite: '/semaine', items: '4–6 produits', pop: false },
              { id: 'famille', emoji: '🧺', titre: 'Famille', sous: '3–5 personnes', prix: '54$', unite: '/semaine', items: '10–14 produits', pop: true },
              { id: 'institution', emoji: '🏫', titre: 'Institution', sous: '40–60 personnes', prix: '149$', unite: '/semaine', items: '40–60 produits', pop: false },
            ].map(plan => (
              <div key={plan.id} style={{ background: plan.pop ? '#f5e6c8' : 'rgba(255,255,255,0.08)', borderRadius: 14, padding: '20px 24px', border: plan.pop ? 'none' : '1px solid rgba(255,255,255,0.1)', position: 'relative' }}>
                {plan.pop && <div style={{ position: 'absolute', top: -10, right: 16, background: '#4ade80', color: '#1a3a15', fontSize: 11, fontWeight: 800, padding: '3px 12px', borderRadius: 20, fontFamily: 'system-ui' }}>⭐ POPULAIRE</div>}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 800, color: plan.pop ? '#1a3a15' : '#f5e6c8' }}>{plan.emoji} {plan.titre} <span style={{ fontSize: 13, fontWeight: 400, opacity: 0.6 }}>· {plan.sous}</span></div>
                    <div style={{ fontSize: 13, color: plan.pop ? '#555' : 'rgba(255,255,255,0.4)', fontFamily: 'system-ui', marginTop: 4 }}>{plan.items}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 22, fontWeight: 900, color: plan.pop ? '#1a3a15' : '#4ade80' }}>{plan.prix}<span style={{ fontSize: 13, fontWeight: 400, opacity: 0.6 }}>{plan.unite}</span></div>
                    <button onClick={() => window.location.href = '/panier'} style={{ background: plan.pop ? '#1a3a15' : 'rgba(255,255,255,0.15)', color: plan.pop ? '#f5e6c8' : 'white', border: 'none', padding: '7px 16px', borderRadius: 6, fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'system-ui', marginTop: 6 }}>
                      Commencer →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MARCHÉ */}
      <section id="marche" style={{ padding: '72px 5%', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 28 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#2d5a27', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: 8 }}>MARCHÉ EN LIGNE</div>
            <h2 style={{ fontSize: 'clamp(26px,3vw,40px)', fontWeight: 900, color: '#1a3a15', margin: 0 }}>Produits disponibles 🛒</h2>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8, marginBottom: 28, flexWrap: 'wrap' }}>
          {cats.map(c => (
            <button key={c} onClick={() => setCatActive(c)} style={{ background: catActive === c ? '#1a3a15' : '#f0f0f0', color: catActive === c ? '#f5e6c8' : '#555', border: 'none', padding: '8px 16px', borderRadius: 20, fontSize: 13, cursor: 'pointer', fontFamily: 'system-ui', fontWeight: catActive === c ? 700 : 400 }}>{c}</button>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 16 }}>
          {produitsFiltres.map(p => (
            <div key={p.nom} style={{ background: 'white', borderRadius: 12, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
              <div style={{ height: 130, overflow: 'hidden', background: '#e8f5e8' }}>
                <img src={p.img} alt={p.nom} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none' }} />
              </div>
              <div style={{ padding: '12px 14px' }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#1a3a15', marginBottom: 2 }}>{p.nom}</div>
                <div style={{ fontSize: 11, color: '#aaa', fontFamily: 'system-ui', marginBottom: 8 }}>{p.ferme}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 14, fontWeight: 800, color: '#2d5a27' }}>{p.prix}</span>
                  <button onClick={() => setPanier(prev => prev.includes(p.nom) ? prev : [...prev, p.nom])}
                    style={{ background: panier.includes(p.nom) ? '#dcfce7' : '#1a3a15', color: panier.includes(p.nom) ? '#166534' : '#f5e6c8', border: 'none', padding: '6px 10px', borderRadius: 6, fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'system-ui' }}>
                    {panier.includes(p.nom) ? '✓ Ajouté' : '+ Panier'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {panier.length > 0 && (
          <div style={{ position: 'fixed', bottom: 24, right: 24, background: '#1a3a15', color: '#f5e6c8', padding: '14px 24px', borderRadius: 12, boxShadow: '0 4px 20px rgba(0,0,0,0.3)', cursor: 'pointer', zIndex: 999, fontFamily: 'system-ui', fontWeight: 700 }}
            onClick={() => window.location.href = '/panier'}>
            🧺 {panier.length} article{panier.length > 1 ? 's' : ''} — Voir le panier →
          </div>
        )}
      </section>

      {/* INSTITUTIONS */}
      <section id="institutions" style={{ background: '#f0faf0', padding: '72px 5%' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#2d5a27', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: 12 }}>INSTITUTIONS & ENTREPRISES</div>
          <h2 style={{ fontSize: 'clamp(26px,3vw,40px)', fontWeight: 900, color: '#1a3a15', marginBottom: 12 }}>Approvisionnement local en gros 🏫</h2>
          <p style={{ fontSize: 16, color: '#666', fontFamily: 'system-ui', marginBottom: 40, maxWidth: 500, margin: '0 auto 40px' }}>Écoles, hôpitaux, restaurants, garderies — commandes hebdomadaires, livraison incluse.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 16, marginBottom: 40 }}>
            {[['🏫', 'Écoles'], ['🏥', 'Hôpitaux'], ['🍽️', 'Restaurants'], ['👶', 'Garderies'], ['🏢', 'Entreprises'], ['🏠', 'Résidences']].map(([e, l]) => (
              <div key={l} style={{ background: 'white', borderRadius: 12, padding: '24px 16px', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                <div style={{ fontSize: 32, marginBottom: 8 }}>{e}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#1a3a15' }}>{l}</div>
              </div>
            ))}
          </div>
          <button onClick={() => window.location.href = '/panier'} style={{ background: '#1a3a15', color: '#f5e6c8', border: 'none', padding: '16px 36px', borderRadius: 8, fontSize: 16, fontWeight: 700, cursor: 'pointer', fontFamily: 'system-ui' }}>
            Demander une soumission →
          </button>
        </div>
      </section>

      <Footer />
    </main>
  )
}
