import { print } from 'graphql'
import type { ResultOf } from '@graphql-typed-document-node/core'
import BeerCard from '@/components/BeerCard'
import { BeersQuery } from './queries'

type BeersResponse = {
  data?: ResultOf<typeof BeersQuery>
  errors?: { message: string }[]
}

export default async function BeersPage() {
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL!, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: print(BeersQuery),
      variables: { filter: undefined, limit: 50, offset: 0 },
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
      {beers.length === 0 ? (
        <p className="mt-6 text-muted-foreground">No beers found.</p>
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
