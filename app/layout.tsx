import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import React from 'react'
import './globals.css'
import { Navigation } from '../components/Navigation'
import { Sidebar } from '../components/Sidebar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Anchor API Documentation',
  description: 'Identity Infrastructure for AI Agents - API and SDK Documentation',
  openGraph: {
    title: 'Anchor API Documentation',
    description: 'Identity Infrastructure for AI Agents',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-white">
          <Navigation />
          <div className="flex">
            <Sidebar />
            <main className="flex-1 lg:ml-56">
              <div className="max-w-3xl mx-auto px-6 py-6">
                {children}
              </div>
            </main>
          </div>
        </div>
      </body>
    </html>
  )
}

