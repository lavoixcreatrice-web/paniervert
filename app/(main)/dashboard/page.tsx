'use client'
import { useState } from 'react'

const stats = [
  { icon: '💰', label: 'Revenus ce mois', val: '3 840$', delta: '+12%', up: true },
  { icon: '📦', label: 'Commandes', val: '47', delta: '+8', up: true },
  { icon: '👥', label: 'Clients actifs', val: '124', delta: '+5', up: true },
  { icon: '⭐', label: 'Note moyenne', val: '4.9', delta: '→ stable', up: null },
]

const commandes = [
  { id: '#2041', client: 'Sophie Larose', produits: 'Carottes x3, Laitue x2', total: '18,50$', statut: 'prêt', date: "Aujourd'hui 9h" },
  { id: '#2040', client: 'Restaurant Le Bémol', produits: 'Carottes x10, Courgettes x5, Tomates x8', total: '87,00$', statut: 'livré', date: 'Hier 14h' },
  { id: '#2039', client: 'Marie-Ève Tremblay', produits: 'Panier Famille sem. 12', total: '54,00$', statut: 'livré', date: 'Hier 11h' },
  { id: '#2038', client: 'École primaire Compton', produits: 'Carottes x20, Pommes x15, Laitue x10', total: '149,00$', statut: 'livré', date: 'Lun 10h' },
  { id: '#2037', client: 'Jean-Pierre Bolduc', produits: 'Maïs x6, Courgettes x2', total: '12,50$', statut: 'annulé', date: 'Lun 8h' },
]

const produits = [
  { id: 1, nom: 'Carottes biologiques', stock: 48, unite: 'kg', prix: '3,50$', statut: 'actif', ventes: 34, img: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=80&h=80&fit=crop' },
  { id: 2, nom: 'Laitue Boston', stock: 12, unite: 'têtes', prix: '2,50$', statut: 'actif', ventes: 18, img: 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=80&h=80&fit=crop' },
  { id: 3, nom: 'Pommes de terre Yukon', stock: 3, unite: 'kg', prix: '4,00$', statut: 'alerte', ventes: 22, img: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=80&h=80&fit=crop' },
  { id: 4, nom: 'Courgettes', stock: 0, unite: 'kg', prix: '3,00$', statut: 'épuisé', ventes: 15, img: 'https://images.unsplash.com/photo-1596097635121-14b63b7a0c19?w=80&h=80&fit=crop' },
  { id: 5, nom: 'Tomates Heirloom', stock: 27, unite: 'kg', prix: '5,50$', statut: 'actif', ventes: 29, img: 'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=80&h=80&fit=crop' },
  { id: 6, nom: 'Maïs sucré', stock: 88, unite: 'épis', prix: '0,75$', statut: 'actif', ventes: 41, img: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=80&h=80&fit=crop' },
]

const messages = [
  { de: 'Restaurant Le Bémol', msg: 'Bonjour, est-ce possible d\'avoir 15 kg de carottes vendredi?', temps: 'Il y a 2h', lu: false },
  { de: 'Marie-Ève T.', msg: 'Merci pour le panier cette semaine, les légumes étaient parfaits!', temps: 'Il y a 5h', lu: false },
  { de: 'École de Compton', msg: 'Nous aimerions augmenter notre commande mensuelle.', temps: 'Hier', lu: true },
  { de: 'Jean-Pierre B.', msg: 'Est-ce que vous aurez du maïs la semaine prochaine?', temps: 'Hier', lu: true },
]

const statutStyle: Record<string, { bg: string; color: string; label: string }> = {
  prêt: { bg: '#dcfce7', color: '#166534', label: '✓ Prêt' },
  livré: { bg: '#f0f0f0', color: '#888', label: '✓ Livré' },
  annulé: { bg: '#fee2e2', color: '#991b1b', label: '✕ Annulé' },
  actif: { bg: '#dcfce7', color: '#166534', label: '● Actif' },
  alerte: { bg: '#fef9c3', color: '#854d0e', label: '⚠ Stock bas' },
  épuisé: { bg: '#fee2e2', color: '#991b1b', label: '✕ Épuisé' },
}

const semaines = ['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8']
const revenus =  [620, 780, 540, 920, 840, 1100, 960, 1280]
const maxRev = Math.max(...revenus)

export default function Dashboard() {
  const [onglet, setOnglet] = useState<'apercu' | 'commandes' | 'produits' | 'messages'>('apercu')
  const [stockEdit, setStockEdit] = useState<Record<number, number>>({})

  const updateStock = (id: number, val: number) => setStockEdit(p => ({ ...p, [id]: val }))

  return (
    <main style={{ fontFamily: 'system-ui, sans-serif', background: '#f5f5f0', minHeight: '100vh' }}>

      {/* NAV */}
      <nav style={{ background: '#1a3a15', padding: '0 3%', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 1000 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ fontFamily: 'Georgia, serif', fontSize: 20, fontWeight: 700, color: '#f5e6c8' }}>🌱 Panier Vert</span>
          <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 18 }}>|</span>
          <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14 }}>Tableau de bord vendeur</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ position: 'relative', cursor: 'pointer' }}>
            <span style={{ fontSize: 20 }}>🔔</span>
            <span style={{ position: 'absolute', top: -4, right: -4, background: '#e53e3e', color: 'white', fontSize: 10, fontWeight: 700, borderRadius: '50%', width: 16, height: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>2</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.1)', padding: '6px 14px', borderRadius: 24 }}>
            <span style={{ fontSize: 20 }}>🌾</span>
            <span style={{ color: '#f5e6c8', fontSize: 14, fontWeight: 600 }}>Ferme Tremblay</span>
          </div>
          <a href="/producteurs" style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, textDecoration: 'none' }}>← Voir la boutique</a>
        </div>
      </nav>

      <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', minHeight: 'calc(100vh - 60px)' }}>

        {/* SIDEBAR */}
        <aside style={{ background: 'white', borderRight: '1px solid #eee', padding: '28px 0' }}>
          {[
            ['apercu', '📊', 'Aperçu'],
            ['commandes', '📦', 'Commandes'],
            ['produits', '🥕', 'Mes produits'],
            ['messages', '💬', 'Messages'],
          ].map(([id, icon, label]) => (
            <button key={id} onClick={() => setOnglet(id as typeof onglet)}
              style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '13px 24px', border: 'none', background: onglet === id ? '#f0faf0' : 'transparent', color: onglet === id ? '#1a3a15' : '#666', fontWeight: onglet === id ? 700 : 400, fontSize: 15, cursor: 'pointer', borderLeft: onglet === id ? '3px solid #1a3a15' : '3px solid transparent', textAlign: 'left' }}>
              <span style={{ fontSize: 18 }}>{icon}</span> {label}
              {id === 'messages' && <span style={{ marginLeft: 'auto', background: '#e53e3e', color: 'white', fontSize: 11, fontWeight: 700, borderRadius: '50%', width: 18, height: 18, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>2</span>}
              {id === 'commandes' && <span style={{ marginLeft: 'auto', background: '#1a3a15', color: 'white', fontSize: 11, fontWeight: 700, borderRadius: '50%', width: 18, height: 18, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>1</span>}
            </button>
          ))}

          <div style={{ margin: '24px 16px 0', padding: '16px', background: '#f0faf0', borderRadius: 12, border: '1px solid #c8e8c8' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#2d5a27', marginBottom: 8 }}>Abonnement Pro</div>
            <div style={{ fontSize: 13, color: '#555', lineHeight: 1.6, marginBottom: 10 }}>50 produits · achat immédiat · priorité recherche</div>
            <div style={{ fontSize: 18, fontWeight: 900, color: '#1a3a15', marginBottom: 4 }}>39$/mois</div>
            <button style={{ width: '100%', background: '#1a3a15', color: '#f5e6c8', border: 'none', padding: '8px', borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>Gérer l'abonnement</button>
          </div>
        </aside>

        {/* CONTENU PRINCIPAL */}
        <div style={{ padding: '36px 40px', overflowY: 'auto' }}>

          {/* APERÇU */}
          {onglet === 'apercu' && (
            <div>
              <div style={{ marginBottom: 32 }}>
                <h1 style={{ fontSize: 28, fontWeight: 900, color: '#1a3a15', margin: '0 0 4px 0', fontFamily: 'Georgia, serif' }}>Bonjour, Jean 👋</h1>
                <p style={{ fontSize: 15, color: '#888', margin: 0 }}>Lundi 9 mars 2026 · Voici votre résumé</p>
              </div>

              {/* Stats */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 18, marginBottom: 32 }}>
                {stats.map(s => (
                  <div key={s.label} style={{ background: 'white', borderRadius: 14, padding: '22px 24px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                    <div style={{ fontSize: 28, marginBottom: 10 }}>{s.icon}</div>
                    <div style={{ fontSize: 26, fontWeight: 900, color: '#1a3a15', marginBottom: 4 }}>{s.val}</div>
                    <div style={{ fontSize: 13, color: '#888', marginBottom: 6 }}>{s.label}</div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: s.up === true ? '#166534' : s.up === false ? '#991b1b' : '#888' }}>{s.delta}</div>
                  </div>
                ))}
              </div>

              {/* Graphique revenus */}
              <div style={{ background: 'white', borderRadius: 16, padding: '28px 32px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', marginBottom: 24 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
                  <div>
                    <div style={{ fontSize: 17, fontWeight: 800, color: '#1a3a15' }}>Revenus des 8 dernières semaines</div>
                    <div style={{ fontSize: 13, color: '#888', marginTop: 2 }}>Total : 7 040$ · Moyenne : 880$/sem</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, height: 160 }}>
                  {revenus.map((rev, i) => (
                    <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                      <div style={{ fontSize: 11, color: '#888', fontWeight: 600 }}>{rev}$</div>
                      <div style={{ width: '100%', background: i === 7 ? '#1a3a15' : '#dcfce7', borderRadius: '6px 6px 0 0', height: `${(rev / maxRev) * 120}px`, transition: 'height 0.3s' }} />
                      <div style={{ fontSize: 11, color: '#aaa' }}>{semaines[i]}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Commande en attente + Messages */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                <div style={{ background: 'white', borderRadius: 14, padding: '22px 24px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                  <div style={{ fontSize: 16, fontWeight: 800, color: '#1a3a15', marginBottom: 16 }}>📦 Commande à préparer</div>
                  <div style={{ background: '#f0faf0', border: '1px solid #c8e8c8', borderRadius: 10, padding: '14px 16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                      <span style={{ fontWeight: 700, color: '#1a3a15', fontSize: 15 }}>#2041 — Sophie Larose</span>
                      <span style={{ background: '#dcfce7', color: '#166534', fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 20 }}>✓ Prêt</span>
                    </div>
                    <div style={{ fontSize: 13, color: '#666', marginBottom: 10 }}>Carottes x3, Laitue x2 · 18,50$</div>
                    <div style={{ fontSize: 12, color: '#888' }}>📅 Collecte au Marché de Magog · Mercredi 9h</div>
                  </div>
                </div>
                <div style={{ background: 'white', borderRadius: 14, padding: '22px 24px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                  <div style={{ fontSize: 16, fontWeight: 800, color: '#1a3a15', marginBottom: 16 }}>💬 Nouveaux messages</div>
                  {messages.filter(m => !m.lu).map((m, i) => (
                    <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 14, alignItems: 'flex-start' }}>
                      <div style={{ width: 38, height: 38, borderRadius: '50%', background: '#1a3a15', color: '#f5e6c8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>
                        {m.de[0]}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 14, fontWeight: 700, color: '#1a3a15' }}>{m.de}</div>
                        <div style={{ fontSize: 13, color: '#666', lineHeight: 1.4 }}>{m.msg.substring(0, 55)}...</div>
                        <div style={{ fontSize: 11, color: '#aaa', marginTop: 2 }}>{m.temps}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* COMMANDES */}
          {onglet === 'commandes' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
                <h1 style={{ fontSize: 28, fontWeight: 900, color: '#1a3a15', margin: 0, fontFamily: 'Georgia, serif' }}>📦 Commandes</h1>
                <div style={{ fontSize: 14, color: '#888' }}>47 commandes ce mois</div>
              </div>
              <div style={{ background: 'white', borderRadius: 16, boxShadow: '0 2px 10px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr 1fr 90px 90px', gap: 0, padding: '14px 24px', background: '#f9f9f9', borderBottom: '1px solid #eee', fontSize: 12, fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  <span>#</span><span>Client</span><span>Produits</span><span>Total</span><span>Statut</span>
                </div>
                {commandes.map((c, i) => {
                  const s = statutStyle[c.statut]
                  return (
                    <div key={c.id} style={{ display: 'grid', gridTemplateColumns: '80px 1fr 1fr 90px 90px', gap: 0, padding: '18px 24px', borderBottom: i < commandes.length - 1 ? '1px solid #f5f5f5' : 'none', alignItems: 'center' }}>
                      <span style={{ fontSize: 14, fontWeight: 700, color: '#1a3a15' }}>{c.id}</span>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 600, color: '#333' }}>{c.client}</div>
                        <div style={{ fontSize: 12, color: '#aaa' }}>{c.date}</div>
                      </div>
                      <div style={{ fontSize: 13, color: '#666' }}>{c.produits}</div>
                      <span style={{ fontSize: 15, fontWeight: 800, color: '#1a3a15' }}>{c.total}</span>
                      <span style={{ background: s.bg, color: s.color, fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 20, display: 'inline-block' }}>{s.label}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* PRODUITS */}
          {onglet === 'produits' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
                <h1 style={{ fontSize: 28, fontWeight: 900, color: '#1a3a15', margin: 0, fontFamily: 'Georgia, serif' }}>🥕 Mes produits</h1>
                <button style={{ background: '#1a3a15', color: '#f5e6c8', border: 'none', padding: '10px 20px', borderRadius: 8, fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>+ Ajouter un produit</button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {produits.map(p => {
                  const s = statutStyle[p.statut]
                  const stockActuel = stockEdit[p.id] ?? p.stock
                  return (
                    <div key={p.id} style={{ background: 'white', borderRadius: 14, padding: '18px 24px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', gap: 18 }}>
                      <img src={p.img} alt={p.nom} style={{ width: 64, height: 64, borderRadius: 10, objectFit: 'cover', flexShrink: 0 }}
                        onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none' }} />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 16, fontWeight: 700, color: '#1a3a15', marginBottom: 4 }}>{p.nom}</div>
                        <div style={{ fontSize: 13, color: '#888' }}>{p.ventes} vendus ce mois · {p.prix}/{p.unite}</div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ fontSize: 13, color: '#888' }}>Stock :</span>
                        <button onClick={() => updateStock(p.id, Math.max(0, stockActuel - 1))}
                          style={{ width: 28, height: 28, border: '1px solid #ddd', background: 'white', borderRadius: 6, cursor: 'pointer', fontSize: 16, fontWeight: 700, color: '#1a3a15' }}>−</button>
                        <span style={{ fontSize: 16, fontWeight: 800, color: '#1a3a15', minWidth: 32, textAlign: 'center' }}>{stockActuel}</span>
                        <button onClick={() => updateStock(p.id, stockActuel + 1)}
                          style={{ width: 28, height: 28, border: '1px solid #ddd', background: 'white', borderRadius: 6, cursor: 'pointer', fontSize: 16, fontWeight: 700, color: '#1a3a15' }}>+</button>
                        <span style={{ fontSize: 13, color: '#888' }}>{p.unite}</span>
                      </div>
                      <span style={{ background: s.bg, color: s.color, fontSize: 12, fontWeight: 700, padding: '5px 12px', borderRadius: 20, flexShrink: 0 }}>{s.label}</span>
                      <button style={{ background: 'none', border: '1px solid #ddd', padding: '6px 14px', borderRadius: 8, fontSize: 13, cursor: 'pointer', color: '#555', flexShrink: 0 }}>✏️ Modifier</button>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* MESSAGES */}
          {onglet === 'messages' && (
            <div>
              <h1 style={{ fontSize: 28, fontWeight: 900, color: '#1a3a15', margin: '0 0 28px 0', fontFamily: 'Georgia, serif' }}>💬 Messages</h1>
              <div style={{ background: 'white', borderRadius: 16, boxShadow: '0 2px 10px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
                {messages.map((m, i) => (
                  <div key={i} style={{ display: 'flex', gap: 16, padding: '20px 24px', borderBottom: i < messages.length - 1 ? '1px solid #f5f5f5' : 'none', background: !m.lu ? '#fafff8' : 'white', alignItems: 'flex-start', cursor: 'pointer' }}>
                    <div style={{ width: 46, height: 46, borderRadius: '50%', background: '#1a3a15', color: '#f5e6c8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, fontWeight: 700, flexShrink: 0, fontFamily: 'Georgia, serif' }}>
                      {m.de[0]}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                        <span style={{ fontSize: 15, fontWeight: !m.lu ? 800 : 600, color: '#1a3a15' }}>{m.de}</span>
                        <span style={{ fontSize: 12, color: '#aaa' }}>{m.temps}</span>
                      </div>
                      <p style={{ fontSize: 14, color: m.lu ? '#888' : '#444', margin: 0, lineHeight: 1.5 }}>{m.msg}</p>
                    </div>
                    {!m.lu && <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#1a3a15', flexShrink: 0, marginTop: 6 }} />}
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </main>
  )
}
