import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Panier Vert — Marché local Estrie',
  description: 'Connectez-vous directement aux producteurs locaux.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head><meta name="viewport" content="width=device-width, initial-scale=1" /></head>
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  )
}