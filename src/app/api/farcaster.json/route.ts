import { NextResponse } from 'next/server';

export async function GET() {
  // Return the Farcaster frame metadata in the format expected by the validator
  return NextResponse.json({
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
  }, {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

export async function OPTIONS() {
  // Handle preflight requests
  return NextResponse.json({}, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
