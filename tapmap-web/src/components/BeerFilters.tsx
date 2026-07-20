'use client'

import { useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useQuery } from '@apollo/client/react'
import { Slider } from '@/components/ui/slider'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { StylesForFilterQuery } from '@/app/beers/queries'

const ABV_MIN = 0
const ABV_MAX = 15
const ABV_STEP = 0.1

export default function BeerFilters() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const styleId = searchParams.get('styleId') ?? ''
  const abvFromUrl = readAbvRange(searchParams)

  // Local override while actively dragging; cleared once the drag commits,
  // so the displayed range always falls back to the URL-derived value.
  const [dragRange, setDragRange] = useState<[number, number] | null>(null)
  const abvRange = dragRange ?? abvFromUrl

  const { data, loading, error } = useQuery(StylesForFilterQuery)

  const styleItems: Record<string, string> = { '': 'All styles' }
  for (const style of data?.styles ?? []) {
    styleItems[style.id] = style.name
  }

  function updateParams(next: { styleId: string; minAbv: number; maxAbv: number }) {
    const params = new URLSearchParams(searchParams.toString())

    if (next.styleId) {
      params.set('styleId', next.styleId)
    } else {
      params.delete('styleId')
    }
    if (next.minAbv > ABV_MIN) {
      params.set('minAbv', next.minAbv.toFixed(1))
    } else {
      params.delete('minAbv')
    }
    if (next.maxAbv < ABV_MAX) {
      params.set('maxAbv', next.maxAbv.toFixed(1))
    } else {
      params.delete('maxAbv')
    }

    const query = params.toString()
    router.replace(query ? `${pathname}?${query}` : pathname)
  }

  function handleStyleChange(value: string) {
    updateParams({ styleId: value, minAbv: abvRange[0], maxAbv: abvRange[1] })
  }

  function handleAbvChange(value: number | readonly number[]) {
    if (!Array.isArray(value)) return
    setDragRange([value[0], value[1]])
  }

  function handleAbvCommit(value: number | readonly number[]) {
    if (!Array.isArray(value)) return
    const [min, max] = value
    setDragRange(null)
    updateParams({ styleId, minAbv: min, maxAbv: max })
  }

  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <h3 className="mb-3 text-sm font-bold text-card-foreground">Filters</h3>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
        <div className="flex flex-col gap-1">
          <label htmlFor="style-filter" className="text-sm font-medium text-card-foreground">
            Style
          </label>
          <Select
            items={styleItems}
            value={styleId}
            onValueChange={(value) => handleStyleChange(value ?? '')}
            disabled={loading}
          >
            <SelectTrigger id="style-filter" className="border-border bg-card text-card-foreground">
              <SelectValue placeholder="All styles" />
            </SelectTrigger>
            <SelectContent
              alignItemWithTrigger={false}
              className="border border-border bg-card text-card-foreground"
            >
              <SelectItem value="">All styles</SelectItem>
              {error && (
                <SelectItem value="__error__" disabled>
                  Failed to load styles
                </SelectItem>
              )}
              {data?.styles.map((style) => (
                <SelectItem key={style.id} value={style.id}>
                  {style.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-1 flex-col gap-1">
          <label className="text-sm font-medium text-card-foreground">
            ABV: {abvRange[0].toFixed(1)}% – {abvRange[1].toFixed(1)}%
          </label>
          <Slider
            value={abvRange}
            onValueChange={handleAbvChange}
            onValueCommitted={handleAbvCommit}
            min={ABV_MIN}
            max={ABV_MAX}
            step={ABV_STEP}
            minStepsBetweenValues={1}
            className="mt-2 max-w-md"
          />
        </div>
      </div>
    </div>
  )
}

function readAbvRange(searchParams: URLSearchParams): [number, number] {
  const min = Number(searchParams.get('minAbv'))
  const max = Number(searchParams.get('maxAbv'))
  return [
    searchParams.has('minAbv') && Number.isFinite(min) ? min : ABV_MIN,
    searchParams.has('maxAbv') && Number.isFinite(max) ? max : ABV_MAX,
  ]
}
