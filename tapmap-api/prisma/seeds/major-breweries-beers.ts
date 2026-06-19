import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { prisma } from '../../src/lib/prisma.js'

interface BeerEntry {
  name: string
  style: string
  abv: number
  ibu?: number
}

interface BreweryEntry {
  breweryName: string
  beers: BeerEntry[]
}

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const data: BreweryEntry[] = JSON.parse(
  readFileSync(join(__dirname, '../data/major-breweries-beers.json'), 'utf-8')
)

export async function seedMajorBreweriesBeers() {
  let totalCreated = 0
  let totalSkipped = 0

  for (const { breweryName, beers } of data) {
    const brewery = await prisma.brewery.findFirst({ where: { name: breweryName } })

    if (!brewery) {
      // eslint-disable-next-line no-console
      console.warn(`Brewery not found, skipping: '${breweryName}'`)
      totalSkipped += beers.length
      continue
    }

    for (const beer of beers) {
      const style = await prisma.beerStyle.findFirst({ where: { name: beer.style } })

      if (!style) {
        // eslint-disable-next-line no-console
        console.warn(`Style not found, skipping beer '${beer.name}': '${beer.style}'`)
        totalSkipped++
        continue
      }

      const existing = await prisma.beer.findFirst({
        where: { name: beer.name, breweryId: brewery.id },
      })

      if (!existing) {
        await prisma.beer.create({
          data: {
            name: beer.name,
            abv: beer.abv,
            ...(beer.ibu !== undefined && { ibu: beer.ibu }),
            breweryId: brewery.id,
            styleId: style.id,
          },
        })
        totalCreated++
      }
    }
  }

  // eslint-disable-next-line no-console
  console.log(`Seeded major breweries beers: ${totalCreated} created, ${totalSkipped} skipped`)
}
