'use client'

import { useState } from 'react'
import { Map as MapLibre, Marker } from 'react-map-gl/maplibre'
import 'maplibre-gl/dist/maplibre-gl.css'
import { HopIcon } from '@/components/icons'
import type { BreweryWithCoordinates } from '@/app/breweries/queries'

type MapProps = {
  breweries?: BreweryWithCoordinates[]
}

type BreweryPoint = Omit<BreweryWithCoordinates, 'latitude' | 'longitude'> & {
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

export default function Map({ breweries = [] }: MapProps) {
  const maptilerKey = process.env.NEXT_PUBLIC_MAPTILER_KEY

  if (!maptilerKey) {
    return (
      <div className="flex h-[350px] w-full items-center justify-center rounded-lg border border-border bg-card p-4 text-card-foreground md:h-[500px]">
        <p className="text-sm text-muted-foreground">
          Map unavailable: NEXT_PUBLIC_MAPTILER_KEY is not set.
        </p>
      </div>
    )
  }

  const points = breweries.filter(
    (brewery): brewery is BreweryPoint => brewery.latitude != null && brewery.longitude != null,
  )

  return (
    <div className="h-[350px] w-full overflow-hidden rounded-lg border border-border md:h-[500px]">
      <MapLibre
        initialViewState={{ longitude: 15.5, latitude: 49.8, zoom: 6.5 }}
        mapStyle={`https://api.maptiler.com/maps/streets-v2/style.json?key=${maptilerKey}`}
        style={{ width: '100%', height: '100%' }}
      >
        {points.map((brewery) => (
          <BreweryMarker key={brewery.id} brewery={brewery} />
        ))}
      </MapLibre>
    </div>
  )
}
