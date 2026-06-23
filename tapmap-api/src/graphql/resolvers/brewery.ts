import type { QueryBreweriesArgs, QueryBreweryArgs } from '../../../generated/graphql.js'
import { Prisma } from '../../generated/prisma/browser.js'
import { prisma } from '../../lib/prisma.js'

export const breweryResolvers = {
  Query: {
    breweries: async (_: unknown, { filter, limit, offset }: QueryBreweriesArgs) => {
      const where: Prisma.BreweryWhereInput = {}
      if (filter?.city != null) {
        where.city = { contains: filter.city, mode: 'insensitive' }
      }
      if (filter?.country != null) {
        where.country = filter.country
      }
      if (filter?.hasCoordinates === true) {
        where.latitude = { not: null }
        where.longitude = { not: null }
      } else if (filter?.hasCoordinates === false) {
        where.OR = [{ latitude: null }, { longitude: null }]
      }

      return prisma.brewery.findMany({
        where,
        take: limit ?? 20,
        skip: offset ?? 0,
        orderBy: { name: 'asc' },
      })
    },

    brewery: (_: unknown, { id }: QueryBreweryArgs) => prisma.brewery.findUnique({ where: { id } }),
  },

  Brewery: {
    beers: (parent: { id: string }) =>
      prisma.beer.findMany({
        where: { breweryId: parent.id },
        orderBy: { name: 'asc' },
      }),
  },
}
