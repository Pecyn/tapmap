import { print } from 'graphql'
import type { ResultOf } from '@graphql-typed-document-node/core'
import BreweryCard from '@/components/BreweryCard'
import BreweryFilters from '@/components/BreweryFilters'
import Map from '@/components/Map'
import SearchInput from '@/components/SearchInput'
import { BreweriesQuery, BreweriesWithCoordinatesQuery } from './queries'

type BreweriesResponse = {
  data?: ResultOf<typeof BreweriesQuery>
  errors?: { message: string }[]
}

type BreweriesWithCoordinatesResponse = {
  data?: ResultOf<typeof BreweriesWithCoordinatesQuery>
  errors?: { message: string }[]
}

type BreweriesPageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

// Temporary MVP cap — no pagination UI yet, ~247 breweries currently
// seeded so this comfortably covers "all of them" for now.
const BREWERIES_LIST_LIMIT = 300

export default async function BreweriesPage({ searchParams }: BreweriesPageProps) {
  const { search, city: cityParam } = await searchParams
  const name = typeof search === 'string' && search.length > 0 ? search : undefined
  const city = typeof cityParam === 'string' && cityParam.length > 0 ? cityParam : undefined
  const filter = name || city ? { ...(name && { name }), ...(city && { city }) } : undefined

  const [breweriesRes, mapRes] = await Promise.all([
    fetch(process.env.NEXT_PUBLIC_API_URL!, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: print(BreweriesQuery),
        variables: { filter, limit: BREWERIES_LIST_LIMIT, offset: 0 },
      }),
      cache: 'no-store',
    }),
    fetch(process.env.NEXT_PUBLIC_API_URL!, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: print(BreweriesWithCoordinatesQuery),
        variables: { filter: { hasCoordinates: true } },
      }),
      cache: 'no-store',
    }),
  ])

  if (!breweriesRes.ok) {
    throw new Error(`Failed to fetch breweries: ${breweriesRes.status}`)
  }
  if (!mapRes.ok) {
    throw new Error(`Failed to fetch brewery map data: ${mapRes.status}`)
  }

  const json = (await breweriesRes.json()) as BreweriesResponse
  const mapJson = (await mapRes.json()) as BreweriesWithCoordinatesResponse

  if (json.errors) {
    throw new Error(json.errors[0]?.message ?? 'Failed to fetch breweries')
  }
  if (mapJson.errors) {
    throw new Error(mapJson.errors[0]?.message ?? 'Failed to fetch brewery map data')
  }

  const breweries = json.data!.breweries
  const mapBreweries = mapJson.data!.breweries

  return (
    <main className="flex-1 p-8">
      <h1 className="text-2xl font-semibold text-foreground">Breweries</h1>
      <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-start md:gap-6">
        <div className="md:flex-1">
          <div className="rounded-lg border border-border bg-card p-4">
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
        </div>
        <div className="order-first w-full md:order-last md:sticky md:top-4 md:w-[40%]">
          <Map breweries={mapBreweries} />
        </div>
      </div>
    </main>
  )
}
