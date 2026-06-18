import { prisma } from '../src/lib/prisma.js'
import { seedBeerStyles } from './seeds/beer-styles.js'
import { seedBreweries } from './seeds/breweries.js'
import { seedAdditionalBreweries } from './seeds/additional-breweries.js'

async function main() {
  await seedBeerStyles()
  await seedBreweries()
  await seedAdditionalBreweries()
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
