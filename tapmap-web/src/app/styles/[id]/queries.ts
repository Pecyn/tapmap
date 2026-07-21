import { graphql } from '@/generated'
import type { ResultOf } from '@graphql-typed-document-node/core'

export const StyleQuery = graphql(`
  query Style($id: ID!) {
    style(id: $id) {
      id
      name
      description
      beers {
        id
        name
        abv
        brewery {
          id
          name
        }
      }
    }
  }
`)

export type StyleDetail = NonNullable<ResultOf<typeof StyleQuery>['style']>
export type StyleBeerListItem = StyleDetail['beers'][number]
