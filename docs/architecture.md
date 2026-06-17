# TapMap – Architecture

## Overview

Craft beer brewery catalog with interactive map. Learning project focused on fullstack development: Next.js, GraphQL, PostgreSQL.

**Tech stack:** Next.js 16 · Node.js · GraphQL Yoga · Prisma ORM · PostgreSQL · Mapbox GL JS · TypeScript

---

## Project Structure

Two independent Node.js projects in a single monorepo:

```
tapmap/
├── tapmap-api/     # Node.js · Fastify · GraphQL Yoga · Prisma
├── tapmap-web/     # Next.js 16 · React · Apollo Client · Mapbox
└── docs/
```

- **tapmap-api** runs on port 4200
- **tapmap-web** runs on port 3000
- No monorepo tooling (Turborepo etc.) – two independent package.json files

---

## Architecture Overview

![Architecture Overview](./images/architecture-overview.svg)

### tapmap-api

Node.js backend with GraphQL API.

| Layer          | Technology    |
| -------------- | ------------- |
| HTTP server    | Fastify       |
| GraphQL server | GraphQL Yoga  |
| ORM            | Prisma 7      |
| Database       | PostgreSQL 17 |
| Language       | TypeScript    |

**Responsibilities:**

- GraphQL schema + resolvers
- Database access via Prisma Client
- Complex queries via Prisma `$queryRaw` (aggregations, fulltext search)
- Database migrations and seeding

### tapmap-web

Next.js frontend, connects to tapmap-api via GraphQL.

| Layer           | Technology                  |
| --------------- | --------------------------- |
| Framework       | Next.js 16 (App Router)     |
| GraphQL client  | Apollo Client               |
| Map             | Mapbox GL JS (react-map-gl) |
| Type generation | GraphQL Codegen             |
| Language        | TypeScript                  |

**Key pattern:**
Server Components fetch data from tapmap-api GraphQL endpoint directly.
Client Components (map, filters) use Apollo Client in the browser.

---

## Rendering Strategy

![Rendering Modes](./images/rendering-modes.svg)

---

## Data Model

![Data Model](./images/data-model.svg)

| Model          | Key fields                                                                                                |
| -------------- | --------------------------------------------------------------------------------------------------------- |
| Brewery        | id, name, city, street, postalCode, phone, country, latitude, longitude, foundedYear, website, wikidataId |
| Beer           | id, name, abv, ibu, breweryId, styleId, description                                                       |
| BeerStyle      | id, name, description                                                                                     |
| Ingredient     | id, name                                                                                                  |
| BeerIngredient | beerId, ingredientId (composite PK)                                                                       |

All fields except `id` and `name` are nullable, reflecting real-world data coverage from Wikidata (see Data Sources below). No `BreweryType` enum – no reliable data source provides this consistently; may be added later as a separate enrichment step.

---

## Database

PostgreSQL 17 with Prisma 7 ORM.

- **Prisma Config** – `prisma.config.ts` in project root (Prisma 7) – configures DATABASE_URL, schema location, migrations path
- **Prisma Client** – typesafe queries for standard CRUD operations, generated to `src/generated/prisma` (not committed, generated via `pnpm generate`)
- **Prisma Migrate** – versioned SQL migrations
- **`$queryRaw`** – complex queries: aggregations, GROUP BY, fulltext search
- **Indexes** – on `Brewery.country`, `Beer.breweryId`, `Beer.styleId`

---

## Data Sources

| Source             | Content                                                 | Coverage                                                                               | Method                            |
| ------------------ | ------------------------------------------------------- | -------------------------------------------------------------------------------------- | --------------------------------- |
| Wikidata SPARQL    | Czech breweries (name, coords, founding year, website)  | 246 breweries total; ~52% with coordinates, ~47% with founding year, ~52% with website | SPARQL query at seed time         |
| AI generated       | Beers for breweries, additional Czech breweries fill-in | MVP scope                                                                              | JSON → seed script                |
| Geocoding (future) | Coordinates for breweries missing them                  | Planned enrichment, not yet implemented                                                | Nominatim or Mapbox Geocoding API |

**Note:** Open Brewery DB API was evaluated but found unusable for Czech breweries (`by_country` filter does not work reliably, returns mostly US/EU results). beer.db was found stale/unmaintained and is not used. Wikidata is the primary and only verified live data source for breweries as of Phase 1.

---

## GraphQL & Types

Schema defined in `tapmap-api` as single source of truth.
GraphQL Codegen generates TypeScript types for both projects:

```
tapmap-api/schema.graphql
        ↓ graphql-codegen
tapmap-api/generated/     → resolver types
tapmap-web/src/generated/ → Apollo hooks + query types (client preset)
```

---

## Deployment

| Part       | Platform                                 |
| ---------- | ---------------------------------------- |
| tapmap-web | Vercel (root directory: tapmap-web)      |
| tapmap-api | Railway or Render                        |
| PostgreSQL | Railway or Render (same platform as API) |

Both Vercel projects connect to the same GitHub repository with different root directories.
