import { graphql } from '@/generated'
import type { ResultOf } from '@graphql-typed-document-node/core'

export const BreweryQuery = graphql(`
  query Brewery($id: ID!) {
    brewery(id: $id) {
      id
      name
      city
      country
      foundedYear
      website
      beers {
        id
        name
        abv
        style {
          name
        }
      }
    }
  }
`)

export type BreweryDetail = NonNullable<ResultOf<typeof BreweryQuery>['brewery']>
export type BeerListItem = BreweryDetail['beers'][number]
