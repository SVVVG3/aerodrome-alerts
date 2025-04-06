import { Inter } from 'next/font/google'
import './globals.css'
import { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Aerodrome Alerts',
  description: 'Track your Aerodrome positions and get notified when they fall out of range',
  metadataBase: new URL('https://aerodrome-alerts.vercel.app'),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script type="module">
          {`
            import { sdk } from 'https://esm.sh/@farcaster/frame-sdk'
            
            // Initialize the SDK
            sdk.init({
              appName: 'Aerodrome Alerts',
              appIcon: 'https://aerodrome-alerts.vercel.app/icon.png',
            })
          `}
        </script>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
