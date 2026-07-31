import { useMemo } from 'react'
import Supercluster from 'supercluster'
import type { BreweryPoint } from '@/components/Map'

export type ClusterBounds = [west: number, south: number, east: number, north: number]

type BreweryProperties = {
  breweryId: string
}

export function useBreweryClusters(
  breweries: BreweryPoint[],
  bounds: ClusterBounds | null,
  zoom: number,
) {
  const index = useMemo(() => {
    const points: Supercluster.PointFeature<BreweryProperties>[] = breweries.map((brewery) => ({
      type: 'Feature',
      properties: { breweryId: brewery.id },
      geometry: { type: 'Point', coordinates: [brewery.longitude, brewery.latitude] },
    }))

    const supercluster = new Supercluster<BreweryProperties>({ radius: 60, maxZoom: 14 })
    supercluster.load(points)
    return supercluster
  }, [breweries])

  const clusters = useMemo(() => {
    if (!bounds) return []
    return index.getClusters(bounds, Math.round(zoom))
  }, [index, bounds, zoom])

  return { clusters, index }
}
