import { prisma } from '../src/lib/prisma.js'
import { seedBeerStyles } from './seeds/beer-styles.js'

async function main() {
  await seedBeerStyles()
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
