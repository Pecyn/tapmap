import { graphql } from '@/generated'
import type { ResultOf } from '@graphql-typed-document-node/core'

export const BeersQuery = graphql(`
  query Beers($filter: BeerFilter, $limit: Int, $offset: Int) {
    beers(filter: $filter, limit: $limit, offset: $offset) {
      id
      name
      abv
      ibu
      brewery {
        id
        name
      }
      style {
        id
        name
      }
    }
  }
`)

export type Beer = ResultOf<typeof BeersQuery>['beers'][number]
