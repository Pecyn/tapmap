import Link from 'next/link'
import type { Beer } from '@/app/beers/queries'

type BeerCardProps = {
  beer: Beer
}

export default function BeerCard({ beer }: BeerCardProps) {
  return (
    <Link
      href={`/beers/${beer.id}`}
      className="block rounded-lg border border-border bg-card p-4 text-card-foreground"
    >
      <h2 className="text-lg font-semibold">{beer.name}</h2>
      <p className="text-sm text-muted-foreground">{beer.brewery.name}</p>
      <p className="mt-2 text-sm text-muted-foreground">
        {beer.style.name}
        {beer.abv != null && ` · ${beer.abv.toFixed(1)}%`}
        {beer.ibu != null && ` · IBU ${beer.ibu}`}
      </p>
    </Link>
  )
}
