import { print } from 'graphql'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { ResultOf } from '@graphql-typed-document-node/core'
import { BeerQuery } from './queries'

type BeerResponse = {
  data?: ResultOf<typeof BeerQuery>
  errors?: { message: string }[]
}

type BeerPageProps = {
  params: Promise<{ id: string }>
}

export default async function BeerPage({ params }: BeerPageProps) {
  const { id } = await params

  const res = await fetch(process.env.NEXT_PUBLIC_API_URL!, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: print(BeerQuery),
      variables: { id },
    }),
    cache: 'no-store',
  })

  if (!res.ok) {
    throw new Error(`Failed to fetch beer: ${res.status}`)
  }

  const json = (await res.json()) as BeerResponse

  if (json.errors) {
    throw new Error(json.errors[0]?.message ?? 'Failed to fetch beer')
  }

  const beer = json.data!.beer

  if (!beer) {
    notFound()
  }

  return (
    <main className="flex-1 p-8">
      <h1 className="text-2xl font-semibold text-foreground">{beer.name}</h1>
      <p className="mt-2 text-muted-foreground">
        {beer.abv != null && `${beer.abv.toFixed(1)}%`}
        {beer.abv != null && beer.ibu != null && ' · '}
        {beer.ibu != null && `IBU ${beer.ibu}`}
      </p>
      {beer.description && <p className="mt-4 text-foreground">{beer.description}</p>}

      <h2 className="mt-4 text-lg font-semibold text-foreground">Style</h2>
      <p className="mt-2 text-foreground">{beer.style.name}</p>
      {beer.style.description && (
        <p className="mt-1 text-sm text-muted-foreground">{beer.style.description}</p>
      )}

      <h2 className="mt-4 text-lg font-semibold text-foreground">Brewery</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        <Link href={`/breweries/${beer.brewery.id}`} className="text-primary">
          {beer.brewery.name}
        </Link>
      </p>
    </main>
  )
}
