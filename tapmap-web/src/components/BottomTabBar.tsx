'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { HopIcon } from '@/components/icons'

const tabs = [
  { href: '/breweries', label: 'Breweries' },
  { href: '/beers', label: 'Beers' },
  { href: '/styles', label: 'Styles' },
]

export default function BottomTabBar() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-10 flex h-16 md:hidden items-stretch border-t border-border bg-card">
      {tabs.map(({ href, label }) => {
        const isActive = pathname.startsWith(href)
        return (
          <Link
            key={href}
            href={href}
            className={`flex flex-1 flex-col items-center justify-center gap-1 text-xs font-medium ${
              isActive ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            <HopIcon className="w-5 h-5" />
            {label}
          </Link>
        )
      })}
    </nav>
  )
}
