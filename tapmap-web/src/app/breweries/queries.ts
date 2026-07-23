import { graphql } from '@/generated'
import type { ResultOf } from '@graphql-typed-document-node/core'

export const BreweriesQuery = graphql(`
  query Breweries($filter: BreweryFilter, $limit: Int, $offset: Int) {
    breweries(filter: $filter, limit: $limit, offset: $offset) {
      id
      name
      city
      country
      beers {
        id
      }
    }
  }
`)

export type Brewery = ResultOf<typeof BreweriesQuery>['breweries'][number]

export const BreweriesWithCoordinatesQuery = graphql(`
  query BreweriesWithCoordinates($filter: BreweryFilter) {
    breweries(filter: $filter, limit: 1000) {
      id
      name
      latitude
      longitude
    }
  }
`)

export type BreweryWithCoordinates = ResultOf<typeof BreweriesWithCoordinatesQuery>['breweries'][number]
