'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useDebouncedValue } from '@/hooks/useDebouncedValue'

export default function BreweryFilters() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [city, setCity] = useState(() => searchParams.get('city') ?? '')
  const debouncedCity = useDebouncedValue(city, 400)

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())
    if (debouncedCity) {
      params.set('city', debouncedCity)
    } else {
      params.delete('city')
    }
    const query = params.toString()
    router.replace(query ? `${pathname}?${query}` : pathname)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedCity])

  return (
    <div className="flex flex-1 flex-col gap-1">
      <label htmlFor="city-filter" className="text-sm font-medium text-card-foreground">
        City
      </label>
      <input
        id="city-filter"
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Filter by city..."
        className="h-8 w-full rounded-lg border border-border bg-card px-4 py-1 text-sm text-card-foreground placeholder:text-muted-foreground"
      />
    </div>
  )
}
