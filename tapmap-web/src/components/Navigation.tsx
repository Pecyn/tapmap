'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { HopIcon } from '@/components/icons'

const navLinks = [
  { href: '/breweries', label: 'Breweries' },
  { href: '/beers', label: 'Beers' },
  { href: '/styles', label: 'Styles' },
  { href: '/dev/map', label: 'Map' },
]

export default function Navigation() {
  const pathname = usePathname()

  return (
    <header className="bg-foreground">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight text-background">
          <HopIcon className="w-5 h-5 text-secondary" />
          TapMap
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map(({ href, label }) => {
            const isActive = pathname.startsWith(href)
            return (
              <Link
                key={href}
                href={href}
                className={`border-b-2 pb-1 text-sm font-medium transition-colors ${
                  isActive
                    ? 'border-secondary text-secondary'
                    : 'border-transparent text-background hover:text-secondary'
                }`}
              >
                {label}
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
