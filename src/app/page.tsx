import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Aerodrome Alerts',
  description: 'Track your Aerodrome positions and get alerts',
  openGraph: {
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

export default async function Home() {
  const headersList = await headers()
  const userAgent = headersList.get('user-agent') || ''
  
  // Check if the request is coming from Farcaster
  if (userAgent.includes('Farcaster')) {
    return new NextResponse(
      JSON.stringify({
        name: "Aerodrome Alerts",
        description: "Track your Aerodrome positions and get alerts",
        image: "https://aerodrome-alerts.vercel.app/og-image.png",
        external_url: "https://aerodrome-alerts.vercel.app",
        frame: {
          image: "https://aerodrome-alerts.vercel.app/og-image.png",
          buttons: [
            {
              label: "View Position",
              action: "post"
            }
          ],
          post_url: "https://aerodrome-alerts.vercel.app/api/frame"
        }
      }),
      {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      }
    )
  }
  
  // Regular page content for non-Farcaster requests
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* Your existing page content */}
    </main>
  )
}
