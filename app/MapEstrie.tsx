'use client'
import { useEffect, useRef } from 'react'

const producers = [
  { lat: 45.269, lng: -72.141, type: 'ferme', name: 'Ferme Tremblay', detail: '🥕 Carottes, patates', ville: 'Magog' },
  { lat: 45.101, lng: -72.610, type: 'marche', name: 'Marché de Sutton', detail: '🛒 Marché public', ville: 'Sutton' },
  { lat: 45.237, lng: -71.826, type: 'ferme', name: 'Fromagerie Compton', detail: '🧀 Fromages fins', ville: 'Compton' },
  { lat: 45.404, lng: -71.893, type: 'resto', name: 'Resto Local Sherbrooke', detail: '🍽️ Cuisine du terroir', ville: 'Sherbrooke' },
  { lat: 45.217, lng: -72.517, type: 'collecte', name: 'Point collecte Lac-Brome', detail: '📦 Retrait local', ville: 'Lac-Brome' },
  { lat: 45.199, lng: -72.742, type: 'collecte', name: 'Point collecte Cowansville', detail: '📦 Retrait local', ville: 'Cowansville' },
  { lat: 45.317, lng: -72.217, type: 'ferme', name: 'Verger Bolduc', detail: '🍎 Pommes, poires', ville: 'Orford' },
  { lat: 45.350, lng: -72.100, type: 'ferme', name: 'Érablière Roy', detail: "🍁 Sirop d'érable", ville: 'Austin' },
  { lat: 45.280, lng: -72.350, type: 'marche', name: 'Marché de North Hatley', detail: '🛒 Marché public', ville: 'North Hatley' },
  { lat: 45.150, lng: -72.450, type: 'ferme', name: 'Rucher des Cantons', detail: '🍯 Miel artisanal', ville: 'Bromont' },
  { lat: 45.320, lng: -71.950, type: 'resto', name: 'Auberge Orford', detail: '🍽️ Table champêtre', ville: 'Mont-Orford' },
  { lat: 45.180, lng: -71.780, type: 'ferme', name: 'Ferme des Sommets', detail: '🥬 Légumes feuilles', ville: 'Bury' },
  { lat: 45.450, lng: -72.050, type: 'ferme', name: 'Jardins Fleuris', detail: '🌿 Fines herbes', ville: 'Lennoxville' },
  { lat: 45.060, lng: -72.700, type: 'marche', name: 'Marché Dunham', detail: '🛒 Marché viticole', ville: 'Dunham' },
  { lat: 45.380, lng: -72.450, type: 'ferme', name: 'Ferme Biopastorale', detail: '🥩 Viande bio', ville: 'Waterloo' },
]

const colors: Record<string, string> = {
  ferme: '#4ade80',
  resto: '#fb923c',
  marche: '#facc15',
  collecte: '#a78bfa',
}

const emojis: Record<string, string> = {
  ferme: '🌿',
  resto: '🍽️',
  marche: '🛒',
  collecte: '📦',
}

export default function MapEstrie() {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)

  useEffect(() => {
    if (typeof window === 'undefined' || !mapRef.current) return

    // Si la carte existe déjà, on la détruit d'abord
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove()
      mapInstanceRef.current = null
    }

    // Charger CSS Leaflet
    if (!document.querySelector('link[href*="leaflet"]')) {
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
      document.head.appendChild(link)
    }

    import('leaflet').then((L) => {
      if (!mapRef.current || mapInstanceRef.current) return

      // Nettoyer le conteneur si déjà utilisé par Leaflet
      const container = mapRef.current as any
      if (container._leaflet_id) {
        container._leaflet_id = null
      }

      const map = L.map(mapRef.current, {
        center: [45.27, -72.25],
        zoom: 10,
        zoomControl: true,
      })

      mapInstanceRef.current = map

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap',
        maxZoom: 19,
      }).addTo(map)

      producers.forEach((p) => {
        const color = colors[p.type]
        const emoji = emojis[p.type]

        const icon = L.divIcon({
          html: `
            <div style="position:relative;width:32px;height:40px;">
              <svg viewBox="0 0 32 40" width="32" height="40" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 0C7.2 0 0 7.2 0 16C0 26 16 40 16 40C16 40 32 26 32 16C32 7.2 24.8 0 16 0Z" fill="${color}" stroke="white" stroke-width="2"/>
                <circle cx="16" cy="16" r="9" fill="rgba(0,0,0,0.15)"/>
              </svg>
              <span style="position:absolute;top:5px;left:50%;transform:translateX(-50%);font-size:13px;line-height:1;">${emoji}</span>
            </div>`,
          className: '',
          iconSize: [32, 40],
          iconAnchor: [16, 40],
          popupAnchor: [0, -42],
        })

        L.marker([p.lat, p.lng], { icon }).addTo(map).bindPopup(`
          <div style="font-family:system-ui;min-width:160px;padding:4px;">
            <div style="font-weight:700;font-size:14px;color:#1a3a15;margin-bottom:4px;">${emoji} ${p.name}</div>
            <div style="font-size:12px;color:#555;margin-bottom:2px;">${p.detail}</div>
            <div style="font-size:11px;color:#999;margin-bottom:8px;">📍 ${p.ville}</div>
            <div style="background:${color}22;color:#1a3a15;border:1px solid ${color};padding:5px 10px;border-radius:4px;font-size:11px;font-weight:600;text-align:center;cursor:pointer;">
              Voir les produits →
            </div>
          </div>
        `, { maxWidth: 200 })
      })
    })

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [])

  return (
    <div style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.15)', boxShadow: '0 8px 32px rgba(0,0,0,0.4)' }}>
      <div style={{ background: '#0f1f0f', padding: '12px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ color: 'white', fontSize: 13, fontFamily: 'system-ui', fontWeight: 600 }}>🗺 Radar alimentaire — Estrie</span>
        <span style={{ background: '#4ade8022', color: '#4ade80', fontSize: 11, padding: '2px 10px', borderRadius: 10, fontFamily: 'system-ui', border: '1px solid #4ade8044' }}>
          ● {producers.length} producteurs
        </span>
      </div>
      <div ref={mapRef} style={{ height: 400, width: '100%' }} />
      <div style={{ background: '#0f1f0f', padding: '12px 18px', display: 'flex', gap: 18, flexWrap: 'wrap', alignItems: 'center' }}>
        <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 10, fontFamily: 'system-ui', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>Légende</span>
        {([['#4ade80', '🌿', 'Fermes'], ['#fb923c', '🍽️', 'Restaurants'], ['#facc15', '🛒', 'Marchés'], ['#a78bfa', '📦', 'Points de collecte']] as [string, string, string][]).map(([color, emoji, label]) => (
          <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
            <svg width="14" height="17" viewBox="0 0 32 40">
              <path d="M16 0C7.2 0 0 7.2 0 16C0 26 16 40 16 40C16 40 32 26 32 16C32 7.2 24.8 0 16 0Z" fill={color} />
            </svg>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)', fontFamily: 'system-ui' }}>{emoji} {label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
