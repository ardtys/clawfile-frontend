import type { Metadata } from 'next'
import { IBM_Plex_Mono } from 'next/font/google'
import './globals.css'

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: 'ClawFile - File Encryption for AI Agents',
  description: 'File encryption built for AI agents. Secure handoffs between autonomous systems with zero-knowledge architecture.',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: 'ClawFile - File Encryption for AI Agents',
    description: 'The first file encryption protocol purpose-built for agent-to-agent communication. End-to-end encrypted, zero-knowledge, ephemeral by default.',
    siteName: 'ClawFile',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ClawFile - File Encryption for AI Agents',
    description: 'The first file encryption protocol purpose-built for agent-to-agent communication.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={ibmPlexMono.variable}>{children}</body>
    </html>
  )
}
