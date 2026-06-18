import { prisma } from '../../src/lib/prisma.js'

interface SparqlBinding {
  brewery: { type: string; value: string }
  breweryLabel: { type: string; value: string }
  coord?: { type: string; value: string }
  inception?: { type: string; value: string }
  website?: { type: string; value: string }
  cityLabel?: { type: string; value: string }
}

interface SparqlResponse {
  results: { bindings: SparqlBinding[] }
}

interface BreweryRecord {
  wikidataId: string
  name: string
  latitude?: number
  longitude?: number
  foundedYear?: number
  website?: string
  city?: string
}

const SPARQL_QUERY = `
SELECT ?brewery ?breweryLabel ?coord ?inception ?website ?cityLabel WHERE {
  ?brewery wdt:P31/wdt:P279* wd:Q131734 .
  ?brewery wdt:P17 wd:Q213 .
  OPTIONAL { ?brewery wdt:P625 ?coord }
  OPTIONAL { ?brewery wdt:P571 ?inception }
  OPTIONAL { ?brewery wdt:P856 ?website }
  OPTIONAL {
    ?brewery wdt:P159 ?city .
    ?city rdfs:label ?cityLabel .
    FILTER(LANG(?cityLabel) = "cs")
  }
  SERVICE wikibase:label { bd:serviceParam wikibase:language "cs,en" }
}
`

function parseCoord(wkt: string): { latitude: number; longitude: number } | undefined {
  const match = wkt.match(/Point\(([+-]?\d+\.?\d*)\s+([+-]?\d+\.?\d*)\)/)
  if (!match) return undefined
  return {
    longitude: parseFloat(match[1]),
    latitude: parseFloat(match[2]),
  }
}

function parseYear(isoDate: string): number | undefined {
  const year = parseInt(isoDate.slice(0, 4), 10)
  return isNaN(year) ? undefined : year
}

export async function seedBreweries() {
  const url = new URL('https://query.wikidata.org/sparql')
  url.searchParams.set('query', SPARQL_QUERY)
  url.searchParams.set('format', 'json')

  const response = await fetch(url.toString(), {
    headers: {
      'User-Agent': 'TapMap/0.1 (personal learning project)',
      Accept: 'application/sparql-results+json',
    },
  })

  if (!response.ok) {
    throw new Error(`Wikidata SPARQL request failed: ${response.status} ${response.statusText}`)
  }

  const data = (await response.json()) as SparqlResponse

  const byUri = new Map<string, BreweryRecord>()

  for (const binding of data.results.bindings) {
    const uri = binding.brewery.value
    const wikidataId = uri.split('/').pop()!

    if (!byUri.has(uri)) {
      byUri.set(uri, { wikidataId, name: binding.breweryLabel.value })
    }

    const record = byUri.get(uri)!

    if (binding.coord && record.latitude === undefined) {
      const coords = parseCoord(binding.coord.value)
      if (coords) {
        record.latitude = coords.latitude
        record.longitude = coords.longitude
      }
    }

    if (binding.inception && record.foundedYear === undefined) {
      record.foundedYear = parseYear(binding.inception.value)
    }

    if (binding.website && record.website === undefined) {
      record.website = binding.website.value
    }

    if (binding.cityLabel && record.city === undefined) {
      record.city = binding.cityLabel.value
    }
  }

  const records = Array.from(byUri.values())

  for (const record of records) {
    await prisma.brewery.upsert({
      where: { wikidataId: record.wikidataId },
      update: {
        name: record.name,
        latitude: record.latitude,
        longitude: record.longitude,
        foundedYear: record.foundedYear,
        website: record.website,
        city: record.city,
      },
      create: {
        name: record.name,
        wikidataId: record.wikidataId,
        latitude: record.latitude,
        longitude: record.longitude,
        foundedYear: record.foundedYear,
        website: record.website,
        city: record.city,
      },
    })
  }

  const withCoords = records.filter((r) => r.latitude !== undefined).length
  const withYear = records.filter((r) => r.foundedYear !== undefined).length
  const withWebsite = records.filter((r) => r.website !== undefined).length
  const withCity = records.filter((r) => r.city !== undefined).length

  console.log(
    `Seeded ${records.length} breweries ` +
      `(${withCoords} with coordinates, ${withYear} with founding year, ${withWebsite} with website, ${withCity} with city)`,
  )
}
