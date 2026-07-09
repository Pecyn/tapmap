import Link from 'next/link'
import type { Brewery } from '@/app/breweries/queries'

type BreweryCardProps = {
  brewery: Brewery
}

export default function BreweryCard({ brewery }: BreweryCardProps) {
  return (
    <Link
      href={`/breweries/${brewery.id}`}
      className="block rounded-lg border border-border bg-card p-4 text-card-foreground"
    >
      <h2 className="text-lg font-semibold">{brewery.name}</h2>
      <p className="text-sm text-muted-foreground">
        {[brewery.city, brewery.country].filter(Boolean).join(', ')}
      </p>
      <p className="mt-2 text-sm text-muted-foreground">{brewery.beers.length} beers</p>
    </Link>
  )
}
