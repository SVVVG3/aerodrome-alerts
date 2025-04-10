import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Position Details - Aerodrome Alerts',
  description: 'View your Aerodrome position details and status',
  openGraph: {
    title: 'Position Details - Aerodrome Alerts',
    description: 'View your Aerodrome position details and status',
    images: ['/og-image.png'],
  },
  other: {
    'fc:frame': 'vNext',
    'fc:frame:image': 'https://aerodrome-alerts.vercel.app/og-image.png',
    'fc:frame:button:1': 'View Position',
    'fc:frame:post_url': 'https://aerodrome-alerts.vercel.app/api/frame',
  },
}

export default function PositionLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
