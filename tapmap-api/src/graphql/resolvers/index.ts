import { breweryResolvers } from './brewery.js'
import { beerResolvers } from './beer.js'
import { beerStyleResolvers } from './beer-style.js'

export const resolvers = {
  Query: {
    ...breweryResolvers.Query,
    ...beerResolvers.Query,
    ...beerStyleResolvers.Query,
  },
  Brewery: breweryResolvers.Brewery,
  Beer: beerResolvers.Beer,
  BeerStyle: beerStyleResolvers.BeerStyle,
}
