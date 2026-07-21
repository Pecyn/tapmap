import { print } from 'graphql'
import type { ResultOf } from '@graphql-typed-document-node/core'
import StyleCard from '@/components/StyleCard'
import { StylesQuery } from './queries'

type StylesResponse = {
  data?: ResultOf<typeof StylesQuery>
  errors?: { message: string }[]
}

export const revalidate = 3600

export default async function StylesPage() {
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL!, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: print(StylesQuery),
      variables: { limit: 100, offset: 0 },
    }),
  })

  if (!res.ok) {
    throw new Error(`Failed to fetch styles: ${res.status}`)
  }

  const json = (await res.json()) as StylesResponse

  if (json.errors) {
    throw new Error(json.errors[0]?.message ?? 'Failed to fetch styles')
  }

  const styles = json.data!.styles

  return (
    <main className="flex-1 p-8">
      <h1 className="text-2xl font-semibold text-foreground">Styles</h1>
      {styles.length === 0 ? (
        <p className="mt-6 text-muted-foreground">No styles found.</p>
      ) : (
        <div className="mt-6 flex flex-col gap-4">
          {styles.map((style) => (
            <StyleCard key={style.id} style={style} />
          ))}
        </div>
      )}
    </main>
  )
}
