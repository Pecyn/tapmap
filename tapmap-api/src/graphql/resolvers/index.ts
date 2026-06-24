import { breweryResolvers } from './brewery.js'
import { beerResolvers } from './beer.js'

export const resolvers = {
  Query: {
    ...breweryResolvers.Query,
    ...beerResolvers.Query,
  },
  Brewery: breweryResolvers.Brewery,
  Beer: beerResolvers.Beer,
}
