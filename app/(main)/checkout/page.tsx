'use client'
import { useState } from 'react'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import Link from 'next/link'

type Etape = 1 | 2 | 3

const itemsParier = [
  { id: 1, nom: 'Carottes bio', producteur: 'Ferme Tremblay', prix: 1.75, qty: 2, emoji: '🥕', image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=100&q=80' },
  { id: 6, nom: 'Pain au levain', producteur: 'Boulangerie Altitude', prix: 7.50, qty: 1, emoji: '🍞', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=100&q=80' },
  { id: 5, nom: 'Miel sauvage', producteur: 'Rucher des Cantons', prix: 8.00, qty: 1, emoji: '🍯', image: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=100&q=80' },
  { id: 2, nom: 'Fromage Compton', producteur: 'Fromagerie Compton', prix: 14.00, qty: 1, emoji: '🧀', image: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=100&q=80' },
]

const pointsCollecte = [
  { id: 1, nom: 'Café Rioux', ville: 'Magog', emoji: '☕', jours: 'Mardi & Vendredi' },
  { id: 2, nom: 'Boulangerie Altitude', ville: 'Magog', emoji: '🍞', jours: 'Lun, Mer, Ven' },
  { id: 3, nom: 'Épicerie La Ferm\'ette', ville: 'Compton', emoji: '🛒', jours: 'Mercredi & Samedi' },
  { id: 8, nom: 'Marché Public de Sherbrooke', ville: 'Sherbrooke', emoji: '🏪', jours: 'Mercredi & Samedi' },
]

export default function CheckoutPage() {
  const [etape, setEtape] = useState<Etape>(1)
  const [modeLivraison, setModeLivraison] = useState<'collecte' | 'livraison'>('collecte')
  const [pointChoisi, setPointChoisi] = useState(1)
  const [adresse, setAdresse] = useState('')
  const [ville, setVille] = useState('')
  const [codePostal, setCodePostal] = useState('')
  const [numeroCarte, setNumCarte] = useState('')
  const [expiration, setExpiration] = useState('')
  const [cvv, setCvv] = useState('')
  const [nomCarte, setNomCarte] = useState('')
  const [succes, setSucces] = useState(false)
  const [traitement, setTraitement] = useState(false)

  const sousTotal = itemsParier.reduce((a, i) => a + i.prix * i.qty, 0)
  const fraisLivraison = modeLivraison === 'livraison' ? 8.50 : 0
  const taxes = sousTotal * 0.14975
  const total = sousTotal + fraisLivraison + taxes

  const inputStyle = {
    width: '100%', padding: '12px 14px', borderRadius: 10,
    border: '2px solid #e8e0d0', background: 'white',
    fontFamily: 'system-ui', fontSize: 14, color: '#1a1a1a',
    outline: 'none', boxSizing: 'border-box' as const
  }

  const labelStyle = {
    display: 'block', fontFamily: 'system-ui', fontSize: 12,
    fontWeight: 600, color: '#666', marginBottom: 5,
    textTransform: 'uppercase' as const, letterSpacing: 0.5
  }

  const handlePaiement = async () => {
    setTraitement(true)
    await new Promise(r => setTimeout(r, 2000))
    setTraitement(false)
    setSucces(true)
  }

  // Page succès
  if (succes) {
    return (
      <div style={{ minHeight: '100vh', background: '#f5f0e8', fontFamily: 'Georgia, serif' }}>
        <Nav page="panier" />
        <div style={{ maxWidth: 560, margin: '60px auto', padding: '0 24px', textAlign: 'center' }}>
          <div style={{ background: 'white', borderRadius: 24, padding: '48px 32px', boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>
            <div style={{ fontSize: 72, marginBottom: 20 }}>🎉</div>
            <h1 style={{ fontSize: 28, fontWeight: 700, color: '#1a3a15', marginBottom: 8 }}>Commande confirmée !</h1>
            <p style={{ fontFamily: 'system-ui', color: '#888', fontSize: 15, marginBottom: 24 }}>
              Merci pour votre commande. Un courriel de confirmation a été envoyé.
            </p>

            <div style={{ background: '#f5f0e8', borderRadius: 16, padding: '20px', marginBottom: 24, textAlign: 'left' }}>
              <p style={{ fontFamily: 'system-ui', fontWeight: 700, color: '#1a1a1a', marginBottom: 12 }}>Détails de la commande</p>
              <p style={{ fontFamily: 'system-ui', fontSize: 13, color: '#666', marginBottom: 6 }}>
                📦 Numéro : <strong>CMD-2026-{Math.floor(Math.random() * 9000) + 1000}</strong>
              </p>
              <p style={{ fontFamily: 'system-ui', fontSize: 13, color: '#666', marginBottom: 6 }}>
                📍 Collecte : <strong>{pointsCollecte.find(p => p.id === pointChoisi)?.nom}, {pointsCollecte.find(p => p.id === pointChoisi)?.ville}</strong>
              </p>
              <p style={{ fontFamily: 'system-ui', fontSize: 13, color: '#666', marginBottom: 6 }}>
                📅 Prochaine collecte : <strong>Vendredi 14 mars 2026</strong>
              </p>
              <p style={{ fontFamily: 'system-ui', fontSize: 13, color: '#666' }}>
                💰 Total payé : <strong style={{ color: '#1a3a15' }}>{total.toFixed(2)}$</strong>
              </p>
            </div>

            <div style={{ display: 'flex', gap: 12, flexDirection: 'column' }}>
              <Link href="/profil" style={{
                display: 'block', background: '#1a3a15', color: '#f5e6c8',
                padding: '14px', borderRadius: 12, textDecoration: 'none',
                fontFamily: 'system-ui', fontWeight: 700, fontSize: 15
              }}>
                Voir mes commandes →
              </Link>
              <Link href="/marche" style={{
                display: 'block', background: 'white', color: '#1a3a15',
                padding: '12px', borderRadius: 12, textDecoration: 'none',
                fontFamily: 'system-ui', fontWeight: 600, fontSize: 14,
                border: '2px solid #1a3a15'
              }}>
                Continuer mes achats
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f5f0e8', fontFamily: 'Georgia, serif' }}>
      <Nav page="panier" />

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '28px 24px 60px' }}>

        {/* Titre + étapes */}
        <div style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#1a1a1a', marginBottom: 20 }}>Paiement</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
            {[
              { num: 1, label: 'Livraison' },
              { num: 2, label: 'Paiement' },
              { num: 3, label: 'Confirmation' },
            ].map((e, i) => (
              <div key={e.num} style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  opacity: etape >= e.num ? 1 : 0.4
                }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: '50%',
                    background: etape > e.num ? '#166534' : etape === e.num ? '#1a3a15' : '#e8e0d0',
                    color: etape >= e.num ? '#f5e6c8' : '#aaa',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'system-ui', fontSize: 13, fontWeight: 700
                  }}>
                    {etape > e.num ? '✓' : e.num}
                  </div>
                  <span style={{ fontFamily: 'system-ui', fontSize: 13, fontWeight: etape === e.num ? 700 : 400, color: etape === e.num ? '#1a1a1a' : '#888' }}>
                    {e.label}
                  </span>
                </div>
                {i < 2 && <div style={{ width: 40, height: 2, background: etape > e.num ? '#1a3a15' : '#e8e0d0', margin: '0 8px' }} />}
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 24, alignItems: 'start' }}>

          {/* Colonne gauche */}
          <div>

            {/* ====== ÉTAPE 1 : LIVRAISON ====== */}
            {etape === 1 && (
              <div style={{ background: 'white', borderRadius: 20, padding: '28px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20, color: '#1a1a1a' }}>Mode de réception</h2>

                {/* Choix collecte/livraison */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
                  {[
                    { id: 'collecte', label: 'Point de collecte', emoji: '📍', prix: 'Gratuit', desc: '3× par semaine' },
                    { id: 'livraison', label: 'Livraison à domicile', emoji: '🚚', prix: '8,50$', desc: '2-3 jours ouvrables' },
                  ].map(m => (
                    <div
                      key={m.id}
                      onClick={() => setModeLivraison(m.id as any)}
                      style={{
                        padding: '16px', borderRadius: 14, cursor: 'pointer',
                        border: modeLivraison === m.id ? '2px solid #1a3a15' : '2px solid #e8e0d0',
                        background: modeLivraison === m.id ? '#f0f7f0' : 'white',
                        transition: 'all 0.2s'
                      }}
                    >
                      <div style={{ fontSize: 24, marginBottom: 6 }}>{m.emoji}</div>
                      <p style={{ fontFamily: 'system-ui', fontWeight: 700, fontSize: 14, color: '#1a1a1a', marginBottom: 2 }}>{m.label}</p>
                      <p style={{ fontFamily: 'system-ui', fontSize: 12, color: '#888' }}>{m.desc}</p>
                      <p style={{ fontFamily: 'system-ui', fontWeight: 700, fontSize: 14, color: '#1a3a15', marginTop: 6 }}>{m.prix}</p>
                    </div>
                  ))}
                </div>

                {/* Points de collecte */}
                {modeLivraison === 'collecte' && (
                  <div>
                    <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 14, color: '#1a1a1a', fontFamily: 'system-ui' }}>Choisir un point de collecte</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                      {pointsCollecte.map(p => (
                        <div
                          key={p.id}
                          onClick={() => setPointChoisi(p.id)}
                          style={{
                            padding: '14px 16px', borderRadius: 12, cursor: 'pointer',
                            border: pointChoisi === p.id ? '2px solid #1a3a15' : '2px solid #e8e0d0',
                            background: pointChoisi === p.id ? '#f0f7f0' : 'white',
                            display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                          }}
                        >
                          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                            <span style={{ fontSize: 22 }}>{p.emoji}</span>
                            <div>
                              <p style={{ fontFamily: 'system-ui', fontWeight: 700, fontSize: 14, color: '#1a1a1a' }}>{p.nom}</p>
                              <p style={{ fontFamily: 'system-ui', fontSize: 12, color: '#888' }}>📍 {p.ville} · 📅 {p.jours}</p>
                            </div>
                          </div>
                          {pointChoisi === p.id && <span style={{ color: '#1a3a15', fontSize: 20 }}>✓</span>}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Livraison à domicile */}
                {modeLivraison === 'livraison' && (
                  <div>
                    <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 14, color: '#1a1a1a', fontFamily: 'system-ui' }}>Adresse de livraison</h3>
                    <div style={{ display: 'grid', gap: 14 }}>
                      <div>
                        <label style={labelStyle}>Adresse</label>
                        <input value={adresse} onChange={e => setAdresse(e.target.value)}
                          placeholder="123 rue des Érables" style={inputStyle}
                          onFocus={e => (e.target.style.borderColor = '#1a3a15')}
                          onBlur={e => (e.target.style.borderColor = '#e8e0d0')} />
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 12 }}>
                        <div>
                          <label style={labelStyle}>Ville</label>
                          <input value={ville} onChange={e => setVille(e.target.value)}
                            placeholder="Magog" style={inputStyle}
                            onFocus={e => (e.target.style.borderColor = '#1a3a15')}
                            onBlur={e => (e.target.style.borderColor = '#e8e0d0')} />
                        </div>
                        <div>
                          <label style={labelStyle}>Code postal</label>
                          <input value={codePostal} onChange={e => setCodePostal(e.target.value)}
                            placeholder="J1X 1A1" style={inputStyle}
                            onFocus={e => (e.target.style.borderColor = '#1a3a15')}
                            onBlur={e => (e.target.style.borderColor = '#e8e0d0')} />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <button onClick={() => setEtape(2)} style={{
                  width: '100%', marginTop: 24, padding: '14px', borderRadius: 12, border: 'none',
                  background: '#1a3a15', color: '#f5e6c8',
                  fontFamily: 'system-ui', fontSize: 16, fontWeight: 700, cursor: 'pointer'
                }}>
                  Continuer vers le paiement →
                </button>
              </div>
            )}

            {/* ====== ÉTAPE 2 : PAIEMENT ====== */}
            {etape === 2 && (
              <div style={{ background: 'white', borderRadius: 20, padding: '28px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                <button onClick={() => setEtape(1)} style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: '#888', fontFamily: 'system-ui', fontSize: 13, marginBottom: 16,
                  display: 'flex', alignItems: 'center', gap: 6
                }}>← Retour</button>

                <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20, color: '#1a1a1a' }}>Informations de paiement</h2>

                {/* Badge sécurité */}
                <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
                  {['🔒 SSL sécurisé', '💳 Stripe', '🍁 Paiement canadien'].map(b => (
                    <span key={b} style={{ background: '#e8f5e9', color: '#166534', padding: '4px 10px', borderRadius: 20, fontSize: 11, fontFamily: 'system-ui', fontWeight: 600 }}>{b}</span>
                  ))}
                </div>

                <div style={{ display: 'grid', gap: 16 }}>
                  <div>
                    <label style={labelStyle}>Nom sur la carte</label>
                    <input value={nomCarte} onChange={e => setNomCarte(e.target.value)}
                      placeholder="Marie-Ève Simard" style={inputStyle}
                      onFocus={e => (e.target.style.borderColor = '#1a3a15')}
                      onBlur={e => (e.target.style.borderColor = '#e8e0d0')} />
                  </div>

                  <div>
                    <label style={labelStyle}>Numéro de carte</label>
                    <div style={{ position: 'relative' }}>
                      <input
                        value={numeroCarte}
                        onChange={e => setNumCarte(e.target.value.replace(/\D/g, '').replace(/(\d{4})/g, '$1 ').trim().slice(0, 19))}
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                        style={inputStyle}
                        onFocus={e => (e.target.style.borderColor = '#1a3a15')}
                        onBlur={e => (e.target.style.borderColor = '#e8e0d0')}
                      />
                      <div style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', display: 'flex', gap: 4 }}>
                        {['💳', '🔵', '🟡'].map((c, i) => <span key={i} style={{ fontSize: 16 }}>{c}</span>)}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    <div>
                      <label style={labelStyle}>Expiration</label>
                      <input
                        value={expiration}
                        onChange={e => {
                          let v = e.target.value.replace(/\D/g, '')
                          if (v.length >= 2) v = v.slice(0, 2) + '/' + v.slice(2, 4)
                          setExpiration(v)
                        }}
                        placeholder="MM/AA" maxLength={5} style={inputStyle}
                        onFocus={e => (e.target.style.borderColor = '#1a3a15')}
                        onBlur={e => (e.target.style.borderColor = '#e8e0d0')}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>CVV</label>
                      <input value={cvv} onChange={e => setCvv(e.target.value.slice(0, 3))}
                        placeholder="123" maxLength={3} type="password" style={inputStyle}
                        onFocus={e => (e.target.style.borderColor = '#1a3a15')}
                        onBlur={e => (e.target.style.borderColor = '#e8e0d0')} />
                    </div>
                  </div>
                </div>

                <button
                  onClick={handlePaiement}
                  disabled={traitement}
                  style={{
                    width: '100%', marginTop: 24, padding: '16px', borderRadius: 12, border: 'none',
                    background: traitement ? '#888' : '#1a3a15', color: '#f5e6c8',
                    fontFamily: 'system-ui', fontSize: 16, fontWeight: 700,
                    cursor: traitement ? 'not-allowed' : 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10
                  }}
                >
                  {traitement ? (
                    <>⏳ Traitement en cours...</>
                  ) : (
                    <>🔒 Payer {total.toFixed(2)}$ maintenant</>
                  )}
                </button>

                <p style={{ textAlign: 'center', marginTop: 12, fontFamily: 'system-ui', fontSize: 12, color: '#aaa' }}>
                  Paiement sécurisé par Stripe · Vos données ne sont jamais stockées
                </p>
              </div>
            )}

          </div>

          {/* Colonne droite — Résumé */}
          <div style={{ background: 'white', borderRadius: 20, padding: '24px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', position: 'sticky', top: 20 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, color: '#1a1a1a' }}>Résumé de commande</h3>

            {/* Produits */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 16 }}>
              {itemsParier.map(item => (
                <div key={item.id} style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <div style={{ position: 'relative' }}>
                    <img src={item.image} alt={item.nom} style={{ width: 50, height: 50, borderRadius: 8, objectFit: 'cover' }} />
                    <span style={{
                      position: 'absolute', top: -6, right: -6,
                      background: '#1a3a15', color: 'white',
                      width: 18, height: 18, borderRadius: '50%',
                      fontSize: 10, fontFamily: 'system-ui', fontWeight: 700,
                      display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>{item.qty}</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontFamily: 'system-ui', fontWeight: 600, fontSize: 13, color: '#1a1a1a' }}>{item.nom}</p>
                    <p style={{ fontFamily: 'system-ui', fontSize: 11, color: '#888' }}>{item.producteur}</p>
                  </div>
                  <p style={{ fontFamily: 'system-ui', fontWeight: 700, fontSize: 13, color: '#1a1a1a' }}>
                    {(item.prix * item.qty).toFixed(2)}$
                  </p>
                </div>
              ))}
            </div>

            <div style={{ borderTop: '1px solid #f0ebe0', paddingTop: 14 }}>
              {[
                { label: 'Sous-total', val: sousTotal.toFixed(2) + '$' },
                { label: modeLivraison === 'collecte' ? 'Collecte' : 'Livraison', val: modeLivraison === 'collecte' ? 'Gratuit' : '8,50$' },
                { label: 'TPS + TVQ (14,975%)', val: taxes.toFixed(2) + '$' },
              ].map(l => (
                <div key={l.label} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontFamily: 'system-ui', fontSize: 13, color: '#888' }}>{l.label}</span>
                  <span style={{ fontFamily: 'system-ui', fontSize: 13, color: '#1a1a1a' }}>{l.val}</span>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12, paddingTop: 12, borderTop: '2px solid #1a3a15' }}>
                <span style={{ fontFamily: 'system-ui', fontWeight: 700, fontSize: 16, color: '#1a1a1a' }}>Total</span>
                <span style={{ fontFamily: 'system-ui', fontWeight: 700, fontSize: 20, color: '#1a3a15' }}>{total.toFixed(2)}$</span>
              </div>
            </div>

            {/* Point sélectionné */}
            {modeLivraison === 'collecte' && (
              <div style={{ marginTop: 16, background: '#f5f0e8', borderRadius: 10, padding: '12px' }}>
                <p style={{ fontFamily: 'system-ui', fontSize: 11, color: '#888', marginBottom: 4 }}>📍 Point de collecte</p>
                <p style={{ fontFamily: 'system-ui', fontWeight: 600, fontSize: 13, color: '#1a1a1a' }}>
                  {pointsCollecte.find(p => p.id === pointChoisi)?.emoji} {pointsCollecte.find(p => p.id === pointChoisi)?.nom}
                </p>
                <p style={{ fontFamily: 'system-ui', fontSize: 12, color: '#888' }}>
                  {pointsCollecte.find(p => p.id === pointChoisi)?.jours}
                </p>
              </div>
            )}

            <p style={{ marginTop: 14, fontFamily: 'system-ui', fontSize: 11, color: '#aaa', textAlign: 'center', lineHeight: 1.5 }}>
              🍁 Commission Panier Vert : 8% incluse dans les prix vendeurs
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
