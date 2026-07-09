import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import Navigation from '@/components/Navigation'
import BottomTabBar from '@/components/BottomTabBar'
import { ApolloClientProvider } from '@/lib/apollo-provider'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'TapMap',
  description: 'Discover breweries, beers, and styles near you.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <ApolloClientProvider>
          <Navigation />
          <div className="flex flex-col flex-1 pb-16 md:pb-0">{children}</div>
          <BottomTabBar />
        </ApolloClientProvider>
      </body>
    </html>
  )
}
