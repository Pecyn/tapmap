import { print } from 'graphql'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { ResultOf } from '@graphql-typed-document-node/core'
import { StyleQuery } from './queries'

type StyleResponse = {
  data?: ResultOf<typeof StyleQuery>
  errors?: { message: string }[]
}

type StylePageProps = {
  params: Promise<{ id: string }>
}

export default async function StylePage({ params }: StylePageProps) {
  const { id } = await params

  const res = await fetch(process.env.NEXT_PUBLIC_API_URL!, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: print(StyleQuery),
      variables: { id },
    }),
    cache: 'no-store',
  })

  if (!res.ok) {
    throw new Error(`Failed to fetch style: ${res.status}`)
  }

  const json = (await res.json()) as StyleResponse

  if (json.errors) {
    throw new Error(json.errors[0]?.message ?? 'Failed to fetch style')
  }

  const style = json.data!.style

  if (!style) {
    notFound()
  }

  return (
    <main className="flex-1 p-8">
      <h1 className="text-2xl font-semibold text-foreground">{style.name}</h1>
      {style.description && <p className="mt-4 text-foreground">{style.description}</p>}

      <h2 className="mt-8 text-lg font-semibold text-foreground">Beers</h2>
      {style.beers.length === 0 ? (
        <p className="mt-4 text-muted-foreground">No beers in this style yet.</p>
      ) : (
        <div className="mt-4 flex flex-col gap-2">
          {style.beers.map((beer) => (
            <Link
              key={beer.id}
              href={`/beers/${beer.id}`}
              className="block rounded-lg border border-border bg-card p-4 text-card-foreground"
            >
              <p className="font-medium">{beer.name}</p>
              <p className="text-sm text-muted-foreground">
                {beer.brewery.name}
                {beer.abv != null && ` · ${beer.abv.toFixed(1)}%`}
              </p>
            </Link>
          ))}
        </div>
      )}
    </main>
  )
}
