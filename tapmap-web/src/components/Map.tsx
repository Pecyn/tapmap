'use client'

import { useMemo, useState } from 'react'
import { Map as MapLibre, Marker, useMap } from 'react-map-gl/maplibre'
import type { MapEvent, MarkerEvent, ViewStateChangeEvent } from 'react-map-gl/maplibre'
import 'maplibre-gl/dist/maplibre-gl.css'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { HopIcon } from '@/components/icons'
import type { BreweryWithCoordinates } from '@/app/breweries/queries'
import { useBreweryClusters, type ClusterBounds } from '@/hooks/useBreweryClusters'

type MapProps = {
  breweries?: BreweryWithCoordinates[]
}

export type BreweryPoint = Omit<BreweryWithCoordinates, 'latitude' | 'longitude'> & {
  latitude: number
  longitude: number
}

function BreweryMarker({
  brewery,
  isSelected,
  onSelect,
}: {
  brewery: BreweryPoint
  isSelected: boolean
  onSelect: (id: string | null) => void
}) {
  const router = useRouter()

  function handleClick(evt: MarkerEvent<MouseEvent>) {
    evt.originalEvent.stopPropagation()
    const target = evt.originalEvent.target as HTMLElement | null

    if (target?.closest('[data-marker-close]')) {
      onSelect(null)
      return
    }

    if (target?.closest('[data-marker-link]')) {
      const isModifiedClick =
        evt.originalEvent.metaKey ||
        evt.originalEvent.ctrlKey ||
        evt.originalEvent.shiftKey ||
        evt.originalEvent.altKey ||
        evt.originalEvent.button !== 0
      if (!isModifiedClick) {
        evt.originalEvent.preventDefault()
        router.push(`/breweries/${brewery.id}`)
      }
      return
    }

    onSelect(brewery.id)
  }

  return (
    <Marker
      longitude={brewery.longitude}
      latitude={brewery.latitude}
      anchor="center"
      style={{ zIndex: isSelected ? 10 : 0 }}
      onClick={handleClick}
    >
      <div className="relative flex cursor-pointer items-center justify-center">
        <HopIcon className={`h-6 w-6 text-primary transition-transform ${isSelected ? 'scale-110' : ''}`} />
        {isSelected && (
          <div className="absolute bottom-full left-1/2 z-10 mb-2 min-w-[180px] max-w-[240px] -translate-x-1/2 rounded-lg border border-border bg-card p-3 shadow-lg">
            <button
              type="button"
              data-marker-close
              aria-label="Close"
              className="absolute right-1 top-1 text-muted-foreground hover:text-foreground"
            >
              ×
            </button>
            <p className="text-sm font-bold text-card-foreground">{brewery.name}</p>
            {brewery.city && <p className="mt-0.5 text-xs text-muted-foreground">{brewery.city}</p>}
            <Link
              href={`/breweries/${brewery.id}`}
              data-marker-link
              className="mt-2 block w-full rounded-md bg-primary px-3 py-1.5 text-center text-xs font-medium text-primary-foreground hover:bg-primary/90"
            >
              Zobrazit detail
            </Link>
          </div>
        )}
      </div>
    </Marker>
  )
}

function ClusterMarker({
  longitude,
  latitude,
  clusterId,
  pointCount,
  index,
}: {
  longitude: number
  latitude: number
  clusterId: number
  pointCount: number
  index: ReturnType<typeof useBreweryClusters>['index']
}) {
  const { current: map } = useMap()

  function handleClick() {
    const expansionZoom = index.getClusterExpansionZoom(clusterId)
    map?.easeTo({ center: [longitude, latitude], zoom: expansionZoom })
  }

  return (
    <Marker longitude={longitude} latitude={latitude} anchor="center">
      <div
        className="relative flex cursor-pointer items-center justify-center transition-transform hover:scale-105"
        onClick={handleClick}
      >
        <HopIcon className="h-8 w-8 text-primary" />
        <span className="absolute -bottom-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full border-2 border-background bg-secondary px-1 font-mono text-xs font-bold text-secondary-foreground">
          {pointCount}
        </span>
      </div>
    </Marker>
  )
}

export default function Map({ breweries = [] }: MapProps) {
  const maptilerKey = process.env.NEXT_PUBLIC_MAPTILER_KEY
  const [bounds, setBounds] = useState<ClusterBounds | null>(null)
  const [zoom, setZoom] = useState(6.5)
  const [selectedBreweryId, setSelectedBreweryId] = useState<string | null>(null)

  const points = breweries.filter(
    (brewery): brewery is BreweryPoint => brewery.latitude != null && brewery.longitude != null,
  )

  const { clusters, index } = useBreweryClusters(points, bounds, zoom)
  const breweryById = useMemo(
    () => new globalThis.Map(points.map((brewery) => [brewery.id, brewery])),
    [points],
  )

  if (!maptilerKey) {
    return (
      <div className="flex h-[45vh] w-full items-center justify-center rounded-lg border border-border bg-card p-4 text-card-foreground md:h-full">
        <p className="text-sm text-muted-foreground">
          Map unavailable: NEXT_PUBLIC_MAPTILER_KEY is not set.
        </p>
      </div>
    )
  }

  function handleMove(evt: MapEvent | ViewStateChangeEvent) {
    const mapBounds = evt.target.getBounds()
    setBounds([mapBounds.getWest(), mapBounds.getSouth(), mapBounds.getEast(), mapBounds.getNorth()])
    setZoom(evt.target.getZoom())
  }

  function handleMapClick() {
    setSelectedBreweryId(null)
  }

  return (
    <div className="h-[45vh] w-full overflow-hidden rounded-lg border border-border md:h-full">
      <MapLibre
        initialViewState={{ longitude: 15.5, latitude: 49.8, zoom: 6.5 }}
        mapStyle={`https://api.maptiler.com/maps/streets-v2/style.json?key=${maptilerKey}`}
        style={{ width: '100%', height: '100%' }}
        onLoad={handleMove}
        onMove={handleMove}
        onClick={handleMapClick}
      >
        {clusters.map((feature) => {
          const [longitude, latitude] = feature.geometry.coordinates
          if ('cluster' in feature.properties) {
            return (
              <ClusterMarker
                key={`cluster-${feature.properties.cluster_id}`}
                longitude={longitude}
                latitude={latitude}
                clusterId={feature.properties.cluster_id}
                pointCount={feature.properties.point_count}
                index={index}
              />
            )
          }
          const brewery = breweryById.get(feature.properties.breweryId)
          if (!brewery) return null
          return (
            <BreweryMarker
              key={brewery.id}
              brewery={brewery}
              isSelected={selectedBreweryId === brewery.id}
              onSelect={setSelectedBreweryId}
            />
          )
        })}
      </MapLibre>
    </div>
  )
}
