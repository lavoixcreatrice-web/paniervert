'use client'
import { useState } from 'react'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import Link from 'next/link'

// Données statiques — à remplacer par une vraie DB plus tard
const produits: Record<string, any> = {
  '1': {
    id: 1, nom: 'Carottes bio', prix: 3.50, prixPromo: 1.75, surplus: true, bio: true,
    categorie: 'Légumes & Fruits', unite: 'botte', dispo: 48,
    producteur: { nom: 'Ferme Tremblay', ville: 'Magog', note: 4.9, avis: 127, id: 'ferme-tremblay', emoji: '🌾' },
    description: 'Carottes biologiques cultivées sans pesticides dans les terres riches de la région de Magog. Récoltées à la main chaque matin pour garantir une fraîcheur maximale. Idéales crues, cuites à la vapeur ou en jus.',
    details: { poids: '500g', conservation: '2 semaines au frigo', origine: 'Magog, Estrie', certification: 'Biologique Québec' },
    images: [
      'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=600&q=80',
      'https://images.unsplash.com/photo-1447175008436-054170c2e979?w=600&q=80',
      'https://images.unsplash.com/photo-1582515073490-39981397c445?w=600&q=80',
    ],
    avis: [
      { nom: 'Sophie L.', note: 5, date: 'Il y a 2 jours', texte: 'Incroyablement sucrées et croquantes ! Je commande chaque semaine.' },
      { nom: 'Marc B.', note: 5, date: 'Il y a 1 semaine', texte: 'Qualité bio excellente. Livraison rapide au point de collecte.' },
      { nom: 'Julie P.', note: 4, date: 'Il y a 2 semaines', texte: 'Très bonnes carottes, bien fraîches. Je recommande.' },
    ],
    similaires: [
      { id: 7, nom: 'Laitue Boston', prix: 1.25, image: 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=200&q=80', emoji: '🥬' },
      { id: 12, nom: 'Courges butternut', prix: 1.50, image: 'https://images.unsplash.com/photo-1570586437263-ab629fccc818?w=200&q=80', emoji: '🎃' },
      { id: 13, nom: 'Tomates cerises', prix: 5.00, image: 'https://images.unsplash.com/photo-1546470427-227c5b2e1bc8?w=200&q=80', emoji: '🍅' },
    ]
  },
  '2': {
    id: 2, nom: 'Fromage Compton', prix: 14.00, surplus: false, bio: false,
    categorie: 'Produits laitiers', unite: '200g', dispo: 22,
    producteur: { nom: 'Fromagerie Compton', ville: 'Compton', note: 4.8, avis: 89, id: 'fromagerie-compton', emoji: '🧀' },
    description: 'Fromage artisanal affiné à la cave pendant 60 jours minimum. Fabriqué avec le lait de vaches de race Holstein élevées en pâturage. Croûte naturelle, pâte semi-ferme avec des notes noisetées et beurrées.',
    details: { poids: '200g', conservation: '3 semaines au frigo', origine: 'Compton, Estrie', certification: 'Artisanal' },
    images: [
      'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=600&q=80',
      'https://images.unsplash.com/photo-1452195100486-9cc805987862?w=600&q=80',
    ],
    avis: [
      { nom: 'Pierre R.', note: 5, date: 'Il y a 3 jours', texte: 'Le meilleur fromage de l\'Estrie. Un vrai coup de cœur !' },
      { nom: 'Anne M.', note: 5, date: 'Il y a 5 jours', texte: 'Parfait avec un bon verre de vin local.' },
    ],
    similaires: [
      { id: 9, nom: 'Œufs fermiers', prix: 6.00, image: 'https://images.unsplash.com/photo-1518569656558-1f25e69d2fd4?w=200&q=80', emoji: '🥚' },
      { id: 14, nom: 'Beurre fermier', prix: 8.00, image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=200&q=80', emoji: '🧈' },
    ]
  },
}

// Produit par défaut si l'id n'existe pas
const produitDefaut = produits['1']

export default function ProduitPage({ params }: { params: { id: string } }) {
  const produit = produits[params?.id] || produitDefaut
  const [imageActive, setImageActive] = useState(0)
  const [quantite, setQuantite] = useState(1)
  const [ajoute, setAjoute] = useState(false)
  const [onglet, setOnglet] = useState<'description' | 'details' | 'avis'>('description')

  const prixFinal = produit.prixPromo || produit.prix

  const ajouterAuPanier = () => {
    setAjoute(true)
    setTimeout(() => setAjoute(false), 2000)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f5f0e8', fontFamily: 'Georgia, serif' }}>
      <Nav page="marche" />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}>

        {/* Fil d'Ariane */}
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 24, fontFamily: 'system-ui', fontSize: 13, color: '#888' }}>
          <Link href="/" style={{ color: '#888', textDecoration: 'none' }}>Accueil</Link>
          <span>›</span>
          <Link href="/marche" style={{ color: '#888', textDecoration: 'none' }}>Marché</Link>
          <span>›</span>
          <span style={{ color: '#1a3a15', fontWeight: 600 }}>{produit.nom}</span>
        </div>

        {/* Section principale */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, marginBottom: 48 }}>

          {/* Galerie photos */}
          <div>
            <div style={{
              borderRadius: 20, overflow: 'hidden', marginBottom: 12,
              aspectRatio: '1', background: '#e8e0d0'
            }}>
              <img
                src={produit.images[imageActive]}
                alt={produit.nom}
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'opacity 0.3s' }}
              />
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              {produit.images.map((img: string, i: number) => (
                <div
                  key={i}
                  onClick={() => setImageActive(i)}
                  style={{
                    width: 72, height: 72, borderRadius: 10, overflow: 'hidden',
                    cursor: 'pointer', border: imageActive === i ? '3px solid #1a3a15' : '3px solid transparent',
                    transition: 'border 0.2s'
                  }}
                >
                  <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              ))}
            </div>
          </div>

          {/* Infos produit */}
          <div>
            {/* Badges */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
              {produit.surplus && (
                <span style={{ background: '#dc2626', color: 'white', padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 700, fontFamily: 'system-ui' }}>
                  🔥 SURPLUS DU JOUR
                </span>
              )}
              {produit.bio && (
                <span style={{ background: '#166534', color: 'white', padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 700, fontFamily: 'system-ui' }}>
                  🌿 CERTIFIÉ BIO
                </span>
              )}
            </div>

            <p style={{ fontSize: 13, color: '#888', fontFamily: 'system-ui', marginBottom: 6 }}>
              {produit.categorie}
            </p>
            <h1 style={{ fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 700, color: '#1a1a1a', marginBottom: 16, lineHeight: 1.2 }}>
              {produit.nom}
            </h1>

            {/* Note */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <div style={{ display: 'flex', gap: 2 }}>
                {[1,2,3,4,5].map(i => (
                  <span key={i} style={{ fontSize: 18, color: i <= Math.floor(produit.producteur.note) ? '#f59e0b' : '#ddd' }}>★</span>
                ))}
              </div>
              <span style={{ fontFamily: 'system-ui', fontSize: 14, color: '#666' }}>
                {produit.producteur.note} · {produit.producteur.avis} avis
              </span>
            </div>

            {/* Prix */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 24 }}>
              <span style={{ fontSize: 40, fontWeight: 700, color: produit.prixPromo ? '#dc2626' : '#1a3a15', fontFamily: 'system-ui' }}>
                {prixFinal.toFixed(2)}$
              </span>
              {produit.prixPromo && (
                <span style={{ fontSize: 22, color: '#999', textDecoration: 'line-through', fontFamily: 'system-ui' }}>
                  {produit.prix.toFixed(2)}$
                </span>
              )}
              <span style={{ fontSize: 15, color: '#888', fontFamily: 'system-ui' }}>/ {produit.unite}</span>
            </div>

            {/* Disponibilité */}
            <div style={{ background: '#e8f5e9', borderRadius: 10, padding: '10px 14px', marginBottom: 24, fontFamily: 'system-ui' }}>
              <span style={{ color: '#166534', fontSize: 13, fontWeight: 600 }}>
                ✓ En stock · {produit.dispo} {produit.unite}s disponibles
              </span>
            </div>

            {/* Quantité */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
              <span style={{ fontFamily: 'system-ui', fontSize: 14, color: '#555', fontWeight: 600 }}>Quantité :</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 0, border: '2px solid #1a3a15', borderRadius: 10, overflow: 'hidden' }}>
                <button
                  onClick={() => setQuantite(q => Math.max(1, q - 1))}
                  style={{ width: 40, height: 40, border: 'none', background: 'white', cursor: 'pointer', fontSize: 18, color: '#1a3a15', fontWeight: 700 }}
                >−</button>
                <span style={{ width: 40, textAlign: 'center', fontFamily: 'system-ui', fontWeight: 700, color: '#1a1a1a' }}>{quantite}</span>
                <button
                  onClick={() => setQuantite(q => q + 1)}
                  style={{ width: 40, height: 40, border: 'none', background: 'white', cursor: 'pointer', fontSize: 18, color: '#1a3a15', fontWeight: 700 }}
                >+</button>
              </div>
              <span style={{ fontFamily: 'system-ui', fontSize: 14, color: '#888' }}>
                = {(prixFinal * quantite).toFixed(2)}$
              </span>
            </div>

            {/* Boutons */}
            <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
              <button
                onClick={ajouterAuPanier}
                style={{
                  flex: 1, padding: '16px', borderRadius: 12, border: 'none',
                  background: ajoute ? '#166534' : '#1a3a15',
                  color: '#f5e6c8', cursor: 'pointer',
                  fontSize: 16, fontWeight: 700, fontFamily: 'system-ui',
                  transition: 'background 0.3s'
                }}
              >
                {ajoute ? '✓ Ajouté au panier !' : '🧺 Ajouter au panier'}
              </button>
              <Link href="/panier" style={{
                padding: '16px 20px', borderRadius: 12,
                border: '2px solid #1a3a15', color: '#1a3a15',
                textDecoration: 'none', fontFamily: 'system-ui',
                fontWeight: 600, fontSize: 14, display: 'flex', alignItems: 'center'
              }}>
                Commander →
              </Link>
            </div>

            {/* Producteur */}
            <Link href={`/producteurs/${produit.producteur.id}`} style={{ textDecoration: 'none' }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 14,
                background: 'white', borderRadius: 14, padding: '14px 18px',
                border: '2px solid #e8e0d0', transition: 'border-color 0.2s'
              }}>
                <div style={{
                  width: 50, height: 50, borderRadius: '50%',
                  background: '#1a3a15', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: 22, flexShrink: 0
                }}>
                  {produit.producteur.emoji}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 12, color: '#888', fontFamily: 'system-ui', marginBottom: 2 }}>Vendu par</p>
                  <p style={{ fontSize: 15, fontWeight: 700, color: '#1a1a1a', fontFamily: 'system-ui' }}>{produit.producteur.nom}</p>
                  <p style={{ fontSize: 12, color: '#666', fontFamily: 'system-ui' }}>📍 {produit.producteur.ville} · ⭐ {produit.producteur.note}</p>
                </div>
                <span style={{ color: '#888', fontSize: 20 }}>›</span>
              </div>
            </Link>
          </div>
        </div>

        {/* Onglets */}
        <div style={{ background: 'white', borderRadius: 20, overflow: 'hidden', marginBottom: 40, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
          <div style={{ display: 'flex', borderBottom: '2px solid #f0ebe0' }}>
            {(['description', 'details', 'avis'] as const).map(o => (
              <button
                key={o}
                onClick={() => setOnglet(o)}
                style={{
                  padding: '16px 24px', border: 'none', background: 'transparent',
                  fontFamily: 'system-ui', fontSize: 14, fontWeight: onglet === o ? 700 : 400,
                  color: onglet === o ? '#1a3a15' : '#666', cursor: 'pointer',
                  borderBottom: onglet === o ? '3px solid #1a3a15' : '3px solid transparent',
                  transition: 'all 0.2s'
                }}
              >
                {o === 'description' ? '📝 Description' : o === 'details' ? '📋 Détails' : `⭐ Avis (${produit.avis.length})`}
              </button>
            ))}
          </div>

          <div style={{ padding: '24px' }}>
            {onglet === 'description' && (
              <p style={{ fontSize: 16, lineHeight: 1.8, color: '#444', maxWidth: 700 }}>
                {produit.description}
              </p>
            )}

            {onglet === 'details' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>
                {Object.entries(produit.details).map(([cle, valeur]) => (
                  <div key={cle} style={{ background: '#f5f0e8', borderRadius: 12, padding: '14px 16px' }}>
                    <p style={{ fontSize: 11, color: '#888', fontFamily: 'system-ui', marginBottom: 4, textTransform: 'uppercase', letterSpacing: 1 }}>{cle}</p>
                    <p style={{ fontSize: 15, fontWeight: 600, color: '#1a1a1a', fontFamily: 'system-ui' }}>{valeur as string}</p>
                  </div>
                ))}
              </div>
            )}

            {onglet === 'avis' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {produit.avis.map((avis: any, i: number) => (
                  <div key={i} style={{ borderBottom: '1px solid #f0ebe0', paddingBottom: 16 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <div>
                        <span style={{ fontFamily: 'system-ui', fontWeight: 700, color: '#1a1a1a', fontSize: 14 }}>{avis.nom}</span>
                        <span style={{ marginLeft: 8, color: '#888', fontSize: 12, fontFamily: 'system-ui' }}>{avis.date}</span>
                      </div>
                      <div style={{ color: '#f59e0b' }}>{'★'.repeat(avis.note)}</div>
                    </div>
                    <p style={{ fontFamily: 'system-ui', color: '#555', fontSize: 14, lineHeight: 1.6 }}>{avis.texte}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Produits similaires */}
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 20, color: '#1a1a1a' }}>
            Vous aimerez aussi
          </h2>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            {produit.similaires.map((s: any) => (
              <Link key={s.id} href={`/marche/${s.id}`} style={{ textDecoration: 'none' }}>
                <div style={{
                  background: 'white', borderRadius: 14, overflow: 'hidden',
                  width: 180, boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                  transition: 'transform 0.2s'
                }}
                  onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)'}
                  onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'}
                >
                  <img src={s.image} alt={s.nom} style={{ width: '100%', height: 120, objectFit: 'cover' }} />
                  <div style={{ padding: '10px 12px' }}>
                    <p style={{ fontFamily: 'system-ui', fontWeight: 600, color: '#1a1a1a', fontSize: 13, marginBottom: 4 }}>{s.nom}</p>
                    <p style={{ fontFamily: 'system-ui', fontWeight: 700, color: '#1a3a15', fontSize: 15 }}>{s.prix.toFixed(2)}$</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
