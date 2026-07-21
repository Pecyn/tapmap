import { print } from 'graphql'
import Link from 'next/link'
import type { ResultOf } from '@graphql-typed-document-node/core'
import { HopIcon } from '@/components/icons'
import { HomeStatsQuery } from './queries'

type HomeStatsResponse = {
  data?: ResultOf<typeof HomeStatsQuery>
  errors?: { message: string }[]
}

export const revalidate = 3600

export default async function Home() {
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL!, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: print(HomeStatsQuery) }),
  })

  if (!res.ok) {
    throw new Error(`Failed to fetch home stats: ${res.status}`)
  }

  const json = (await res.json()) as HomeStatsResponse

  if (json.errors) {
    throw new Error(json.errors[0]?.message ?? 'Failed to fetch home stats')
  }

  const { breweries, beers, styles } = json.data!

  const stats = [
    { label: 'breweries', count: breweries.length },
    { label: 'beers', count: beers.length },
    { label: 'styles', count: styles.length },
  ]

  return (
    <main className="flex flex-1 flex-col items-center justify-center bg-background p-8 text-foreground">
      <div className="mx-auto flex max-w-xl flex-col items-center text-center">
        <HopIcon className="h-10 w-10 text-primary" />

        <h1 className="mt-4 text-3xl font-semibold">TapMap</h1>

        <p className="mt-2 text-lg text-muted-foreground">
          Discover Czech craft breweries, beers, and styles.
        </p>

        <p className="mt-4 text-sm text-muted-foreground">
          A catalog of Czech breweries, their beers, and the styles behind them — built from open
          data, mapped for exploring.
        </p>

        <div className="mt-8 flex gap-8 sm:gap-12">
          {stats.map(({ label, count }) => (
            <div key={label} className="flex flex-col items-center">
              <span className="font-mono text-2xl font-semibold text-foreground">{count}</span>
              <span className="text-xs text-muted-foreground">{label}</span>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/breweries"
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/80"
          >
            Browse breweries
          </Link>
          <Link
            href="/beers"
            className="rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium hover:bg-muted"
          >
            Browse beers
          </Link>
        </div>
      </div>
    </main>
  )
}
