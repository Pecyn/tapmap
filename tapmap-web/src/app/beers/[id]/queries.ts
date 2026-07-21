import { graphql } from '@/generated'
import type { ResultOf } from '@graphql-typed-document-node/core'

export const BeerQuery = graphql(`
  query Beer($id: ID!) {
    beer(id: $id) {
      id
      name
      abv
      ibu
      description
      brewery {
        id
        name
      }
      style {
        id
        name
        description
      }
    }
  }
`)

export type BeerDetail = NonNullable<ResultOf<typeof BeerQuery>['beer']>
