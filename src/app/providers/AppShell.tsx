'use client'

import type { ReactNode } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Badge } from '@/components/ui/badge'
import { cn } from '@/shared/lib/utils'

const NAV_ITEMS = [
  { href: '/news', label: 'News' },
  { href: '/favorites', label: 'Favorites' },
  { href: '/settings', label: 'Settings' },
]

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-20 border-b border-ink/10 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-ink text-white">
              N
            </div>
            <div>
              <p className="font-display text-lg font-semibold">Newswire</p>
              <p className="text-xs uppercase tracking-wide text-ink/50">Web Preview</p>
            </div>
          </div>
          <Badge variant="secondary">v1</Badge>
        </div>
        <nav className="mx-auto flex max-w-6xl gap-3 px-6 pb-4">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'rounded-full px-4 py-2 text-sm font-semibold transition',
                  isActive
                    ? 'bg-ink text-white'
                    : 'border border-ink/10 bg-white/70 text-ink hover:bg-ink/5',
                )}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8">{children}</main>
    </div>
  )
}
