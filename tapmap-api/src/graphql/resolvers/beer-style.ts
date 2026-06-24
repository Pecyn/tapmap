import type { QueryStyleArgs, QueryStylesArgs } from '../../../generated/graphql.js'
import { prisma } from '../../lib/prisma.js'

export const beerStyleResolvers = {
  Query: {
    styles: (_: unknown, { limit, offset }: QueryStylesArgs) =>
      prisma.beerStyle.findMany({
        take: limit ?? 20,
        skip: offset ?? 0,
        orderBy: { name: 'asc' },
      }),

    style: (_: unknown, { id }: QueryStyleArgs) => prisma.beerStyle.findUnique({ where: { id } }),
  },

  BeerStyle: {
    beers: (parent: { id: string }) =>
      prisma.beer.findMany({
        where: { styleId: parent.id },
        orderBy: { name: 'asc' },
      }),
  },
}
