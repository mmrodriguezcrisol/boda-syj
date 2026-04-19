import type { Metadata, Viewport } from 'next'
import { Inter, Great_Vibes, Cormorant_SC } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const fraunces = Great_Vibes({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-fraunces',
  display: 'swap',
})

const cormorantSC = Cormorant_SC({ 
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-cormorant-sc',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Simón & Josefina | 21 · 22 Mayo 2026',
  description: 'Te invitamos a celebrar nuestro casamiento. Simón & Josefina - 21 y 22 de Mayo de 2026, Buenos Aires, Argentina.',
  generator: 'v0.app',
  keywords: ['casamiento', 'boda', 'Simón', 'Josefina', 'Buenos Aires', '2026'],
  authors: [{ name: 'Simón & Josefina' }],
  openGraph: {
    title: 'Simón & Josefina | Nos Casamos',
    description: 'Te invitamos a celebrar nuestro casamiento - 21 y 22 de Mayo de 2026',
    type: 'website',
    locale: 'es_AR',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#2D3D2E',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es-AR" className={`${inter.variable} ${fraunces.variable} ${cormorantSC.variable} bg-[#F6F4EE]`}>
      <body className="font-sans antialiased bg-[#F6F4EE] text-[#1F1F1A]">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
