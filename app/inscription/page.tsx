'use client'
import { useState } from 'react'
import Nav from '../components/Nav'

const plans = [
  { id: 'gratuit', nom: 'Gratuit', prix: '0$', desc: 'Pour commencer', couleur: '#888', items: ['Vitrine publique', 'Fiche producteur', 'Contact direct', '5 produits max', 'Carte interactive'] },
  { id: 'starter', nom: 'Starter', prix: '19$/mois', desc: 'Pour se lancer', couleur: '#2d5a27', pop: false, items: ['10 produits', 'Système de réservation', 'Messagerie', 'Stats de base', 'Badge Starter'] },
  { id: 'pro', nom: 'Pro', prix: '39$/mois', desc: 'Le plus populaire', couleur: '#1a3a15', pop: true, items: ['50 produits', 'Achat immédiat', 'Dashboard complet', 'Priorité recherche', 'Badge Pro ⭐'] },
  { id: 'premium', nom: 'Premium', prix: '69$/mois', desc: 'Pour les grands', couleur: '#854d0e', pop: false, items: ['Produits illimités', 'Page personnalisée', 'Gestionnaire dédié', 'Analytics avancés', 'Badge Premium 👑'] },
]

const types = ['Maraîcher / Légumes', 'Fromagerie / Laitier', 'Érablière / Miel', 'Verger / Fruits', 'Élevage / Viandes', 'Boulangerie / Pâtisserie', 'Brasserie / Boissons', 'Herbes / Cosmétiques', 'Autre']

const etapes = ['Votre profil', 'Votre ferme', 'Vos produits', 'Abonnement', 'Confirmation']

export default function InscriptionPage() {
  const [etape, setEtape] = useState(0)
  const [planChoisi, setPlanChoisi] = useState('pro')
  const [form, setForm] = useState({
    prenom: '', nom: '', email: '', tel: '', mdp: '',
    nomFerme: '', type: '', ville: '', adresse: '', km: '', description: '',
    produit1: '', produit2: '', produit3: '',
    livraison: false, collecte: false, marche: false,
  })

  const update = (key: string, val: string | boolean) => setForm(p => ({ ...p, [key]: val }))

  const inputStyle = {
    width: '100%', padding: '12px 14px', borderRadius: 8, border: '1.5px solid #ddd',
    fontSize: 15, fontFamily: 'system-ui', outline: 'none', boxSizing: 'border-box' as const,
    background: 'white', color: '#1a1a1a',
  }
  const labelStyle = { fontSize: 13, fontWeight: 700, color: '#555', fontFamily: 'system-ui', display: 'block' as const, marginBottom: 6 }

  if (etape === 4) {
    return (
      <main style={{ fontFamily: 'Georgia, serif', background: '#faf7f0', minHeight: '100vh' }}>
        <Nav page="inscription" />
        <div style={{ maxWidth: 560, margin: '80px auto', textAlign: 'center', padding: '0 5%' }}>
          <div style={{ fontSize: 72, marginBottom: 24 }}>🎉</div>
          <h1 style={{ fontSize: 40, fontWeight: 900, color: '#1a3a15', marginBottom: 16 }}>Bienvenue dans la famille !</h1>
          <p style={{ fontSize: 17, color: '#666', fontFamily: 'system-ui', lineHeight: 1.75, marginBottom: 32 }}>
            Votre boutique <strong>{form.nomFerme || 'Votre Ferme'}</strong> est en cours de création. Vous recevrez un courriel de confirmation dans les prochaines minutes.
          </p>
          <div style={{ background: 'white', borderRadius: 16, padding: 28, boxShadow: '0 2px 16px rgba(0,0,0,0.08)', marginBottom: 32, textAlign: 'left' }}>
            <div style={{ fontSize: 14, fontFamily: 'system-ui', fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 16 }}>Récapitulatif</div>
            {[
              ['Producteur', `${form.prenom} ${form.nom}`],
              ['Ferme', form.nomFerme],
              ['Type', form.type],
              ['Ville', form.ville],
              ['Plan', plans.find(p => p.id === planChoisi)?.nom + ' — ' + plans.find(p => p.id === planChoisi)?.prix],
            ].map(([label, val]) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #f5f5f5', fontSize: 15, fontFamily: 'system-ui' }}>
                <span style={{ color: '#888' }}>{label}</span>
                <span style={{ fontWeight: 700, color: '#1a3a15' }}>{val || '—'}</span>
              </div>
            ))}
          </div>
          <button onClick={() => window.location.href = '/dashboard'}
            style={{ background: '#1a3a15', color: '#f5e6c8', border: 'none', padding: '16px 36px', borderRadius: 8, fontSize: 17, fontWeight: 700, cursor: 'pointer', fontFamily: 'system-ui', width: '100%', marginBottom: 12 }}>
            Accéder à mon tableau de bord →
          </button>
          <button onClick={() => window.location.href = '/'}
            style={{ background: 'transparent', color: '#1a3a15', border: '2px solid #1a3a15', padding: '14px 36px', borderRadius: 8, fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'system-ui', width: '100%' }}>
            Voir ma boutique publique
          </button>
        </div>
      </main>
    )
  }

  return (
    <main style={{ fontFamily: 'Georgia, serif', background: '#faf7f0', minHeight: '100vh' }}>

      <Nav page="inscription" />

      {/* HERO */}
      <div style={{ background: 'linear-gradient(135deg, #1a3a15, #2d5a27)', padding: '48px 5% 40px', textAlign: 'center' }}>
        <div style={{ fontSize: 12, fontFamily: 'system-ui', fontWeight: 700, color: '#4ade80', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: 10 }}>REJOINDRE LE RÉSEAU</div>
        <h1 style={{ fontSize: 'clamp(28px,4vw,46px)', fontWeight: 900, color: '#f5e6c8', margin: '0 0 12px' }}>Créez votre boutique 🌾</h1>
        <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.6)', fontFamily: 'system-ui', margin: '0 auto', maxWidth: 500 }}>
          Vendez directement à des milliers de clients locaux en Estrie — sans intermédiaire.
        </p>

        {/* Stats */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 40, marginTop: 32, flexWrap: 'wrap' }}>
          {[['127', 'Producteurs actifs'], ['2 400+', 'Clients abonnés'], ['0%', 'Commission vente*'], ['5 min', "Pour s'inscrire"]].map(([num, lbl]) => (
            <div key={lbl} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 24, fontWeight: 900, color: '#f5e6c8' }}>{num}</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', fontFamily: 'system-ui' }}>{lbl}</div>
            </div>
          ))}
        </div>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', fontFamily: 'system-ui', marginTop: 12 }}>*Commission de 8% sur les ventes uniquement</div>
      </div>

      {/* ÉTAPES */}
      <div style={{ background: 'white', borderBottom: '1px solid #eee', padding: '16px 5%' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0, maxWidth: 700, margin: '0 auto' }}>
          {etapes.map((e, i) => (
            <div key={e} style={{ display: 'flex', alignItems: 'center', flex: i < etapes.length - 1 ? 1 : 0 }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: i < etape ? '#2d5a27' : i === etape ? '#1a3a15' : '#e8e8e8', color: i <= etape ? 'white' : '#aaa', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 800, fontFamily: 'system-ui' }}>
                  {i < etape ? '✓' : i + 1}
                </div>
                <span style={{ fontSize: 11, fontFamily: 'system-ui', color: i === etape ? '#1a3a15' : '#aaa', fontWeight: i === etape ? 700 : 400, whiteSpace: 'nowrap' }}>{e}</span>
              </div>
              {i < etapes.length - 1 && <div style={{ flex: 1, height: 2, background: i < etape ? '#2d5a27' : '#e8e8e8', margin: '0 8px', marginBottom: 18 }} />}
            </div>
          ))}
        </div>
      </div>

      {/* FORMULAIRE */}
      <div style={{ maxWidth: 680, margin: '0 auto', padding: '48px 5%' }}>

        {/* ÉTAPE 0 — Profil */}
        {etape === 0 && (
          <div>
            <h2 style={{ fontSize: 28, fontWeight: 900, color: '#1a3a15', marginBottom: 8 }}>Votre profil</h2>
            <p style={{ fontSize: 15, color: '#888', fontFamily: 'system-ui', marginBottom: 32 }}>Ces informations resteront confidentielles.</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
              <div>
                <label style={labelStyle}>Prénom *</label>
                <input value={form.prenom} onChange={e => update('prenom', e.target.value)} placeholder="Jean" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Nom *</label>
                <input value={form.nom} onChange={e => update('nom', e.target.value)} placeholder="Tremblay" style={inputStyle} />
              </div>
            </div>
            <div style={{ marginBottom: 20 }}>
              <label style={labelStyle}>Courriel *</label>
              <input value={form.email} onChange={e => update('email', e.target.value)} placeholder="jean@fermetremblay.ca" type="email" style={inputStyle} />
            </div>
            <div style={{ marginBottom: 20 }}>
              <label style={labelStyle}>Téléphone</label>
              <input value={form.tel} onChange={e => update('tel', e.target.value)} placeholder="819-555-0123" style={inputStyle} />
            </div>
            <div style={{ marginBottom: 32 }}>
              <label style={labelStyle}>Mot de passe *</label>
              <input value={form.mdp} onChange={e => update('mdp', e.target.value)} placeholder="Minimum 8 caractères" type="password" style={inputStyle} />
            </div>
            <div style={{ background: '#f0faf0', border: '1px solid #c8e8c8', borderRadius: 10, padding: '14px 16px', marginBottom: 28, fontFamily: 'system-ui', fontSize: 13, color: '#2d5a27', lineHeight: 1.6 }}>
              ✅ En créant votre compte, vous acceptez nos <strong>conditions d'utilisation</strong> et notre <strong>politique de confidentialité</strong>.
            </div>
          </div>
        )}

        {/* ÉTAPE 1 — Ferme */}
        {etape === 1 && (
          <div>
            <h2 style={{ fontSize: 28, fontWeight: 900, color: '#1a3a15', marginBottom: 8 }}>Votre ferme</h2>
            <p style={{ fontSize: 15, color: '#888', fontFamily: 'system-ui', marginBottom: 32 }}>Ces informations seront visibles par les clients.</p>
            <div style={{ marginBottom: 20 }}>
              <label style={labelStyle}>Nom de la ferme / entreprise *</label>
              <input value={form.nomFerme} onChange={e => update('nomFerme', e.target.value)} placeholder="ex: Ferme Tremblay" style={inputStyle} />
            </div>
            <div style={{ marginBottom: 20 }}>
              <label style={labelStyle}>Type de production *</label>
              <select value={form.type} onChange={e => update('type', e.target.value)}
                style={{ ...inputStyle, cursor: 'pointer' }}>
                <option value="">Choisir...</option>
                {types.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
              <div>
                <label style={labelStyle}>Ville / Municipalité *</label>
                <input value={form.ville} onChange={e => update('ville', e.target.value)} placeholder="ex: Magog" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Distance de Magog (km)</label>
                <input value={form.km} onChange={e => update('km', e.target.value)} placeholder="ex: 12" style={inputStyle} />
              </div>
            </div>
            <div style={{ marginBottom: 20 }}>
              <label style={labelStyle}>Adresse complète</label>
              <input value={form.adresse} onChange={e => update('adresse', e.target.value)} placeholder="123 rang des Érables, Magog" style={inputStyle} />
            </div>
            <div style={{ marginBottom: 32 }}>
              <label style={labelStyle}>Description de votre ferme *</label>
              <textarea value={form.description} onChange={e => update('description', e.target.value)}
                placeholder="Décrivez votre ferme, vos méthodes, votre histoire..."
                style={{ ...inputStyle, minHeight: 100, resize: 'vertical' }} />
            </div>
          </div>
        )}

        {/* ÉTAPE 2 — Produits */}
        {etape === 2 && (
          <div>
            <h2 style={{ fontSize: 28, fontWeight: 900, color: '#1a3a15', marginBottom: 8 }}>Vos produits</h2>
            <p style={{ fontSize: 15, color: '#888', fontFamily: 'system-ui', marginBottom: 32 }}>Indiquez vos 3 produits principaux pour commencer.</p>
            {[['produit1', 'Produit principal', 'ex: Carottes biologiques'], ['produit2', 'Produit 2', 'ex: Laitue Boston'], ['produit3', 'Produit 3', 'ex: Courgettes']].map(([key, label, placeholder]) => (
              <div key={key} style={{ marginBottom: 20 }}>
                <label style={labelStyle}>{label}</label>
                <input value={(form as any)[key]} onChange={e => update(key, e.target.value)} placeholder={placeholder} style={inputStyle} />
              </div>
            ))}
            <div style={{ marginBottom: 12 }}>
              <label style={{ ...labelStyle, marginBottom: 14 }}>Modes de livraison offerts</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  ['livraison', '🚚 Livraison à domicile'],
                  ['collecte', '📦 Point de collecte (Marché, épicerie...)'],
                  ['marche', '🛒 Vente au marché public'],
                ].map(([key, label]) => (
                  <label key={key} style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', fontFamily: 'system-ui', fontSize: 15, color: '#444' }}>
                    <input type="checkbox" checked={(form as any)[key]} onChange={e => update(key, e.target.checked)}
                      style={{ width: 18, height: 18, cursor: 'pointer', accentColor: '#1a3a15' }} />
                    {label}
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ÉTAPE 3 — Abonnement */}
        {etape === 3 && (
          <div>
            <h2 style={{ fontSize: 28, fontWeight: 900, color: '#1a3a15', marginBottom: 8 }}>Choisissez votre plan</h2>
            <p style={{ fontSize: 15, color: '#888', fontFamily: 'system-ui', marginBottom: 32 }}>Commencez gratuitement, évoluez à votre rythme. Les acheteurs sont toujours gratuits.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, marginBottom: 28 }}>
              {plans.map(plan => (
                <div key={plan.id} onClick={() => setPlanChoisi(plan.id)}
                  style={{ background: planChoisi === plan.id ? '#1a3a15' : 'white', border: `2px solid ${planChoisi === plan.id ? '#1a3a15' : '#eee'}`, borderRadius: 16, padding: '22px 20px', cursor: 'pointer', position: 'relative' }}>
                  {plan.pop && <div style={{ position: 'absolute', top: -11, left: '50%', transform: 'translateX(-50%)', background: '#4ade80', color: '#1a3a15', fontSize: 11, fontWeight: 800, padding: '3px 12px', borderRadius: 20, whiteSpace: 'nowrap', fontFamily: 'system-ui' }}>⭐ POPULAIRE</div>}
                  <div style={{ fontSize: 17, fontWeight: 800, color: planChoisi === plan.id ? '#f5e6c8' : '#1a3a15', marginBottom: 4, fontFamily: 'Georgia, serif' }}>{plan.nom}</div>
                  <div style={{ fontSize: 22, fontWeight: 900, color: planChoisi === plan.id ? '#4ade80' : '#1a3a15', marginBottom: 4 }}>{plan.prix}</div>
                  <div style={{ fontSize: 12, color: planChoisi === plan.id ? 'rgba(255,255,255,0.4)' : '#aaa', fontFamily: 'system-ui', marginBottom: 14 }}>{plan.desc}</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {plan.items.map(item => (
                      <div key={item} style={{ fontSize: 13, fontFamily: 'system-ui', color: planChoisi === plan.id ? 'rgba(255,255,255,0.7)' : '#555', display: 'flex', gap: 6 }}>
                        <span style={{ color: '#4ade80', fontWeight: 700 }}>✓</span> {item}
                      </div>
                    ))}
                  </div>
                  {planChoisi === plan.id && (
                    <div style={{ position: 'absolute', top: 14, right: 14, width: 22, height: 22, borderRadius: '50%', background: '#4ade80', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700 }}>✓</div>
                  )}
                </div>
              ))}
            </div>
            <div style={{ background: '#f0faf0', border: '1px solid #c8e8c8', borderRadius: 10, padding: '14px 16px', fontFamily: 'system-ui', fontSize: 13, color: '#2d5a27', lineHeight: 1.6 }}>
              💳 Aucune carte de crédit requise pour le plan Gratuit · Annulez à tout moment · Commission 8% sur les ventes
            </div>
          </div>
        )}

        {/* NAVIGATION */}
        <div style={{ display: 'flex', gap: 14, marginTop: 8 }}>
          {etape > 0 && (
            <button onClick={() => setEtape(e => e - 1)}
              style={{ background: 'white', color: '#1a3a15', border: '2px solid #1a3a15', padding: '15px 28px', borderRadius: 10, fontSize: 16, fontWeight: 700, cursor: 'pointer', fontFamily: 'system-ui' }}>
              ← Retour
            </button>
          )}
          <button onClick={() => setEtape(e => e + 1)}
            style={{ flex: 1, background: '#1a3a15', color: '#f5e6c8', border: 'none', padding: '15px 28px', borderRadius: 10, fontSize: 16, fontWeight: 700, cursor: 'pointer', fontFamily: 'system-ui' }}>
            {etape === 3 ? '🎉 Créer ma boutique !' : `Continuer → (${etape + 1}/4)`}
          </button>
        </div>
      </div>
    </main>
  )
}
