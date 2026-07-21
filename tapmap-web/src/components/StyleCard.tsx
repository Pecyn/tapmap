import Link from 'next/link'
import type { Style } from '@/app/styles/queries'

type StyleCardProps = {
  style: Style
}

export default function StyleCard({ style }: StyleCardProps) {
  return (
    <Link
      href={`/styles/${style.id}`}
      className="block rounded-lg border border-border bg-card p-4 text-card-foreground"
    >
      <h2 className="text-lg font-semibold">{style.name}</h2>
      <p className="mt-2 text-sm text-muted-foreground">{style.beers.length} beers</p>
    </Link>
  )
}
