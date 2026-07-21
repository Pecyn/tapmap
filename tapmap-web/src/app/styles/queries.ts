import { graphql } from '@/generated'
import type { ResultOf } from '@graphql-typed-document-node/core'

export const StylesQuery = graphql(`
  query Styles($limit: Int, $offset: Int) {
    styles(limit: $limit, offset: $offset) {
      id
      name
      beers {
        id
      }
    }
  }
`)

export type Style = ResultOf<typeof StylesQuery>['styles'][number]
