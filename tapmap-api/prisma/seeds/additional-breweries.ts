import { prisma } from '../../src/lib/prisma.js'

interface BeerData {
  name: string
  styleName: string
  abv: number
  ibu?: number
}

interface BreweryData {
  name: string
  city?: string
  street?: string
  postalCode?: string
  phone?: string
  latitude?: number
  longitude?: number
  foundedYear?: number
  website?: string
  description?: string
  beers: BeerData[]
}

const BREWERIES: BreweryData[] = [
  {
    name: 'Pivovar Malenovice',
    city: 'Zlín',
    street: 'Švermova 101',
    postalCode: '763 02',
    phone: '+420 608 043 462',
    latitude: 49.205567,
    longitude: 17.597178,
    foundedYear: 2008,
    website: 'https://www.zlinskysvec.cz/',
    description:
      'Craft brewery in the Malenovice district of Zlín, known for unfiltered and unpasteurized beers under the Zlínský švec brand.',
    beers: [
      { name: '10% Světlá výčepní', styleName: 'Czech Lager', abv: 4.2 },
      { name: '11% Světlý ležák', styleName: 'Czech Lager', abv: 4.7 },
      { name: '11% Polotmavý ležák', styleName: 'Czech Lager', abv: 4.5 },
      { name: '12% Světlý ležák', styleName: 'Czech Lager', abv: 5.0 },
      { name: '11% American Pale Ale', styleName: 'APA', abv: 4.5, ibu: 40 },
      { name: '13% Single Hop IPA Citra', styleName: 'IPA', abv: 5.8, ibu: 45 },
      { name: '12% Medový ležák', styleName: 'Czech Lager', abv: 5.0 },
      { name: '8% Cyklošvec', styleName: 'Czech Lager', abv: 3.5 },
      { name: '10% Tmavá výčepní', styleName: 'Dunkel', abv: 4.2 },
      { name: '13% Tmavý speciál', styleName: 'Dunkel', abv: 5.8 },
      { name: '10% Summer Ale', styleName: 'Pale Ale', abv: 4.2, ibu: 37 },
      { name: '15% Rye IPA (Žitná IPA)', styleName: 'IPA', abv: 6.9, ibu: 60 },
    ],
  },
]

export async function seedAdditionalBreweries() {
  for (const breweryData of BREWERIES) {
    const { beers, ...breweryFields } = breweryData

    let brewery = await prisma.brewery.findFirst({ where: { name: breweryFields.name } })

    if (!brewery) {
      brewery = await prisma.brewery.create({ data: breweryFields })
    } else {
      brewery = await prisma.brewery.update({ where: { id: brewery.id }, data: breweryFields })
    }

    let createdCount = 0

    for (const beer of beers) {
      const style = await prisma.beerStyle.findUniqueOrThrow({ where: { name: beer.styleName } })
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
        createdCount++
      }
    }

    // eslint-disable-next-line no-console
    console.log(`Seeded brewery '${brewery.name}' with ${createdCount} beers (${beers.length} total)`)
  }
}
