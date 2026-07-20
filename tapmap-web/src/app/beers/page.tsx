import { print } from 'graphql'
import type { ResultOf } from '@graphql-typed-document-node/core'
import BeerCard from '@/components/BeerCard'
import BeerFilters from '@/components/BeerFilters'
import { BeersQuery } from './queries'

type BeersResponse = {
  data?: ResultOf<typeof BeersQuery>
  errors?: { message: string }[]
}

type BeersPageProps = {
  searchParams: Promise<{ styleId?: string; minAbv?: string; maxAbv?: string }>
}

export default async function BeersPage({ searchParams }: BeersPageProps) {
  const { styleId, minAbv, maxAbv } = await searchParams

  const parsedStyleId = styleId && styleId.length > 0 ? styleId : undefined
  const parsedMinAbv = minAbv !== undefined ? Number.parseFloat(minAbv) : undefined
  const parsedMaxAbv = maxAbv !== undefined ? Number.parseFloat(maxAbv) : undefined

  const hasActiveFilter =
    parsedStyleId !== undefined ||
    (parsedMinAbv !== undefined && Number.isFinite(parsedMinAbv)) ||
    (parsedMaxAbv !== undefined && Number.isFinite(parsedMaxAbv))

  const filter = hasActiveFilter
    ? {
        styleId: parsedStyleId,
        minAbv: Number.isFinite(parsedMinAbv) ? parsedMinAbv : undefined,
        maxAbv: Number.isFinite(parsedMaxAbv) ? parsedMaxAbv : undefined,
      }
    : undefined

  const res = await fetch(process.env.NEXT_PUBLIC_API_URL!, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: print(BeersQuery),
      variables: { filter, limit: 50, offset: 0 },
    }),
    cache: 'no-store',
  })

  if (!res.ok) {
    throw new Error(`Failed to fetch beers: ${res.status}`)
  }

  const json = (await res.json()) as BeersResponse

  if (json.errors) {
    throw new Error(json.errors[0]?.message ?? 'Failed to fetch beers')
  }

  const beers = json.data!.beers

  return (
    <main className="flex-1 p-8">
      <h1 className="text-2xl font-semibold text-foreground">Beers</h1>
      <div className="mt-4">
        <BeerFilters />
      </div>
      {beers.length === 0 ? (
        <p className="mt-6 text-muted-foreground">
          {hasActiveFilter ? 'No beers match the selected filters.' : 'No beers found.'}
        </p>
      ) : (
        <div className="mt-6 flex flex-col gap-4">
          {beers.map((beer) => (
            <BeerCard key={beer.id} beer={beer} />
          ))}
        </div>
      )}
    </main>
  )
}
