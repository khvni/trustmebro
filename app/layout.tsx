import type { Metadata } from 'next'
import { Playfair_Display, Libre_Baskerville, Old_Standard_TT } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const libreBaskerville = Libre_Baskerville({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-libre-baskerville',
  display: 'swap',
})

const oldStandard = Old_Standard_TT({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-old-standard',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'The Trustmebro Times',
  description: 'All the News That\'s Totally Real',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${libreBaskerville.variable} ${oldStandard.variable}`}>
        {children}
      </body>
    </html>
  )
}
