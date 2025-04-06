import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { untrustedData } = body;
    
    // Handle the frame interaction
    // For now, just return a simple response
    return NextResponse.json({
      message: "Frame interaction received",
      untrustedData
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  } catch (error) {
    console.error('Error processing frame:', error);
    return NextResponse.json({ error: 'Failed to process frame' }, { status: 500 });
  }
}

export async function GET() {
  // Handle GET requests (for metadata)
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
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

export async function OPTIONS() {
  // Handle preflight requests
  return NextResponse.json({}, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
