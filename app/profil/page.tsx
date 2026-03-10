'use client'
import { useState } from 'react'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import Link from 'next/link'

type Onglet = 'apercu' | 'commandes' | 'abonnements' | 'favoris' | 'parametres'

const commandes = [
  {
    id: 'CMD-2024-001', date: '8 mars 2026', statut: 'Livré', total: 34.50,
    point: 'Café Rioux, Magog', items: [
      { nom: 'Carottes bio', qty: 2, prix: 1.75, emoji: '🥕' },
      { nom: 'Pain au levain', qty: 1, prix: 7.50, emoji: '🍞' },
      { nom: 'Miel sauvage', qty: 1, prix: 8.00, emoji: '🍯' },
    ]
  },
  {
    id: 'CMD-2024-002', date: '5 mars 2026', statut: 'En route', total: 28.00,
    point: 'Boulangerie Altitude, Magog', items: [
      { nom: 'Fromage Compton', qty: 1, prix: 14.00, emoji: '🧀' },
      { nom: 'Œufs fermiers', qty: 1, prix: 6.00, emoji: '🥚' },
      { nom: 'Sirop d\'érable', qty: 0.5, prix: 9.00, emoji: '🍁' },
    ]
  },
  {
    id: 'CMD-2024-003', date: '1 mars 2026', statut: 'Confirmé', total: 19.75,
    point: 'Épicerie La Ferm\'ette, Compton', items: [
      { nom: 'Laitue Boston', qty: 3, prix: 1.25, emoji: '🥬' },
      { nom: 'Tomates cerises', qty: 2, prix: 5.00, emoji: '🍅' },
    ]
  },
]

const favoris = [
  { id: 1, nom: 'Carottes bio', producteur: 'Ferme Tremblay', prix: 1.75, emoji: '🥕', image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=200&q=80' },
  { id: 3, nom: 'Sirop d\'érable pur', producteur: 'Érablière Roy', prix: 18.00, emoji: '🍁', image: 'https://images.unsplash.com/photo-1589375669802-9e9ff42b78bf?w=200&q=80' },
  { id: 6, nom: 'Pain au levain', producteur: 'Boulangerie Altitude', prix: 7.50, emoji: '🍞', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=200&q=80' },
  { id: 5, nom: 'Miel sauvage', producteur: 'Rucher des Cantons', prix: 8.00, emoji: '🍯', image: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=200&q=80' },
]

const statuts: Record<string, { color: string; bg: string; icon: string }> = {
  'Livré': { color: '#166534', bg: '#e8f5e9', icon: '✓' },
  'En route': { color: '#92400e', bg: '#fef3c7', icon: '🚚' },
  'Confirmé': { color: '#1e40af', bg: '#dbeafe', icon: '📋' },
}

export default function ProfilPage() {
  const [onglet, setOnglet] = useState<Onglet>('apercu')
  const [commandeOuverte, setCommandeOuverte] = useState<string | null>(null)
  const [nom, setNom] = useState('Marie-Ève Simard')
  const [email, setEmail] = useState('marieeve@exemple.com')
  const [telephone, setTelephone] = useState('(819) 555-1234')
  const [ville, setVille] = useState('Compton')
  const [modifié, setModifié] = useState(false)

  const onglets: { id: Onglet; label: string; emoji: string }[] = [
    { id: 'apercu', label: 'Aperçu', emoji: '👤' },
    { id: 'commandes', label: 'Commandes', emoji: '📦' },
    { id: 'abonnements', label: 'Abonnements', emoji: '🔄' },
    { id: 'favoris', label: 'Favoris', emoji: '❤️' },
    { id: 'parametres', label: 'Paramètres', emoji: '⚙️' },
  ]

  const inputStyle = {
    width: '100%', padding: '11px 14px', borderRadius: 10,
    border: '2px solid #e8e0d0', background: 'white',
    fontFamily: 'system-ui', fontSize: 14, color: '#1a1a1a',
    outline: 'none', boxSizing: 'border-box' as const
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f5f0e8', fontFamily: 'Georgia, serif' }}>
      <Nav page="profil" />

      {/* Bannière profil */}
      <div style={{ background: '#1a3a15', padding: '36px 24px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
          <div style={{
            width: 72, height: 72, borderRadius: '50%',
            background: '#f5e6c8', display: 'flex', alignItems: 'center',
            justifyContent: 'center', fontSize: 32, flexShrink: 0
          }}>
            🧺
          </div>
          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: 22, fontWeight: 700, color: '#f5e6c8', marginBottom: 4 }}>{nom}</h1>
            <p style={{ fontFamily: 'system-ui', fontSize: 13, color: 'rgba(245,230,200,0.65)' }}>
              📍 {ville} · Membre depuis mars 2026 · {commandes.length} commandes
            </p>
          </div>
          <Link href="/marche" style={{
            background: '#f5e6c8', color: '#1a3a15',
            padding: '10px 20px', borderRadius: 10,
            textDecoration: 'none', fontFamily: 'system-ui',
            fontWeight: 700, fontSize: 14
          }}>
            🛒 Commander
          </Link>
        </div>

        {/* Onglets */}
        <div style={{ maxWidth: 1100, margin: '20px auto 0', display: 'flex', gap: 4, overflowX: 'auto' }}>
          {onglets.map(o => (
            <button key={o.id} onClick={() => setOnglet(o.id)} style={{
              padding: '10px 16px', border: 'none', cursor: 'pointer',
              background: 'transparent', whiteSpace: 'nowrap',
              fontFamily: 'system-ui', fontSize: 13, fontWeight: onglet === o.id ? 700 : 400,
              color: onglet === o.id ? '#f5e6c8' : 'rgba(245,230,200,0.55)',
              borderBottom: onglet === o.id ? '3px solid #f5e6c8' : '3px solid transparent'
            }}>
              {o.emoji} {o.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '28px 24px 60px' }}>

        {/* ====== APERÇU ====== */}
        {onglet === 'apercu' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
            {/* Stats */}
            {[
              { val: commandes.length, label: 'Commandes totales', emoji: '📦', color: '#1a3a15' },
              { val: `${commandes.reduce((a, c) => a + c.total, 0).toFixed(0)}$`, label: 'Total dépensé', emoji: '💰', color: '#166534' },
              { val: favoris.length, label: 'Produits favoris', emoji: '❤️', color: '#dc2626' },
              { val: '1', label: 'Abonnement actif', emoji: '🔄', color: '#1e40af' },
            ].map(s => (
              <div key={s.label} style={{ background: 'white', borderRadius: 16, padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{s.emoji}</div>
                <div style={{ fontSize: 28, fontWeight: 700, color: s.color, fontFamily: 'system-ui' }}>{s.val}</div>
                <div style={{ fontSize: 13, color: '#888', fontFamily: 'system-ui' }}>{s.label}</div>
              </div>
            ))}

            {/* Dernière commande */}
            <div style={{ background: 'white', borderRadius: 16, padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', gridColumn: 'span 2' }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, color: '#1a1a1a' }}>Dernière commande</h3>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
                <div>
                  <p style={{ fontFamily: 'system-ui', fontWeight: 700, color: '#1a1a1a', marginBottom: 4 }}>{commandes[0].id}</p>
                  <p style={{ fontFamily: 'system-ui', fontSize: 13, color: '#888' }}>{commandes[0].date} · {commandes[0].point}</p>
                  <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
                    {commandes[0].items.map(i => <span key={i.nom} style={{ fontSize: 20 }}>{i.emoji}</span>)}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{
                    ...statuts[commandes[0].statut],
                    padding: '4px 12px', borderRadius: 20,
                    fontSize: 13, fontWeight: 700, fontFamily: 'system-ui'
                  }}>
                    {statuts[commandes[0].statut].icon} {commandes[0].statut}
                  </span>
                  <p style={{ fontFamily: 'system-ui', fontWeight: 700, fontSize: 18, color: '#1a3a15', marginTop: 8 }}>
                    {commandes[0].total.toFixed(2)}$
                  </p>
                </div>
              </div>
            </div>

            {/* Point de collecte favori */}
            <div style={{ background: 'white', borderRadius: 16, padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 12, color: '#1a1a1a' }}>Point de collecte habituel</h3>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <span style={{ fontSize: 32 }}>☕</span>
                <div>
                  <p style={{ fontFamily: 'system-ui', fontWeight: 700, color: '#1a1a1a', fontSize: 14 }}>Café Rioux</p>
                  <p style={{ fontFamily: 'system-ui', fontSize: 12, color: '#888' }}>Magog · Mardi & Vendredi</p>
                </div>
              </div>
              <Link href="/collecte" style={{
                display: 'block', marginTop: 14, textAlign: 'center',
                background: '#f5f0e8', color: '#1a3a15', padding: '8px',
                borderRadius: 8, textDecoration: 'none', fontFamily: 'system-ui',
                fontSize: 13, fontWeight: 600
              }}>Changer →</Link>
            </div>
          </div>
        )}

        {/* ====== COMMANDES ====== */}
        {onglet === 'commandes' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: '#1a1a1a', marginBottom: 4 }}>Mes commandes</h2>
            {commandes.map(cmd => (
              <div key={cmd.id} style={{ background: 'white', borderRadius: 16, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                <div
                  onClick={() => setCommandeOuverte(commandeOuverte === cmd.id ? null : cmd.id)}
                  style={{ padding: '18px 20px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}
                >
                  <div>
                    <p style={{ fontFamily: 'system-ui', fontWeight: 700, color: '#1a1a1a', marginBottom: 4 }}>{cmd.id}</p>
                    <p style={{ fontFamily: 'system-ui', fontSize: 13, color: '#888' }}>{cmd.date} · 📍 {cmd.point}</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{
                      background: statuts[cmd.statut].bg,
                      color: statuts[cmd.statut].color,
                      padding: '4px 12px', borderRadius: 20,
                      fontSize: 12, fontWeight: 700, fontFamily: 'system-ui'
                    }}>
                      {statuts[cmd.statut].icon} {cmd.statut}
                    </span>
                    <span style={{ fontFamily: 'system-ui', fontWeight: 700, fontSize: 16, color: '#1a3a15' }}>{cmd.total.toFixed(2)}$</span>
                    <span style={{ color: '#888', fontSize: 18 }}>{commandeOuverte === cmd.id ? '▲' : '▼'}</span>
                  </div>
                </div>

                {commandeOuverte === cmd.id && (
                  <div style={{ borderTop: '1px solid #f0ebe0', padding: '16px 20px' }}>
                    {cmd.items.map(item => (
                      <div key={item.nom} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f5f0e8' }}>
                        <span style={{ fontFamily: 'system-ui', fontSize: 14, color: '#444' }}>{item.emoji} {item.nom}</span>
                        <span style={{ fontFamily: 'system-ui', fontSize: 14, color: '#888' }}>× {item.qty} · {item.prix.toFixed(2)}$</span>
                      </div>
                    ))}
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 12, gap: 10 }}>
                      <button style={{
                        background: '#f5f0e8', color: '#1a3a15', border: 'none',
                        padding: '8px 16px', borderRadius: 8, cursor: 'pointer',
                        fontFamily: 'system-ui', fontSize: 13, fontWeight: 600
                      }}>
                        🔄 Commander à nouveau
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ====== ABONNEMENTS ====== */}
        {onglet === 'abonnements' && (
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: '#1a1a1a', marginBottom: 20 }}>Mes abonnements</h2>
            <div style={{ background: 'white', borderRadius: 16, padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', marginBottom: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
                <div>
                  <span style={{ background: '#e8f5e9', color: '#166534', padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 700, fontFamily: 'system-ui' }}>● Actif</span>
                  <h3 style={{ fontSize: 18, fontWeight: 700, marginTop: 10, marginBottom: 4 }}>🧺 Panier Famille</h3>
                  <p style={{ fontFamily: 'system-ui', fontSize: 13, color: '#888' }}>Livraison chaque vendredi · Café Rioux, Magog</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontFamily: 'system-ui', fontWeight: 700, fontSize: 22, color: '#1a3a15' }}>54$/sem</p>
                  <p style={{ fontFamily: 'system-ui', fontSize: 12, color: '#888' }}>Prochain: 14 mars</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
                <button style={{
                  background: '#1a3a15', color: '#f5e6c8', border: 'none',
                  padding: '10px 18px', borderRadius: 8, cursor: 'pointer',
                  fontFamily: 'system-ui', fontSize: 13, fontWeight: 600
                }}>Gérer l'abonnement</button>
                <button style={{
                  background: 'white', color: '#dc2626', border: '2px solid #dc2626',
                  padding: '10px 18px', borderRadius: 8, cursor: 'pointer',
                  fontFamily: 'system-ui', fontSize: 13, fontWeight: 600
                }}>Mettre en pause</button>
              </div>
            </div>
            <div style={{ background: '#f5f0e8', borderRadius: 16, padding: '20px', border: '2px dashed #d4c9b5', textAlign: 'center' }}>
              <p style={{ fontFamily: 'system-ui', color: '#888', marginBottom: 12 }}>Ajouter un autre abonnement</p>
              <Link href="/panier" style={{
                background: '#1a3a15', color: '#f5e6c8', padding: '10px 20px',
                borderRadius: 10, textDecoration: 'none', fontFamily: 'system-ui', fontSize: 14, fontWeight: 600
              }}>
                Voir les paniers →
              </Link>
            </div>
          </div>
        )}

        {/* ====== FAVORIS ====== */}
        {onglet === 'favoris' && (
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: '#1a1a1a', marginBottom: 20 }}>Mes favoris</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>
              {favoris.map(f => (
                <div key={f.id} style={{ background: 'white', borderRadius: 14, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                  <div style={{ position: 'relative' }}>
                    <img src={f.image} alt={f.nom} style={{ width: '100%', height: 130, objectFit: 'cover' }} />
                    <button style={{
                      position: 'absolute', top: 8, right: 8,
                      background: 'white', border: 'none', borderRadius: '50%',
                      width: 32, height: 32, cursor: 'pointer', fontSize: 16
                    }}>❤️</button>
                  </div>
                  <div style={{ padding: '12px' }}>
                    <p style={{ fontSize: 13, color: '#888', fontFamily: 'system-ui', marginBottom: 2 }}>{f.producteur}</p>
                    <p style={{ fontWeight: 700, color: '#1a1a1a', fontSize: 14, marginBottom: 8 }}>{f.nom}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontFamily: 'system-ui', fontWeight: 700, color: '#1a3a15' }}>{f.prix.toFixed(2)}$</span>
                      <button style={{
                        background: '#1a3a15', color: '#f5e6c8', border: 'none',
                        padding: '6px 12px', borderRadius: 8, cursor: 'pointer',
                        fontFamily: 'system-ui', fontSize: 12
                      }}>+ Panier</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ====== PARAMÈTRES ====== */}
        {onglet === 'parametres' && (
          <div style={{ maxWidth: 560 }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: '#1a1a1a', marginBottom: 20 }}>Paramètres du compte</h2>
            <div style={{ background: 'white', borderRadius: 16, padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', marginBottom: 20 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 18, color: '#1a1a1a' }}>Informations personnelles</h3>
              <div style={{ display: 'grid', gap: 14 }}>
                {[
                  { label: 'Nom complet', val: nom, set: setNom },
                  { label: 'Courriel', val: email, set: setEmail },
                  { label: 'Téléphone', val: telephone, set: setTelephone },
                  { label: 'Ville', val: ville, set: setVille },
                ].map(f => (
                  <div key={f.label}>
                    <label style={{ display: 'block', fontFamily: 'system-ui', fontSize: 12, fontWeight: 600, color: '#888', marginBottom: 5, textTransform: 'uppercase', letterSpacing: 0.5 }}>{f.label}</label>
                    <input value={f.val} onChange={e => { f.set(e.target.value); setModifié(true) }} style={inputStyle}
                      onFocus={e => (e.target.style.borderColor = '#1a3a15')}
                      onBlur={e => (e.target.style.borderColor = '#e8e0d0')} />
                  </div>
                ))}
              </div>
              {modifié && (
                <button onClick={() => setModifié(false)} style={{
                  marginTop: 16, background: '#1a3a15', color: '#f5e6c8', border: 'none',
                  padding: '12px 24px', borderRadius: 10, cursor: 'pointer',
                  fontFamily: 'system-ui', fontSize: 14, fontWeight: 700
                }}>
                  ✓ Sauvegarder les modifications
                </button>
              )}
            </div>

            <div style={{ background: 'white', borderRadius: 16, padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, color: '#1a1a1a' }}>Notifications</h3>
              {[
                { label: 'Nouvelles commandes', on: true },
                { label: 'Surplus du jour', on: true },
                { label: 'Infolettre hebdomadaire', on: false },
                { label: 'Rappels de collecte', on: true },
              ].map(n => (
                <div key={n.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #f5f0e8' }}>
                  <span style={{ fontFamily: 'system-ui', fontSize: 14, color: '#444' }}>{n.label}</span>
                  <div style={{
                    width: 44, height: 24, borderRadius: 12, cursor: 'pointer',
                    background: n.on ? '#1a3a15' : '#e8e0d0',
                    position: 'relative', transition: 'background 0.2s'
                  }}>
                    <div style={{
                      position: 'absolute', top: 3, left: n.on ? 22 : 3,
                      width: 18, height: 18, borderRadius: '50%', background: 'white',
                      transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
                    }} />
                  </div>
                </div>
              ))}
            </div>

            <button style={{
              marginTop: 20, background: 'white', color: '#dc2626',
              border: '2px solid #dc2626', padding: '12px 20px',
              borderRadius: 10, cursor: 'pointer', fontFamily: 'system-ui',
              fontSize: 14, fontWeight: 600, width: '100%'
            }}>
              Se déconnecter
            </button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
