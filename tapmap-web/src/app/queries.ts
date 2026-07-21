import { graphql } from '@/generated'
import type { ResultOf } from '@graphql-typed-document-node/core'

export const HomeStatsQuery = graphql(`
  query HomeStats {
    breweries(limit: 300) {
      id
    }
    beers(limit: 100) {
      id
    }
    styles(limit: 100) {
      id
    }
  }
`)

export type HomeStats = ResultOf<typeof HomeStatsQuery>
