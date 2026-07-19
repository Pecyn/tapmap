import type { QueryBeersArgs, QueryBeerArgs } from '../../../generated/graphql.js'
import { Prisma } from '../../generated/prisma/client.js'
import { prisma } from '../../lib/prisma.js'

export const beerResolvers = {
  Query: {
    beers: async (_: unknown, { filter, limit, offset }: QueryBeersArgs) => {
      const where: Prisma.BeerWhereInput = {}
      if (filter?.styleId != null) {
        where.styleId = filter.styleId
      }
      if (filter?.minAbv != null || filter?.maxAbv != null) {
        const abv: Prisma.FloatNullableFilter = {}
        if (filter?.minAbv != null) abv.gte = filter.minAbv
        if (filter?.maxAbv != null) abv.lte = filter.maxAbv
        where.abv = abv
      }
      return prisma.beer.findMany({
        where,
        take: limit ?? 20,
        skip: offset ?? 0,
        orderBy: { name: 'asc' },
        include: { brewery: true, style: true },
      })
    },

    beer: (_: unknown, { id }: QueryBeerArgs) =>
      prisma.beer.findUnique({
        where: { id },
        include: { brewery: true, style: true },
      }),
  },

  Beer: {
    brewery: (parent: { brewery: Record<string, unknown> }) => parent.brewery,
    style: (parent: { style: Record<string, unknown> }) => parent.style,
  },
}
