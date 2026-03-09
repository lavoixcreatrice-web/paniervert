'use client'
import { useState } from 'react'
import Nav from '../components/Nav'

const cartInitial = [
  { id: 1, nom: 'Carottes biologiques', ferme: 'Ferme Tremblay', prix: 3.50, unite: 'kg', qty: 2, img: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=120&h=120&fit=crop', badge: '🌿 Bio', km: 8 },
  { id: 2, nom: 'Fromage Le Victorin', ferme: 'Fromagerie Compton', prix: 12.00, unite: '200g', qty: 1, img: 'https://images.unsplash.com/photo-1452195100486-9cc805987862?w=120&h=120&fit=crop', badge: '✋ Artisanal', km: 22 },
  { id: 3, nom: 'Pain au levain', ferme: 'Boulangerie Altitude', prix: 7.50, unite: 'miche', qty: 1, img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=120&h=120&fit=crop', badge: '🍞 Cuit ce matin', km: 5 },
  { id: 4, nom: "Sirop d'érable ambré", ferme: 'Érablière Roy', prix: 18.00, unite: '500ml', qty: 1, img: 'https://images.unsplash.com/photo-1589496933738-f5e439be8f2a?w=120&h=120&fit=crop', badge: '🍁 Naturel', km: 19 },
]

const suggestions = [
  { id: 5, nom: 'Miel de trèfle', ferme: 'Rucher des Cantons', prix: 14.00, unite: '250g', img: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=120&h=120&fit=crop' },
  { id: 6, nom: 'Pommes Cortland', ferme: 'Verger Bolduc', prix: 2.50, unite: 'kg', img: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=120&h=120&fit=crop' },
  { id: 7, nom: 'Tomates cerises', ferme: 'Jardin Leblanc', prix: 4.00, unite: 'barquette', img: 'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=120&h=120&fit=crop' },
]

const pointsCollecte = [
  { id: 1, nom: 'Marché de Magog', adresse: '200 rue Principale, Magog', km: 3.2, jours: 'Mer & Sam · 9h–13h' },
  { id: 2, nom: 'Épicerie Compton', adresse: '18 rue Ball, Compton', km: 7.8, jours: 'Mar, Jeu & Sam · 8h–18h' },
  { id: 3, nom: 'Livraison à domicile', adresse: 'Votre adresse', km: 0, jours: 'Mer ou Ven · créneau au choix' },
]

export default function PanierPage() {
  const [items, setItems] = useState(cartInitial)
  const [livraison, setLivraison] = useState(1)
  const [ajouts, setAjouts] = useState<number[]>([])
  const [etape, setEtape] = useState<'panier' | 'livraison' | 'confirmation'>('panier')

  const updateQty = (id: number, delta: number) => {
    setItems(prev => prev
      .map(i => i.id === id ? { ...i, qty: Math.max(0, i.qty + delta) } : i)
      .filter(i => i.qty > 0)
    )
  }

  const sousTotal = items.reduce((acc, i) => acc + i.prix * i.qty, 0)
  const fraisLivraison = livraison === 2 ? 4.95 : 0
  const total = sousTotal + fraisLivraison

  if (etape === 'confirmation') {
    return (
      <main style={{ fontFamily: 'Georgia, serif', background: '#faf7f0', minHeight: '100vh' }}>
        <nav style={{ background: '#1a3a15', padding: '0 5%', height: 66, display: 'flex', alignItems: 'center' }}>
          <span style={{ fontSize: 26 }}>🌱</span>
          <span style={{ fontFamily: 'Georgia, serif', fontSize: 22, fontWeight: 700, color: '#f5e6c8', marginLeft: 10 }}>Panier Vert</span>
        </nav>
        <div style={{ maxWidth: 580, margin: '80px auto', textAlign: 'center', padding: '0 5%' }}>
          <div style={{ fontSize: 72, marginBottom: 24 }}>🎉</div>
          <h1 style={{ fontSize: 40, fontWeight: 900, color: '#1a3a15', marginBottom: 16 }}>Commande confirmée !</h1>
          <p style={{ fontSize: 18, color: '#666', fontFamily: 'system-ui', lineHeight: 1.75, marginBottom: 32 }}>
            Merci ! Les producteurs locaux ont été notifiés et préparent vos produits frais. Vous recevrez une confirmation par courriel.
          </p>
          <div style={{ background: 'white', borderRadius: 16, padding: 32, boxShadow: '0 2px 16px rgba(0,0,0,0.08)', marginBottom: 32, textAlign: 'left' }}>
            <div style={{ fontSize: 16, fontFamily: 'system-ui', fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 16 }}>Résumé</div>
            {items.map(i => (
              <div key={i.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #f5f5f5', fontSize: 16, fontFamily: 'system-ui', color: '#444' }}>
                <span>{i.nom} × {i.qty}</span>
                <span style={{ fontWeight: 700 }}>{(i.prix * i.qty).toFixed(2)}$</span>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '18px 0 0', fontSize: 22, fontWeight: 900, color: '#1a3a15' }}>
              <span>Total</span>
              <span>{total.toFixed(2)}$</span>
            </div>
          </div>
          <button onClick={() => { setEtape('panier'); setItems(cartInitial) }}
            style={{ background: '#1a3a15', color: '#f5e6c8', border: 'none', padding: '16px 36px', borderRadius: 8, fontSize: 17, fontWeight: 700, cursor: 'pointer', fontFamily: 'system-ui' }}>
            ← Retour au marché
          </button>
        </div>
      </main>
    )
  }

  return (
    <main style={{ fontFamily: 'Georgia, serif', background: '#faf7f0', minHeight: '100vh' }}>

      <Nav page="panier" />

      {/* ÉTAPES */}
      <div style={{ background: 'white', borderBottom: '1px solid #eee', padding: '18px 5%' }}>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', fontFamily: 'system-ui', fontSize: 16 }}>
          {[['panier', '🧺 Panier'], ['livraison', '🚚 Livraison'], ['confirmation', '✅ Confirmation']].map(([id, label], i) => (
            <div key={id} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ color: etape === id ? '#1a3a15' : '#bbb', fontWeight: etape === id ? 800 : 400 }}>{label}</span>
              {i < 2 && <span style={{ color: '#ddd' }}>→</span>}
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: '40px 5%', display: 'grid', gridTemplateColumns: '1fr 380px', gap: 32, alignItems: 'start', maxWidth: 1200, margin: '0 auto' }}>

        {/* COLONNE GAUCHE */}
        <div>
          {etape === 'panier' && (
            <>
              <h1 style={{ fontSize: 36, fontWeight: 900, color: '#1a3a15', marginBottom: 28 }}>🧺 Votre panier ({items.length} produits)</h1>

              <div style={{ background: 'white', borderRadius: 16, boxShadow: '0 2px 12px rgba(0,0,0,0.06)', overflow: 'hidden', marginBottom: 28 }}>
                {items.map((item, idx) => (
                  <div key={item.id} style={{ display: 'flex', gap: 18, padding: '22px 28px', borderBottom: idx < items.length - 1 ? '1px solid #f5f5f5' : 'none', alignItems: 'center' }}>
                    <img src={item.img} alt={item.nom} style={{ width: 90, height: 90, objectFit: 'cover', borderRadius: 12, flexShrink: 0 }}
                      onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none' }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 18, fontWeight: 700, color: '#1a3a15', marginBottom: 4 }}>{item.nom}</div>
                      <div style={{ fontSize: 14, color: '#999', fontFamily: 'system-ui', marginBottom: 8 }}>🌿 {item.ferme} · 📍 {item.km} km</div>
                      <span style={{ background: '#f0faf0', color: '#2d5a27', fontSize: 13, fontFamily: 'system-ui', fontWeight: 600, padding: '3px 10px', borderRadius: 20 }}>{item.badge}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#f5f5f5', borderRadius: 10, padding: '8px 6px' }}>
                        <button onClick={() => updateQty(item.id, -1)} style={{ width: 34, height: 34, border: 'none', background: 'white', borderRadius: 7, cursor: 'pointer', fontSize: 18, fontWeight: 700, color: '#1a3a15', boxShadow: '0 1px 4px rgba(0,0,0,0.1)' }}>−</button>
                        <span style={{ fontSize: 18, fontWeight: 800, color: '#1a3a15', minWidth: 24, textAlign: 'center', fontFamily: 'system-ui' }}>{item.qty}</span>
                        <button onClick={() => updateQty(item.id, 1)} style={{ width: 34, height: 34, border: 'none', background: 'white', borderRadius: 7, cursor: 'pointer', fontSize: 18, fontWeight: 700, color: '#1a3a15', boxShadow: '0 1px 4px rgba(0,0,0,0.1)' }}>+</button>
                      </div>
                      <div style={{ textAlign: 'right', minWidth: 80 }}>
                        <div style={{ fontSize: 20, fontWeight: 800, color: '#1a3a15', fontFamily: 'system-ui' }}>{(item.prix * item.qty).toFixed(2)}$</div>
                        <div style={{ fontSize: 13, color: '#bbb', fontFamily: 'system-ui' }}>{item.prix.toFixed(2)}$/{item.unite}</div>
                      </div>
                      <button onClick={() => updateQty(item.id, -item.qty)} style={{ color: '#ccc', background: 'none', border: 'none', cursor: 'pointer', fontSize: 20 }}>✕</button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Suggestions */}
              <div style={{ marginBottom: 28 }}>
                <div style={{ fontSize: 17, fontFamily: 'system-ui', fontWeight: 700, color: '#555', marginBottom: 16 }}>💡 On vous suggère aussi</div>
                <div style={{ display: 'flex', gap: 16 }}>
                  {suggestions.map(s => (
                    <div key={s.id} style={{ background: 'white', borderRadius: 14, overflow: 'hidden', border: '1px solid #eee', flex: 1 }}>
                      <img src={s.img} alt={s.nom} style={{ width: '100%', height: 90, objectFit: 'cover', display: 'block' }}
                        onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none' }} />
                      <div style={{ padding: '12px 14px' }}>
                        <div style={{ fontSize: 15, fontWeight: 700, color: '#1a3a15', marginBottom: 2 }}>{s.nom}</div>
                        <div style={{ fontSize: 13, color: '#999', fontFamily: 'system-ui', marginBottom: 10 }}>{s.ferme}</div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: 16, fontWeight: 800, color: '#1a3a15', fontFamily: 'system-ui' }}>{s.prix.toFixed(2)}$</span>
                          <button onClick={() => setAjouts(p => [...p, s.id])}
                            style={{ background: ajouts.includes(s.id) ? '#2d5a27' : '#1a3a15', color: 'white', border: 'none', padding: '7px 14px', borderRadius: 7, fontSize: 13, cursor: 'pointer', fontFamily: 'system-ui', fontWeight: 600 }}>
                            {ajouts.includes(s.id) ? '✓ Ajouté' : '+ Ajouter'}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button onClick={() => setEtape('livraison')}
                style={{ background: '#1a3a15', color: '#f5e6c8', border: 'none', padding: '18px 32px', borderRadius: 10, fontSize: 18, fontWeight: 700, cursor: 'pointer', fontFamily: 'system-ui', width: '100%' }}>
                Choisir la livraison →
              </button>
            </>
          )}

          {etape === 'livraison' && (
            <>
              <h1 style={{ fontSize: 36, fontWeight: 900, color: '#1a3a15', marginBottom: 8 }}>🚚 Livraison ou collecte</h1>
              <p style={{ fontSize: 17, color: '#666', fontFamily: 'system-ui', marginBottom: 28 }}>Choisissez comment recevoir vos produits frais</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 36 }}>
                {pointsCollecte.map((pt, i) => (
                  <div key={pt.id} onClick={() => setLivraison(i)}
                    style={{ background: 'white', border: `2px solid ${livraison === i ? '#1a3a15' : '#eee'}`, borderRadius: 16, padding: '22px 28px', cursor: 'pointer', display: 'flex', gap: 18, alignItems: 'center' }}>
                    <div style={{ width: 54, height: 54, borderRadius: '50%', background: livraison === i ? '#1a3a15' : '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, flexShrink: 0 }}>
                      {i === 2 ? '🏠' : '📦'}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 18, fontWeight: 700, color: '#1a3a15', marginBottom: 4 }}>{pt.nom}</div>
                      <div style={{ fontSize: 15, color: '#888', fontFamily: 'system-ui', marginBottom: 4 }}>{pt.adresse}</div>
                      <div style={{ fontSize: 14, color: '#2d5a27', fontFamily: 'system-ui', fontWeight: 600 }}>📅 {pt.jours}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      {i === 2
                        ? <span style={{ fontSize: 16, fontFamily: 'system-ui', color: '#888' }}>+4,95$</span>
                        : <span style={{ fontSize: 16, fontFamily: 'system-ui', color: '#2d5a27', fontWeight: 700 }}>Gratuit</span>
                      }
                      {pt.km > 0 && <div style={{ fontSize: 13, color: '#bbb', fontFamily: 'system-ui' }}>{pt.km} km</div>}
                    </div>
                    <div style={{ width: 24, height: 24, borderRadius: '50%', border: `2px solid ${livraison === i ? '#1a3a15' : '#ddd'}`, background: livraison === i ? '#1a3a15' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      {livraison === i && <div style={{ width: 9, height: 9, borderRadius: '50%', background: 'white' }} />}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: 14 }}>
                <button onClick={() => setEtape('panier')} style={{ background: 'white', color: '#1a3a15', border: '2px solid #1a3a15', padding: '16px 26px', borderRadius: 10, fontSize: 17, fontWeight: 700, cursor: 'pointer', fontFamily: 'system-ui' }}>← Retour</button>
                <button onClick={() => setEtape('confirmation')} style={{ flex: 1, background: '#1a3a15', color: '#f5e6c8', border: 'none', padding: '16px 32px', borderRadius: 10, fontSize: 18, fontWeight: 700, cursor: 'pointer', fontFamily: 'system-ui' }}>
                  Confirmer la commande ✓
                </button>
              </div>
            </>
          )}
        </div>

        {/* RÉSUMÉ — droite */}
        <div style={{ background: 'white', borderRadius: 16, boxShadow: '0 2px 16px rgba(0,0,0,0.08)', padding: '30px', position: 'sticky', top: 90 }}>
          <div style={{ fontSize: 18, fontWeight: 800, color: '#1a3a15', marginBottom: 22 }}>Résumé de commande</div>

          {items.map(i => (
            <div key={i.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, fontSize: 15, fontFamily: 'system-ui', color: '#555' }}>
              <span>{i.nom} <span style={{ color: '#bbb' }}>×{i.qty}</span></span>
              <span style={{ fontWeight: 600 }}>{(i.prix * i.qty).toFixed(2)}$</span>
            </div>
          ))}

          <div style={{ borderTop: '1px solid #f0f0f0', margin: '18px 0', paddingTop: 18 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 15, fontFamily: 'system-ui', color: '#888', marginBottom: 10 }}>
              <span>Sous-total</span><span>{sousTotal.toFixed(2)}$</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 15, fontFamily: 'system-ui', color: '#888', marginBottom: 10 }}>
              <span>Livraison</span>
              <span style={{ color: fraisLivraison === 0 ? '#2d5a27' : '#555', fontWeight: fraisLivraison === 0 ? 700 : 400 }}>
                {fraisLivraison === 0 ? 'Gratuit' : `${fraisLivraison.toFixed(2)}$`}
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 22, fontWeight: 900, color: '#1a3a15', marginBottom: 22 }}>
            <span>Total</span><span>{total.toFixed(2)}$</span>
          </div>

          <div style={{ background: '#f0faf0', borderRadius: 12, padding: 16, marginBottom: 18 }}>
            <div style={{ fontSize: 14, fontFamily: 'system-ui', fontWeight: 700, color: '#2d5a27', marginBottom: 10 }}>🌱 Impact local de votre commande</div>
            <div style={{ fontSize: 14, fontFamily: 'system-ui', color: '#555', lineHeight: 1.8 }}>
              • {items.length} producteurs locaux soutenus<br />
              • Distance moy. : {Math.round(items.reduce((a, i) => a + i.km, 0) / items.length)} km<br />
              • CO₂ économisé vs grande surface : ~2,4 kg
            </div>
          </div>

          <div style={{ fontSize: 13, color: '#aaa', fontFamily: 'system-ui', textAlign: 'center' }}>
            🔒 Paiement sécurisé · Produits frais garantis
          </div>
        </div>

      </div>
    </main>
  )
}
