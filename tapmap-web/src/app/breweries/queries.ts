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
