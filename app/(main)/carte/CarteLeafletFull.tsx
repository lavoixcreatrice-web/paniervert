'use client'
import { useEffect, useRef } from 'react'

interface Producteur {
  id: number
  nom: string
  ville: string
  km: number
  type: string
  note: number
  produits: number
  lat: number
  lng: number
  emoji: string
  desc: string
}

interface Props {
  producteurs: Producteur[]
  selectionne: number | null
  onSelect: (id: number) => void
  typeColors: Record<string, string>
}

let L: any = null

export default function CarteLeafletFull({ producteurs, selectionne, onSelect, typeColors }: Props) {
  const mapRef = useRef<any>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!containerRef.current) return

    // CSS Leaflet via CDN
    if (!document.getElementById('leaflet-css')) {
      const link = document.createElement('link')
      link.id = 'leaflet-css'
      link.rel = 'stylesheet'
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
      document.head.appendChild(link)
    }

    // Charger Leaflet
    import('leaflet').then((leaflet) => {
      L = leaflet.default

      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }

      if (!containerRef.current) return

      const map = L.map(containerRef.current, {
        center: [45.29, -72.25],
        zoom: 10,
        zoomControl: true,
      })

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap'
      }).addTo(map)

      mapRef.current = map

      (producteurs || []).forEach(p => {
        const color = typeColors[p.type] || '#4ade80'
        const isSelected = p.id === selectionne
        const size = isSelected ? 48 : 38

        const svgIcon = L.divIcon({
          html: `<div style="
            width:${size}px;height:${size}px;
            background:${isSelected ? '#1a3a15' : 'white'};
            border:3px solid ${isSelected ? '#f5e6c8' : color};
            border-radius:50%;
            display:flex;align-items:center;justify-content:center;
            font-size:${isSelected ? 22 : 18}px;
            box-shadow:0 3px 10px rgba(0,0,0,${isSelected ? 0.4 : 0.2});
            cursor:pointer;
          ">${p.emoji}</div>`,
          className: '',
          iconSize: [size, size],
          iconAnchor: [size / 2, size / 2],
        })

        const marker = L.marker([p.lat, p.lng], { icon: svgIcon })
          .addTo(map)
          .on('click', () => onSelect(p.id))

        marker.bindTooltip(`
          <div style="font-family:system-ui;padding:4px">
            <div style="font-weight:700;color:#1a3a15;font-size:13px">${p.nom}</div>
            <div style="color:#888;font-size:11px">${p.ville} · ${p.km} km · ⭐ ${p.note}</div>
          </div>
        `, { direction: 'top', offset: [0, -20] })
      })
    })

    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [producteurs, selectionne])

  return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
}

