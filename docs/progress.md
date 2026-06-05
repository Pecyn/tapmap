# TapMap – Progress

## Status: Planning

---

## Phase 0 – Setup & Infrastructure

- [ ] Initialize tapmap-api (Node.js + Fastify + TypeScript)
- [ ] Initialize tapmap-web (Next.js 14 + TypeScript)
- [ ] PostgreSQL locally (Docker or native)
- [ ] Prisma setup + DB connection
- [ ] GraphQL Yoga setup in tapmap-api
- [ ] Apollo Client setup in tapmap-web
- [ ] GraphQL Codegen setup (schema → types)
- [ ] Hello World end-to-end (GraphQL query → Next.js page)
- [ ] Git workflow (.gitignore, .env handling)

## Phase 1 – Data Layer

- [ ] Prisma schema – all models (Brewery, Beer, BeerStyle, Ingredient, BeerIngredient)
- [ ] Migrations – create tables
- [ ] Indexes (country, type, breweryId, styleId)
- [ ] Seed script – BeerStyle data (~20 styles, manual)
- [ ] Seed script – Open Brewery DB API (EU breweries)
- [ ] Seed script – Wikidata SPARQL (Czech breweries)
- [ ] Seed script – beers (beer.db CSV or AI generated)
- [ ] Verify data in DB (Prisma Studio or psql)

## Phase 2 – GraphQL API

- [ ] GraphQL schema (SDL) – Brewery, Beer, BeerStyle, Ingredient
- [ ] Resolver – breweries (list with country, type filter)
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

---

## Decisions Log

| Date | Decision | Reason |
|---|---|---|
| 2026-06 | Two separate projects (tapmap-api + tapmap-web) | Fullstack learning – clean BE/FE separation |
| 2026-06 | GraphQL (not REST) | Nested data, codegen, learning value |
| 2026-06 | Prisma ORM + $queryRaw | ORM for standard ops, raw SQL for complex queries |
| 2026-06 | Mapbox GL JS (react-map-gl) | Best DX, free tier sufficient, TypeScript support |
| 2026-06 | No auth in initial version | Keeps scope manageable, can be added later |
