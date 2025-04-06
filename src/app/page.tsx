import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import type { Metadata } from 'next'
import Link from 'next/link'

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
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold mb-8">Aerodrome Alerts</h1>
        <p className="text-xl mb-8">Track your Aerodrome positions and get alerts</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Your Positions</h2>
            <p className="mb-4">View and monitor your Aerodrome LP positions</p>
            <Link href="/position/0x..." className="text-blue-600 hover:underline">
              View Positions →
            </Link>
          </div>
          
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Get Alerts</h2>
            <p className="mb-4">Set up alerts for your positions</p>
            <Link href="/alerts" className="text-blue-600 hover:underline">
              Configure Alerts →
            </Link>
          </div>
        </div>
        
        <div className="p-6 bg-gray-50 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Not Signed In</h2>
          <p className="mb-4">You're currently viewing the demo version of Aerodrome Alerts. Sign in to see your actual positions and set up alerts.</p>
          <button className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
            Sign In
          </button>
        </div>
      </div>
    </main>
  )
}
