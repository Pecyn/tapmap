import { prisma } from '../../src/lib/prisma.js'

const styles = [
  { name: 'Lager' },
  { name: 'Pilsner' },
  { name: 'IPA' },
  { name: 'APA' },
  { name: 'NEIPA' },
  { name: 'Stout' },
  { name: 'Porter' },
  { name: 'Wheat Beer' },
  { name: 'Sour/Gose' },
  { name: 'Dark Lager' },
  { name: 'Hefeweizen' },
  { name: 'Saison' },
  { name: 'Amber Ale' },
  { name: 'Amber Lager' },
  { name: 'Red Ale' },
  { name: 'Bock' },
  { name: 'Milk Stout' },
  { name: 'Session IPA' },
  { name: 'Barleywine' },
  { name: 'Radler' },
  { name: 'Pale Ale' },
]

export async function seedBeerStyles() {
  for (const style of styles) {
    await prisma.beerStyle.upsert({
      where: { name: style.name },
      update: {},
      create: style,
    })
  }
  // eslint-disable-next-line no-console
  console.log(`Seeded ${styles.length} beer styles`)
}
