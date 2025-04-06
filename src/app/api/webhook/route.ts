import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Log the webhook data for debugging
    console.log('Farcaster webhook received:', body)
    
    // Here you would process the webhook data
    // For example, check if a user's position is out of range
    // and send them a notification
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error processing webhook:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
