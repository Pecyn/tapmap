import { print } from 'graphql'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { ResultOf } from '@graphql-typed-document-node/core'
import { BreweryQuery } from './queries'

type BreweryResponse = {
  data?: ResultOf<typeof BreweryQuery>
  errors?: { message: string }[]
}

type BreweryPageProps = {
  params: Promise<{ id: string }>
}

export default async function BreweryPage({ params }: BreweryPageProps) {
  const { id } = await params

  const res = await fetch(process.env.NEXT_PUBLIC_API_URL!, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: print(BreweryQuery),
      variables: { id },
    }),
    cache: 'no-store',
  })

  if (!res.ok) {
    throw new Error(`Failed to fetch brewery: ${res.status}`)
  }

  const json = (await res.json()) as BreweryResponse

  if (json.errors) {
    throw new Error(json.errors[0]?.message ?? 'Failed to fetch brewery')
  }

  const brewery = json.data!.brewery

  if (!brewery) {
    notFound()
  }

  return (
    <main className="flex-1 p-8">
      <h1 className="text-2xl font-semibold text-foreground">{brewery.name}</h1>
      <p className="mt-2 text-muted-foreground">
        {[brewery.city, brewery.country].filter(Boolean).join(', ')}
      </p>
      {brewery.foundedYear != null && (
        <p className="mt-1 text-sm text-muted-foreground">Founded {brewery.foundedYear}</p>
      )}
      {brewery.website && (
        <a
          href={brewery.website}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 inline-block text-sm text-primary"
        >
          {brewery.website}
        </a>
      )}

      <h2 className="mt-8 text-lg font-semibold text-foreground">Beers</h2>
      {brewery.beers.length === 0 ? (
        <p className="mt-4 text-muted-foreground">No beers listed for this brewery yet.</p>
      ) : (
        <div className="mt-4 flex flex-col gap-2">
          {brewery.beers.map((beer) => (
            <Link
              key={beer.id}
              href={`/beers/${beer.id}`}
              className="block rounded-lg border border-border bg-card p-4 text-card-foreground"
            >
              <p className="font-medium">{beer.name}</p>
              <p className="text-sm text-muted-foreground">
                {beer.style.name}
                {beer.abv != null && ` · ${beer.abv.toFixed(1)}%`}
              </p>
            </Link>
          ))}
        </div>
      )}
    </main>
  )
}
