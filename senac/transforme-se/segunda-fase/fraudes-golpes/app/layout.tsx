import React from "react"
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'

import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'VerifiCA - Proteção Contra Golpes Digitais',
  description: 'Plataforma de verificação e proteção digital contra fraudes online. Aprenda a identificar riscos, verificar informações e proteger seus dados.',
  keywords: ['golpes digitais', 'fraude online', 'segurança digital', 'proteção de dados', 'phishing', 'cibersegurança'],
}

export const viewport: Viewport = {
  themeColor: '#0a0f1a',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} font-sans antialiased`}>{children}</body>
    </html>
  )
}
