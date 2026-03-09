'use client'
import { useState } from 'react'
import Nav from '../../components/Nav'

// Données d'exemple pour Ferme Tremblay
const producteur = {
  id: 1,
  nom: 'Ferme Tremblay',
  proprio: 'Jean & Marie Tremblay',
  ville: 'Magog, Estrie',
  km: 8,
  type: '🌾 Ferme maraîchère',
  methode: '🌿 Biologique certifié',
  methodeBg: '#dcfce7',
  methodeColor: '#166534',
  depuis: '1987',
  generation: '3e génération',
  acres: 120,
  employes: 8,
  produits_count: 47,
  img_banniere: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=1200&h=400&fit=crop',
  img_portrait: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
  desc_courte: 'Depuis 3 générations, la famille Tremblay cultive ses terres avec passion. Spécialisés en légumes biologiques, leurs carottes sont légendaires dans toute l\'Estrie.',
  desc_longue: 'La Ferme Tremblay a été fondée en 1987 par Roger Tremblay, qui a transmis son amour de la terre à ses enfants Jean et Marie. Aujourd\'hui, ils cultivent 120 acres de terres fertiles à Magog, produisant plus de 47 variétés de légumes biologiques certifiés.\n\nLeur philosophie est simple : travailler avec la nature, pas contre elle. Pas de pesticides, pas d\'herbicides chimiques — seulement du compost maison, de la rotation des cultures et beaucoup de travail manuel. Leurs carottes sont récoltées à la main chaque matin et livrées le jour même.',
  certifications: ['🌿 Biologique certifié (Écocert)', '🚫 Sans pesticides', '🚫 Sans herbicides', '♻️ Compost maison', '💧 Irrigation naturelle', '🐝 Zones pollinisateurs'],
  produits: [
    { id: 1, nom: 'Carottes biologiques', prix: 3.50, unite: 'kg', stock: 'Abondant', sc: '#4ade80', img: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=300&h=200&fit=crop', badge: "Récolté aujourd'hui" },
    { id: 2, nom: 'Laitue Boston', prix: 2.50, unite: 'tête', stock: 'Abondant', sc: '#4ade80', img: 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=300&h=200&fit=crop', badge: '' },
    { id: 3, nom: 'Pommes de terre Yukon', prix: 4.00, unite: 'kg', stock: 'Limité', sc: '#fb923c', img: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=300&h=200&fit=crop', badge: 'Nouvelle récolte' },
    { id: 4, nom: 'Courgettes', prix: 3.00, unite: 'kg', stock: 'Abondant', sc: '#4ade80', img: 'https://images.unsplash.com/photo-1596097635121-14b63b7a0c19?w=300&h=200&fit=crop', badge: '' },
    { id: 5, nom: 'Tomates Heirloom', prix: 5.50, unite: 'kg', stock: 'Limité', sc: '#fb923c', img: 'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=300&h=200&fit=crop', badge: 'Coup de cœur' },
    { id: 6, nom: 'Maïs sucré', prix: 0.75, unite: 'épi', stock: 'Saison!', sc: '#facc15', img: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=300&h=200&fit=crop', badge: 'Saison!' },
  ],
  avis: [
    { nom: 'Sophie L.', note: 5, date: 'Mars 2025', texte: 'Les carottes sont incroyables — sucrées et fraîches comme jamais. On les commande toutes les semaines maintenant !', ville: 'Magog' },
    { nom: 'Restaurant Le Bémol', note: 5, date: 'Fév 2025', texte: 'Fournisseur principal de notre restaurant depuis 2 ans. Fiabilité et qualité irréprochables. Nos clients adorent savoir d\'où viennent les légumes.', ville: 'Sherbrooke' },
    { nom: 'Marie-Ève T.', note: 5, date: 'Jan 2025', texte: 'Jean est venu personnellement expliquer ses méthodes de culture à nos enfants. Une expérience mémorable !', ville: 'Compton' },
  ],
  galerie: [
    'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=400&h=280&fit=crop',
    'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=280&fit=crop',
    'https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?w=400&h=280&fit=crop',
    'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&h=280&fit=crop',
  ],
}

export default function ProducteurPage() {
  const [cartItems, setCartItems] = useState<number[]>([])
  const [suivi, setSuivi] = useState(false)
  const [onglet, setOnglet] = useState<'produits' | 'histoire' | 'avis' | 'galerie'>('produits')

  const addToCart = (id: number) => setCartItems(p => p.includes(id) ? p : [...p, id])

  return (
    <main style={{ fontFamily: 'Georgia, serif', background: '#faf7f0', minHeight: '100vh' }}>

      <Nav page="producteurs" />

      {/* BANNIÈRE */}
      <div style={{ position: 'relative', height: 320, overflow: 'hidden' }}>
        <img src={producteur.img_banniere} alt={producteur.nom} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(26,58,21,0.85))' }} />
        <div style={{ position: 'absolute', bottom: 28, left: '5%', right: '5%', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 20 }}>
            <img src={producteur.img_portrait} alt={producteur.proprio}
              style={{ width: 90, height: 90, borderRadius: '50%', border: '4px solid white', objectFit: 'cover', flexShrink: 0 }}
              onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none' }} />
            <div>
              <div style={{ display: 'flex', gap: 8, marginBottom: 6, flexWrap: 'wrap' }}>
                <span style={{ background: 'rgba(26,42,21,0.85)', color: '#f5e6c8', fontSize: 12, fontFamily: 'system-ui', fontWeight: 700, padding: '4px 12px', borderRadius: 20 }}>{producteur.type}</span>
                <span style={{ background: producteur.methodeBg, color: producteur.methodeColor, fontSize: 12, fontFamily: 'system-ui', fontWeight: 700, padding: '4px 12px', borderRadius: 20 }}>{producteur.methode}</span>
              </div>
              <h1 style={{ fontSize: 'clamp(26px,4vw,42px)', fontWeight: 900, color: 'white', margin: 0, lineHeight: 1.1 }}>{producteur.nom}</h1>
              <div style={{ fontSize: 15, color: 'rgba(255,255,255,0.7)', fontFamily: 'system-ui', marginTop: 4 }}>
                {producteur.proprio} · 📍 {producteur.ville} · {producteur.km} km de vous
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={() => setSuivi(s => !s)}
              style={{ background: suivi ? '#f5e6c8' : 'rgba(255,255,255,0.15)', color: suivi ? '#1a3a15' : 'white', border: '2px solid rgba(255,255,255,0.4)', padding: '10px 20px', borderRadius: 8, fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'system-ui', backdropFilter: 'blur(4px)' }}>
              {suivi ? '✓ Suivi' : '♡ Suivre'}
            </button>
            <button style={{ background: '#f5e6c8', color: '#1a3a15', border: 'none', padding: '10px 20px', borderRadius: 8, fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'system-ui' }}>
              💬 Contacter
            </button>
          </div>
        </div>
      </div>

      {/* STATS RAPIDES */}
      <div style={{ background: '#1a3a15', padding: '20px 5%' }}>
        <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap' }}>
          {[
            { num: `Depuis ${producteur.depuis}`, lbl: `${producteur.generation}` },
            { num: `${producteur.acres}`, lbl: 'Acres cultivés' },
            { num: `${producteur.produits_count}`, lbl: 'Produits' },
            { num: `${producteur.employes}`, lbl: 'Employés locaux' },
            { num: '⭐ 4.9', lbl: '47 avis' },
          ].map(s => (
            <div key={s.lbl}>
              <div style={{ fontSize: 20, fontWeight: 800, color: '#f5e6c8' }}>{s.num}</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', fontFamily: 'system-ui' }}>{s.lbl}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ONGLETS */}
      <div style={{ background: 'white', borderBottom: '2px solid #f0f0f0', padding: '0 5%' }}>
        <div style={{ display: 'flex', gap: 0 }}>
          {([['produits', '🛒 Produits'], ['histoire', '📖 Notre histoire'], ['avis', '⭐ Avis'], ['galerie', '📷 Galerie']] as const).map(([id, label]) => (
            <button key={id} onClick={() => setOnglet(id)}
              style={{ padding: '18px 24px', border: 'none', background: 'transparent', fontSize: 15, fontFamily: 'system-ui', fontWeight: onglet === id ? 700 : 400, color: onglet === id ? '#1a3a15' : '#888', borderBottom: onglet === id ? '3px solid #1a3a15' : '3px solid transparent', cursor: 'pointer', marginBottom: -2 }}>
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* CONTENU */}
      <div style={{ padding: '48px 5%', maxWidth: 1100, margin: '0 auto' }}>

        {/* PRODUITS */}
        {onglet === 'produits' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28, flexWrap: 'wrap', gap: 12 }}>
              <h2 style={{ fontSize: 28, fontWeight: 900, color: '#1a3a15', margin: 0 }}>Produits disponibles</h2>
              <div style={{ fontSize: 14, color: '#888', fontFamily: 'system-ui' }}>Mis à jour ce matin · {producteur.produits_count} produits au total</div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 22 }}>
              {producteur.produits.map(p => (
                <div key={p.id} style={{ background: 'white', borderRadius: 14, overflow: 'hidden', border: '1px solid #eee', boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}>
                  <div style={{ position: 'relative', height: 170, overflow: 'hidden', background: '#f0faf0' }}>
                    <img src={p.img} alt={p.nom} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none' }} />
                    {p.badge && <div style={{ position: 'absolute', top: 10, left: 10, background: '#1a3a15', color: '#f5e6c8', fontSize: 11, fontFamily: 'system-ui', fontWeight: 700, padding: '3px 10px', borderRadius: 4 }}>{p.badge}</div>}
                    <div style={{ position: 'absolute', top: 10, right: 10, background: p.sc, color: 'white', fontSize: 11, fontFamily: 'system-ui', fontWeight: 700, padding: '3px 10px', borderRadius: 4 }}>● {p.stock}</div>
                  </div>
                  <div style={{ padding: '16px 18px' }}>
                    <div style={{ fontSize: 16, fontWeight: 700, color: '#1a3a15', marginBottom: 10 }}>{p.nom}</div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <span style={{ fontSize: 22, fontWeight: 900, color: '#1a3a15' }}>{p.prix.toFixed(2)}$</span>
                        <span style={{ fontSize: 13, color: '#999', fontFamily: 'system-ui' }}>/{p.unite}</span>
                      </div>
                      <button onClick={() => addToCart(p.id)} style={{ background: cartItems.includes(p.id) ? '#2d5a27' : '#1a3a15', color: 'white', border: 'none', padding: '9px 16px', borderRadius: 8, fontSize: 14, cursor: 'pointer', fontFamily: 'system-ui', fontWeight: 700 }}>
                        {cartItems.includes(p.id) ? '✓ Ajouté' : '+ Panier'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* HISTOIRE */}
        {onglet === 'histoire' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 48, alignItems: 'start' }}>
            <div>
              <h2 style={{ fontSize: 30, fontWeight: 900, color: '#1a3a15', marginBottom: 20 }}>Notre histoire</h2>
              {producteur.desc_longue.split('\n\n').map((para, i) => (
                <p key={i} style={{ fontSize: 17, color: '#555', fontFamily: 'system-ui', lineHeight: 1.8, marginBottom: 20 }}>{para}</p>
              ))}
              <h3 style={{ fontSize: 20, fontWeight: 800, color: '#1a3a15', marginTop: 36, marginBottom: 16 }}>Nos certifications & méthodes</h3>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                {producteur.certifications.map(c => (
                  <span key={c} style={{ background: '#f0faf0', color: '#2d5a27', fontSize: 14, fontFamily: 'system-ui', fontWeight: 600, padding: '8px 16px', borderRadius: 24, border: '1px solid #c8e8c8' }}>{c}</span>
                ))}
              </div>
            </div>
            <div>
              <div style={{ background: 'white', borderRadius: 16, padding: 28, boxShadow: '0 2px 16px rgba(0,0,0,0.08)', marginBottom: 20 }}>
                <div style={{ fontSize: 16, fontWeight: 800, color: '#1a3a15', marginBottom: 18 }}>En chiffres</div>
                {[
                  { label: 'Fondée en', val: producteur.depuis },
                  { label: 'Génération', val: producteur.generation },
                  { label: 'Superficie', val: `${producteur.acres} acres` },
                  { label: 'Employés locaux', val: `${producteur.employes} personnes` },
                  { label: 'Variétés cultivées', val: `${producteur.produits_count}+` },
                  { label: 'Distance de vous', val: `${producteur.km} km` },
                ].map(item => (
                  <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #f5f5f5', fontSize: 15, fontFamily: 'system-ui' }}>
                    <span style={{ color: '#888' }}>{item.label}</span>
                    <span style={{ fontWeight: 700, color: '#1a3a15' }}>{item.val}</span>
                  </div>
                ))}
              </div>
              <button style={{ width: '100%', background: '#1a3a15', color: '#f5e6c8', border: 'none', padding: '14px', borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'system-ui' }}>
                📅 Visiter la ferme
              </button>
            </div>
          </div>
        )}

        {/* AVIS */}
        {onglet === 'avis' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 36, flexWrap: 'wrap' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 56, fontWeight: 900, color: '#1a3a15' }}>4.9</div>
                <div style={{ fontSize: 24, color: '#facc15' }}>★★★★★</div>
                <div style={{ fontSize: 14, color: '#888', fontFamily: 'system-ui' }}>47 avis</div>
              </div>
              <div style={{ flex: 1, minWidth: 200 }}>
                {[5, 4, 3, 2, 1].map(note => (
                  <div key={note} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                    <span style={{ fontSize: 13, color: '#888', fontFamily: 'system-ui', minWidth: 16 }}>{note}</span>
                    <span style={{ color: '#facc15', fontSize: 13 }}>★</span>
                    <div style={{ flex: 1, height: 8, background: '#f0f0f0', borderRadius: 4, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: note === 5 ? '88%' : note === 4 ? '10%' : '2%', background: '#1a3a15', borderRadius: 4 }} />
                    </div>
                    <span style={{ fontSize: 13, color: '#aaa', fontFamily: 'system-ui', minWidth: 30 }}>
                      {note === 5 ? '41' : note === 4 ? '5' : '1'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              {producteur.avis.map((avis, i) => (
                <div key={i} style={{ background: 'white', borderRadius: 14, padding: '24px 28px', boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, flexWrap: 'wrap', gap: 8 }}>
                    <div>
                      <span style={{ fontSize: 16, fontWeight: 700, color: '#1a3a15' }}>{avis.nom}</span>
                      <span style={{ fontSize: 13, color: '#aaa', fontFamily: 'system-ui', marginLeft: 10 }}>· {avis.ville}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ color: '#facc15', fontSize: 16 }}>{'★'.repeat(avis.note)}</span>
                      <span style={{ fontSize: 13, color: '#bbb', fontFamily: 'system-ui' }}>{avis.date}</span>
                    </div>
                  </div>
                  <p style={{ fontSize: 15, color: '#555', fontFamily: 'system-ui', lineHeight: 1.7, margin: 0 }}>{avis.texte}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* GALERIE */}
        {onglet === 'galerie' && (
          <div>
            <h2 style={{ fontSize: 28, fontWeight: 900, color: '#1a3a15', marginBottom: 24 }}>Photos de la ferme</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
              {producteur.galerie.map((src, i) => (
                <div key={i} style={{ borderRadius: 14, overflow: 'hidden', height: 220, cursor: 'pointer' }}>
                  <img src={src} alt={`Photo ${i+1}`} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.3s' }}
                    onMouseEnter={e => (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.05)'}
                    onMouseLeave={e => (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)'}
                    onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none' }} />
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </main>
  )
}
