'use client'

import { Map as MapLibre } from 'react-map-gl/maplibre'
import 'maplibre-gl/dist/maplibre-gl.css'

export default function Map() {
  const maptilerKey = process.env.NEXT_PUBLIC_MAPTILER_KEY

  if (!maptilerKey) {
    return (
      <div className="flex h-[500px] w-full items-center justify-center rounded-lg border border-border bg-card p-4 text-card-foreground">
        <p className="text-sm text-muted-foreground">
          Map unavailable: NEXT_PUBLIC_MAPTILER_KEY is not set.
        </p>
      </div>
    )
  }

  return (
    <div className="h-[500px] w-full overflow-hidden rounded-lg border border-border">
      <MapLibre
        initialViewState={{ longitude: 15.5, latitude: 49.8, zoom: 6.5 }}
        mapStyle={`https://api.maptiler.com/maps/streets-v2/style.json?key=${maptilerKey}`}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  )
}
