import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Aerodrome Alerts',
  description: 'Track your Aerodrome positions and get alerts',
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3001'),
  openGraph: {
    title: 'Aerodrome Alerts',
    description: 'Track your Aerodrome positions and get alerts',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aerodrome Alerts',
    description: 'Track your Aerodrome positions and get alerts',
    images: ['/og-image.png'],
  },
  other: {
    'fc:frame': 'vNext',
    'fc:frame:image': 'https://aerodrome-alerts.vercel.app/og-image.png',
    'fc:frame:button:1': 'View Position',
    'fc:frame:post_url': 'https://aerodrome-alerts.vercel.app/api/frame',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="https://aerodrome-alerts.vercel.app/og-image.png" />
        <meta property="fc:frame:button:1" content="View Position" />
        <meta property="fc:frame:post_url" content="https://aerodrome-alerts.vercel.app/api/frame" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
