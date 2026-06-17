# TapMap – Progress

## Status: In Progress – Phase 1

---

## Phase 0 – Setup & Infrastructure

- [x] Initialize tapmap-api (Node.js + Fastify + TypeScript)
- [x] Initialize tapmap-web (Next.js 16 + TypeScript + Tailwind)
- [x] PostgreSQL locally (Docker – postgres:17)
- [x] Prisma setup + DB connection
- [x] GraphQL Yoga setup in tapmap-api
- [x] Apollo Client setup in tapmap-web
- [x] GraphQL Codegen setup (schema → types)
- [x] Hello World end-to-end (GraphQL query → Next.js page)
- [x] Git workflow (.gitignore, .env handling)

## Phase 1 – Data Layer

- [x] Prisma schema – all models (Brewery, Beer, BeerStyle, Ingredient, BeerIngredient)
- [x] Migrations – create tables
- [x] Indexes (country, breweryId, styleId)
- [ ] Seed script – BeerStyle data (~20 styles, manual)
- [ ] Seed script – Wikidata SPARQL (Czech breweries)
- [ ] Seed script – beers (AI generated)
- [ ] Verify data in DB (Prisma Studio or psql)

## Phase 2 – GraphQL API

- [ ] GraphQL schema (SDL) – Brewery, Beer, BeerStyle, Ingredient
- [ ] Resolver – breweries (list with country filter)
- [ ] Resolver – brewery (detail + beers)
- [ ] Resolver – beers (list with style, abv filter)
- [ ] Resolver – beer (detail + style + ingredients)
- [ ] Resolver – styles (list)
- [ ] Resolver – style (detail + beer list)
- [ ] GraphQL Codegen – generate TypeScript types
- [ ] API testing in GraphQL Playground

## Phase 3 – Frontend: Catalog

- [ ] Layout – main navigation (Breweries / Beers / Styles)
- [ ] /breweries – brewery list (SSR + filters)
- [ ] /breweries/[id] – brewery detail + beer list (SSR)
- [ ] /beers – beer list (SSR + filters)
- [ ] /beers/[id] – beer detail + style + ingredients (SSR)
- [ ] /styles – style list (SSG)
- [ ] /styles/[id] – style detail + beer list (SSR)
- [ ] / – homepage (SSG/ISR, basic stats)

## Phase 4 – Frontend: Map

- [ ] Mapbox API key + react-map-gl setup
- [ ] Basic map on /breweries (split-panel layout)
- [ ] Brewery pins on map
- [ ] Clustering on zoom out
- [ ] Popup on pin click (name, city, type)
- [ ] Popup click → navigate to /breweries/[id]
- [ ] Map and list sync (hover → highlight pin)
- [ ] Mobile layout (map on top, list below)

## Phase 5 – Polish & Deployment

- [ ] Error handling (404, empty states)
- [ ] Loading states / skeleton UI
- [ ] SEO – metadata for each page
- [ ] Deploy tapmap-api (Railway or Render)
- [ ] Deploy tapmap-web (Vercel)
- [ ] Production PostgreSQL (Railway or Render)
- [ ] Environment variables for production
- [ ] Smoke test production deployment

---

## Optional (post Phase 5)

- [ ] Beer reviews – auth, form, storage
- [ ] Fulltext search across breweries and beers
- [ ] Stats and charts (avg ABV by style, beer counts per brewery)
- [ ] Map filter (show only specific brewery types)
- [ ] BreweryType classification (enrichment, no reliable source found yet)
- [ ] Geocoding enrichment for breweries missing coordinates (Nominatim or Mapbox)

---

## Decisions Log

| Date    | Decision                                        | Reason                                                                                                            |
| ------- | ----------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| 2026-06 | Two separate projects (tapmap-api + tapmap-web) | Fullstack learning – clean BE/FE separation                                                                       |
| 2026-06 | GraphQL (not REST)                              | Nested data, codegen, learning value                                                                              |
| 2026-06 | Prisma ORM + $queryRaw                          | ORM for standard ops, raw SQL for complex queries                                                                 |
| 2026-06 | Mapbox GL JS (react-map-gl)                     | Best DX, free tier sufficient, TypeScript support                                                                 |
| 2026-06 | No auth in initial version                      | Keeps scope manageable, can be added later                                                                        |
| 2026-06 | Tailwind CSS + shadcn/ui                        | Fullstack learning priority, Tailwind is industry standard                                                        |
| 2026-06 | PostgreSQL 17 (not 16 or 18)                    | Stable, fully supported by Prisma, newer than 16                                                                  |
| 2026-06 | Prisma 7                                        | Latest version – prisma.config.ts, DATABASE_URL outside schema                                                    |
| 2026-06 | Port 4200 (not 4000)                            | Ports 3963–4062 reserved by Hyper-V/WSL2 on Windows 11                                                            |
| 2026-06 | DATABASE_URL uses 127.0.0.1 (not localhost)     | Docker on Windows maps ports to 127.0.0.1, localhost unreliable                                                   |
| 2026-06 | GraphQL Codegen client preset                   | typescript-operations plugin deprecated in codegen v6                                                             |
| 2026-06 | pnpm v11                                        | Upgraded from v10 – new allowBuilds config in pnpm-workspace.yaml                                                 |
| 2026-06 | Node.js 24.16.0                                 | Latest LTS, documented in .nvmrc                                                                                  |
| 2026-06 | No BreweryType enum                             | No data source reliably provides this; deferred to future enrichment                                              |
| 2026-06 | Wikidata SPARQL as primary data source          | Open Brewery DB unusable for CZ (broken country filter), beer.db stale; Wikidata verified live with 246 breweries |
| 2026-06 | Brewery fields all nullable except id/name      | Real Wikidata coverage is ~50% for coordinates, founding year, website                                            |
