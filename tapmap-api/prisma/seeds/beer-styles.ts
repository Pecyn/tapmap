import { prisma } from '../../src/lib/prisma.js'

const styles = [
  { name: 'Czech Lager' },
  { name: 'Pale Lager' },
  { name: 'IPA' },
  { name: 'APA' },
  { name: 'NEIPA' },
  { name: 'Stout' },
  { name: 'Porter' },
  { name: 'Wheat Beer' },
  { name: 'Sour/Gose' },
  { name: 'Pilsner' },
  { name: 'Dunkel' },
  { name: 'Hefeweizen' },
  { name: 'Saison' },
  { name: 'Amber Ale' },
  { name: 'Red Ale' },
  { name: 'Bock' },
  { name: 'Milk Stout' },
  { name: 'Session IPA' },
  { name: 'Barleywine' },
  { name: 'Radler' },
]

export async function seedBeerStyles() {
  for (const style of styles) {
    await prisma.beerStyle.upsert({
      where: { name: style.name },
      update: {},
      create: style,
    })
  }
  console.log(`Seeded ${styles.length} beer styles`)
}
