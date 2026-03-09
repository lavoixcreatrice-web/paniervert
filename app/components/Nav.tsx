'use client'
import { useState, useEffect } from 'react'

interface NavProps {
  page?: 'accueil' | 'carte' | 'producteurs' | 'panier' | 'dashboard' | 'inscription'
}

export default function Nav({ page }: NavProps) {
  const [menuOuvert, setMenuOuvert] = useState(false)
  const [mobile, setMobile] = useState(false)

  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const liens = [
    { href: '/', label: 'Accueil', id: 'accueil' },
    { href: '/carte', label: '🗺️ Carte', id: 'carte' },
    { href: '/producteurs', label: '👨‍🌾 Producteurs', id: 'producteurs' },
  ]

  return (
    <>
      <nav style={{ background: '#1a3a15', padding: '0 4%', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 1000, boxShadow: '0 2px 12px rgba(0,0,0,0.2)' }}>

        {/* LOGO */}
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
          <span style={{ fontSize: 22 }}>🌱</span>
          <span style={{ fontFamily: 'Georgia, serif', fontSize: 19, fontWeight: 700, color: '#f5e6c8' }}>Panier Vert</span>
        </a>

        {/* LIENS DESKTOP */}
        {!mobile && (
          <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
            {liens.map(l => (
              <a key={l.id} href={l.href} style={{ color: page === l.id ? '#f5e6c8' : 'rgba(245,230,200,0.6)', fontSize: 14, fontFamily: 'system-ui', textDecoration: 'none', fontWeight: page === l.id ? 700 : 400, borderBottom: page === l.id ? '2px solid #4ade80' : '2px solid transparent', paddingBottom: 2 }}>
                {l.label}
              </a>
            ))}
          </div>
        )}

        {/* DROITE DESKTOP */}
        {!mobile && (
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <a href="/dashboard" style={{ color: 'rgba(245,230,200,0.6)', fontSize: 13, fontFamily: 'system-ui', textDecoration: 'none', padding: '6px 12px', borderRadius: 6 }}>Dashboard</a>
            <a href="/inscription" style={{ background: 'rgba(245,230,200,0.15)', color: '#f5e6c8', border: '1.5px solid rgba(245,230,200,0.3)', padding: '7px 16px', borderRadius: 6, fontSize: 13, fontFamily: 'system-ui', fontWeight: 700, textDecoration: 'none' }}>+ Vendre</a>
            <a href="/panier" style={{ background: '#2d5a27', color: 'white', padding: '8px 18px', borderRadius: 6, fontSize: 14, fontFamily: 'system-ui', fontWeight: 700, textDecoration: 'none' }}>🧺 Panier</a>
          </div>
        )}

        {/* DROITE MOBILE */}
        {mobile && (
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <a href="/panier" style={{ background: '#2d5a27', color: 'white', padding: '7px 14px', borderRadius: 6, fontSize: 13, fontFamily: 'system-ui', fontWeight: 700, textDecoration: 'none' }}>🧺</a>
            <button onClick={() => setMenuOuvert(!menuOuvert)}
              style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: '#f5e6c8', width: 40, height: 40, borderRadius: 8, cursor: 'pointer', fontSize: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {menuOuvert ? '✕' : '☰'}
            </button>
          </div>
        )}
      </nav>

      {/* MENU MOBILE DÉROULANT */}
      {mobile && menuOuvert && (
        <div style={{ position: 'fixed', top: 64, left: 0, right: 0, background: '#1a3a15', zIndex: 999, boxShadow: '0 8px 24px rgba(0,0,0,0.3)', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          {liens.map(l => (
            <a key={l.id} href={l.href} onClick={() => setMenuOuvert(false)}
              style={{ display: 'block', padding: '16px 5%', color: page === l.id ? '#f5e6c8' : 'rgba(245,230,200,0.6)', fontFamily: 'system-ui', fontSize: 16, textDecoration: 'none', fontWeight: page === l.id ? 700 : 400, borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
              {l.label}
            </a>
          ))}
          <a href="/dashboard" onClick={() => setMenuOuvert(false)}
            style={{ display: 'block', padding: '16px 5%', color: 'rgba(245,230,200,0.6)', fontFamily: 'system-ui', fontSize: 16, textDecoration: 'none', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
            📊 Dashboard
          </a>
          <div style={{ padding: '16px 5%' }}>
            <a href="/inscription" onClick={() => setMenuOuvert(false)}
              style={{ display: 'block', background: '#f5e6c8', color: '#1a3a15', padding: '14px', borderRadius: 8, fontFamily: 'system-ui', fontSize: 15, fontWeight: 700, textDecoration: 'none', textAlign: 'center' }}>
              + Créer ma boutique
            </a>
          </div>
        </div>
      )}
    </>
  )
}
