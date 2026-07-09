import { print } from 'graphql'
import type { ResultOf } from '@graphql-typed-document-node/core'
import BreweryCard from '@/components/BreweryCard'
import { BreweriesQuery } from './queries'

type BreweriesResponse = {
  data?: ResultOf<typeof BreweriesQuery>
  errors?: { message: string }[]
}

export default async function BreweriesPage() {
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL!, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: print(BreweriesQuery),
      variables: { limit: 300, offset: 0 },
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
      {breweries.length === 0 ? (
        <p className="mt-6 text-muted-foreground">No breweries found.</p>
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
