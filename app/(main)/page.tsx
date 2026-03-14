'use client'
import { useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

const MapEstrie = dynamic(() => import('./carte/CarteLeafletFull'), { ssr: false })

const surplus = [
  { nom: 'Carottes bio', ferme: 'Ferme Tremblay', avant: '3,50$', apres: '1,75$', img: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=200&q=80' },
  { nom: 'Fromage cheddar', ferme: 'Fromagerie Lac-Brome', avant: '12,00$', apres: '7,00$', img: 'https://images.unsplash.com/photo-1552767059-ce182ead6c1b?w=200&q=80' },
  { nom: 'Pommes Cortland', ferme: 'Verger Beaumont', avant: '5,00$', apres: '2,50$', img: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=200&q=80' },
  { nom: 'Miel sauvage', ferme: 'Ruches des Cantons', avant: '18,00$', apres: '11,00$', img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=200&q=80' },
]

const producteurs = [
  { nom: 'Ferme Tremblay', type: 'Maraîchère bio', lieu: 'Compton', badges: ['Bio', 'Local'], img: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=200&q=80' },
  { nom: 'Fromagerie Lac-Brome', type: 'Fromagerie artisanale', lieu: 'Lac-Brome', badges: ['Artisan', 'Fromage'], img: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=200&q=80' },
  { nom: 'Verger Beaumont', type: 'Verger familial', lieu: 'Dunham', badges: ['Pommes', 'Cidrerie'], img: 'https://images.unsplash.com/photo-1474552226712-ac0f0961a954?w=200&q=80' },
  { nom: 'Boulangerie des Sommets', type: 'Artisanale au levain', lieu: 'Magog', badges: ['Levain', 'Sans additifs'], img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=200&q=80' },
]

const cats = ['Légumes', 'Fruits', 'Fromages', 'Viandes', 'Boulangerie', 'Miel & Confitures']

const produits = [
  { nom: 'Panier légumes semaine', ferme: 'Ferme Tremblay', prix: '32,00$', cat: 'Légumes', img: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=200&q=80' },
  { nom: 'Cheddar 2 ans', ferme: 'Fromagerie Lac-Brome', prix: '14,00$', cat: 'Fromages', img: 'https://images.unsplash.com/photo-1452195100486-9cc805987862?w=200&q=80' },
  { nom: 'Poulet entier fermier', ferme: 'Élevage Beaulieu', prix: '22,00$', cat: 'Viandes', img: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=200&q=80' },
  { nom: 'Pain au levain', ferme: 'Boulangerie des Sommets', prix: '7,50$', cat: 'Boulangerie', img: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=200&q=80' },
  { nom: 'Miel trèfle 500g', ferme: 'Ruches des Cantons', prix: '16,00$', cat: 'Miel & Confitures', img: 'https://images.unsplash.com/photo-1471943311424-646960669fbc?w=200&q=80' },
  { nom: 'Pommes Cortland 5lb', ferme: 'Verger Beaumont', prix: '8,00$', cat: 'Fruits', img: 'https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?w=200&q=80' },
]

export default function HomePage() {
  const [catActive, setCatActive] = useState('Légumes')
  const produitsFiltres = produits.filter(p => p.cat === catActive)

  return (
    <div style={{ fontFamily: 'Georgia, serif', background: '#faf9f5', minHeight: '100vh' }}>
      <Nav />

      {/* HERO */}
      <section style={{
        background: 'linear-gradient(135deg, #1a3a1f 0%, #2d5a34 60%, #4a8c55 100%)',
        color: 'white', padding: '60px 20px 40px', minHeight: '420px',
        display: 'flex', alignItems: 'center', gap: '40px',
        flexWrap: 'wrap', justifyContent: 'center'
      }}>
        <div style={{ maxWidth: '420px' }}>
          <p style={{ margin: '0 0 12px', fontSize: '13px', letterSpacing: '3px', color: '#7ec68a', fontFamily: 'system-ui' }}>
            🌿 ESTRIE · QUÉBEC
          </p>
          <h1 style={{ margin: '0 0 20px', fontSize: 'clamp(28px, 5vw, 44px)', lineHeight: 1.15, fontWeight: '700' }}>
            Le marché local<br />directement<br />chez vous
          </h1>
          <p style={{ margin: '0 0 32px', fontSize: '16px', color: '#c8e6c9', lineHeight: 1.6, fontFamily: 'system-ui' }}>
            Connectez-vous directement aux agriculteurs, fromagers et artisans de l'Estrie. Frais, local, sans intermédiaire.
          </p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link href="/marche" style={{
              background: '#d4882a', color: 'white', padding: '14px 28px',
              borderRadius: '8px', textDecoration: 'none', fontWeight: '600',
              fontSize: '15px', fontFamily: 'system-ui'
            }}>Découvrir les produits →</Link>
            <Link href="/carte" style={{
              background: 'rgba(255,255,255,0.12)', color: 'white', padding: '14px 28px',
              borderRadius: '8px', textDecoration: 'none', fontWeight: '600',
              fontSize: '15px', border: '1px solid rgba(255,255,255,0.3)', fontFamily: 'system-ui'
            }}>🗺 Voir la carte</Link>
          </div>
          <div style={{ display: 'flex', gap: '40px', marginTop: '40px' }}>
            {[['127', 'Producteurs'], ['2 400+', 'Clients'], ['8 km', 'Distance moy.']].map(([n, l]) => (
              <div key={l}>
                <div style={{ fontSize: '24px', fontWeight: '700' }}>{n}</div>
                <div style={{ fontSize: '12px', color: '#a5d6a7', fontFamily: 'system-ui' }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ width: '280px', height: '280px', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.3)', flexShrink: 0, position: 'relative' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10, background: 'rgba(26,58,31,0.85)', padding: '8px 12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '12px' }}>📍</span>
            <span style={{ fontSize: '12px', color: 'white', fontFamily: 'system-ui' }}>Radar alimentaire — Estrie</span>
            <span style={{ marginLeft: 'auto', fontSize: '11px', color: '#7ec68a', fontFamily: 'system-ui' }}>12 producteurs</span>
          </div>
          <MapEstrie />
        </div>
      </section>

      {/* SURPLUS */}
      <section style={{ padding: '48px 20px', background: '#fff8f0' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <div>
              <h2 style={{ margin: 0, fontSize: '24px', color: '#1a3a1f' }}>🔥 Surplus du jour</h2>
              <p style={{ margin: '4px 0 0', color: '#666', fontSize: '14px', fontFamily: 'system-ui' }}>Prix réduits — stocks limités</p>
            </div>
            <Link href="/marche" style={{ color: '#d4882a', textDecoration: 'none', fontSize: '14px', fontFamily: 'system-ui' }}>Voir tout →</Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))', gap: '16px' }}>
            {surplus.map(s => (
              <div key={s.nom} style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                <img src={s.img} alt={s.nom} style={{ width: '100%', height: '120px', objectFit: 'cover' }} />
                <div style={{ padding: '12px' }}>
                  <div style={{ fontWeight: '600', fontSize: '14px', marginBottom: '2px' }}>{s.nom}</div>
                  <div style={{ color: '#888', fontSize: '12px', fontFamily: 'system-ui', marginBottom: '8px' }}>{s.ferme}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ color: '#22c55e', fontWeight: '700', fontFamily: 'system-ui' }}>{s.apres}</span>
                    <span style={{ color: '#aaa', textDecoration: 'line-through', fontSize: '12px', fontFamily: 'system-ui' }}>{s.avant}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTEURS */}
      <section style={{ padding: '48px 20px', background: '#f5f0e8' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h2 style={{ margin: 0, fontSize: '24px', color: '#1a3a1f' }}>🌾 Nos producteurs</h2>
            <Link href="/producteurs" style={{ color: '#2d5a34', textDecoration: 'none', fontSize: '14px', fontFamily: 'system-ui' }}>Voir tous →</Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
            {producteurs.map(p => (
              <Link href="/producteurs" key={p.nom} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', cursor: 'pointer' }}>
                  <img src={p.img} alt={p.nom} style={{ width: '100%', height: '110px', objectFit: 'cover' }} />
                  <div style={{ padding: '12px' }}>
                    <div style={{ fontWeight: '600', fontSize: '14px' }}>{p.nom}</div>
                    <div style={{ color: '#666', fontSize: '12px', fontFamily: 'system-ui', margin: '2px 0 6px' }}>{p.type} · {p.lieu}</div>
                    <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                      {p.badges.map(b => (
                        <span key={b} style={{ background: '#f5f5f5', color: '#666', fontSize: 11, padding: '2px 8px', borderRadius: 20, fontFamily: 'system-ui' }}>{b}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* MARCHÉ */}
      <section style={{ padding: '48px 20px', background: 'white' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{ margin: '0 0 8px', fontSize: '24px', color: '#1a3a1f' }}>🛒 Marché en ligne</h2>
          <p style={{ margin: '0 0 20px', color: '#666', fontSize: '14px', fontFamily: 'system-ui' }}>Commandez directement aux producteurs</p>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
            {cats.map(c => (
              <button key={c} onClick={() => setCatActive(c)} style={{
                padding: '8px 16px', borderRadius: '20px', border: 'none', cursor: 'pointer',
                fontFamily: 'system-ui', fontSize: '13px',
                background: catActive === c ? '#2d5a34' : '#f0f0f0',
                color: catActive === c ? 'white' : '#444'
              }}>{c}</button>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '16px' }}>
            {(produitsFiltres.length > 0 ? produitsFiltres : produits).map(p => (
              <div key={p.nom} style={{ background: '#faf9f5', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                <img src={p.img} alt={p.nom} style={{ width: '100%', height: '120px', objectFit: 'cover' }} />
                <div style={{ padding: '12px' }}>
                  <div style={{ fontWeight: '600', fontSize: '14px', marginBottom: '2px' }}>{p.nom}</div>
                  <div style={{ color: '#888', fontSize: '12px', fontFamily: 'system-ui', marginBottom: '8px' }}>{p.ferme}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: '700', color: '#2d5a34', fontFamily: 'system-ui' }}>{p.prix}</span>
                    <button style={{ background: '#2d5a34', color: 'white', border: 'none', borderRadius: '6px', padding: '5px 10px', fontSize: '12px', cursor: 'pointer', fontFamily: 'system-ui' }}>+ Panier</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* B2B */}
      <section style={{ padding: '48px 20px', background: '#1a3a1f', color: 'white' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ margin: '0 0 12px', fontSize: '24px' }}>🏢 Pour les institutions et restaurants</h2>
          <p style={{ color: '#a5d6a7', fontFamily: 'system-ui', margin: '0 0 32px', fontSize: '15px' }}>
            Approvisionnement local en gros — écoles, hôpitaux, restaurants, épiceries
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {[['🏫', 'Écoles'], ['🏥', 'Hôpitaux'], ['🍽', 'Restaurants'], ['👶', 'Garderies'], ['🏢', 'Entreprises'], ['🏠', 'Résidences']].map(([e, l]) => (
              <div key={l} style={{ background: 'rgba(255,255,255,0.08)', borderRadius: '12px', padding: '20px 24px', textAlign: 'center', minWidth: '100px' }}>
                <div style={{ fontSize: '28px', marginBottom: '6px' }}>{e}</div>
                <div style={{ fontSize: '13px', fontFamily: 'system-ui', color: '#c8e6c9' }}>{l}</div>
              </div>
            ))}
          </div>
          <Link href="/marche" style={{
            display: 'inline-block', marginTop: '32px', background: '#d4882a',
            color: 'white', padding: '14px 32px', borderRadius: '8px',
            textDecoration: 'none', fontWeight: '600', fontFamily: 'system-ui', fontSize: '15px'
          }}>Demander un compte institution →</Link>
        </div>
      </section>

      {/* ABONNEMENT */}
      <section style={{ padding: '48px 20px', background: '#f5f0e8' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{ margin: '0 0 8px', fontSize: '24px', color: '#1a3a1f', textAlign: 'center' }}>📦 Abonnements paniers</h2>
          <p style={{ color: '#666', fontFamily: 'system-ui', textAlign: 'center', margin: '0 0 32px', fontSize: '14px' }}>Recevez chaque semaine</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
            {[
              ['4', 'Recevez chaque semaine', 'Récolté le matin, livré le jour même'],
              ['🥕', 'Légumes de saison', 'Sélection du producteur, 100% frais'],
              ['🚚', 'Livraison incluse', 'Points de collecte dans votre quartier'],
            ].map(([n, t, d]) => (
              <div key={t} style={{ background: 'white', borderRadius: '12px', padding: '24px', textAlign: 'center', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                <div style={{ fontSize: '32px', marginBottom: '12px' }}>{n}</div>
                <div style={{ fontWeight: '600', marginBottom: '6px', fontSize: '15px' }}>{t}</div>
                <div style={{ color: '#666', fontSize: '13px', fontFamily: 'system-ui' }}>{d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
