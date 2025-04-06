import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === '/.well-known/farcaster.json') {
    return NextResponse.json({
      version: 1,
      homeUrl: "https://aerodrome-alerts.vercel.app",
      iconUrl: "https://aerodrome-alerts.vercel.app/icon.png",
      imageUrl: "https://aerodrome-alerts.vercel.app/image.png",
      splashImageUrl: "https://aerodrome-alerts.vercel.app/splash.png",
      splashBackgroundColor: "#000000",
      webhookUrl: "https://aerodrome-alerts.vercel.app/api/webhook",
      buttonTitle: "View Position"
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    })
  }
  return NextResponse.next()
}

export const config = {
  matcher: '/.well-known/farcaster.json',
}
