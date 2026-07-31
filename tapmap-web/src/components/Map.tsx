'use client'

import { useMemo, useState } from 'react'
import { Map as MapLibre, Marker, useMap } from 'react-map-gl/maplibre'
import type { MapEvent, ViewStateChangeEvent } from 'react-map-gl/maplibre'
import 'maplibre-gl/dist/maplibre-gl.css'
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

function BreweryMarker({ brewery }: { brewery: BreweryPoint }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Marker
      longitude={brewery.longitude}
      latitude={brewery.latitude}
      anchor="center"
      style={{ zIndex: isHovered ? 10 : 0 }}
    >
      <div
        // className="relative flex cursor-pointer items-center justify-center"
        className="relative flex h-7 w-7 items-center justify-center rounded-full bg-primary shadow-none"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* <HopIcon className="h-6 w-6 text-primary" /> */}
        <HopIcon className="h-5 w-5 text-primary-foreground" />
        {isHovered && (
          <div className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-1 -translate-x-1/2 whitespace-nowrap rounded-lg border border-border bg-card px-2 py-1 text-xs text-card-foreground">
            {brewery.name}
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
      <div className="flex h-[350px] w-full items-center justify-center rounded-lg border border-border bg-card p-4 text-card-foreground md:h-[500px]">
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

  return (
    <div className="h-[350px] w-full overflow-hidden rounded-lg border border-border md:h-[500px]">
      <MapLibre
        initialViewState={{ longitude: 15.5, latitude: 49.8, zoom: 6.5 }}
        mapStyle={`https://api.maptiler.com/maps/streets-v2/style.json?key=${maptilerKey}`}
        style={{ width: '100%', height: '100%' }}
        onLoad={handleMove}
        onMove={handleMove}
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
          return <BreweryMarker key={brewery.id} brewery={brewery} />
        })}
      </MapLibre>
    </div>
  )
}
