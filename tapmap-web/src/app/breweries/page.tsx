import { print } from 'graphql'
import type { ResultOf } from '@graphql-typed-document-node/core'
import BreweryCard from '@/components/BreweryCard'
import BreweryFilters from '@/components/BreweryFilters'
import SearchInput from '@/components/SearchInput'
import { BreweriesQuery } from './queries'

type BreweriesResponse = {
  data?: ResultOf<typeof BreweriesQuery>
  errors?: { message: string }[]
}

type BreweriesPageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function BreweriesPage({ searchParams }: BreweriesPageProps) {
  const { search, city: cityParam } = await searchParams
  const name = typeof search === 'string' && search.length > 0 ? search : undefined
  const city = typeof cityParam === 'string' && cityParam.length > 0 ? cityParam : undefined
  const filter = name || city ? { ...(name && { name }), ...(city && { city }) } : undefined

  const res = await fetch(process.env.NEXT_PUBLIC_API_URL!, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: print(BreweriesQuery),
      variables: { filter, limit: 300, offset: 0 },
    }),
    cache: 'no-store',
  })

  if (!res.ok) {
    throw new Error(`Failed to fetch breweries: ${res.status}`)
  }

  const json = (await res.json()) as BreweriesResponse

  if (json.errors) {
    throw new Error(json.errors[0]?.message ?? 'Failed to fetch breweries')
  }

  const breweries = json.data!.breweries

  return (
    <main className="flex-1 p-8">
      <h1 className="text-2xl font-semibold text-foreground">Breweries</h1>
      <div className="mt-4 rounded-lg border border-border bg-card p-4">
        <h3 className="mb-3 text-sm font-bold text-card-foreground">Filters</h3>
        <div className="flex flex-col gap-3 sm:flex-row">
          <SearchInput />
          <BreweryFilters />
        </div>
      </div>
      {breweries.length === 0 ? (
        <p className="mt-6 text-muted-foreground">
          {name || city ? 'No breweries match your filters.' : 'No breweries found.'}
        </p>
      ) : (
        <div className="mt-6 flex flex-col gap-4">
          {breweries.map((brewery) => (
            <BreweryCard key={brewery.id} brewery={brewery} />
          ))}
        </div>
      )}
    </main>
  )
}
