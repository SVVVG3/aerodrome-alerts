import { NextResponse } from 'next/server'

export async function GET() {
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
