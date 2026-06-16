# TapMap

Craft beer brewery catalog with interactive map. Learning project focused on fullstack development.

**Stack:** Next.js 16 · Node.js · Fastify · GraphQL Yoga · Prisma 7 · PostgreSQL 17 · Apollo Client · Mapbox GL JS · TypeScript

See [docs/architecture.md](docs/architecture.md) for full architecture overview.

---

## Prerequisites

- Node.js 24.16.0 (see `.nvmrc`)
- pnpm 11+
- Docker (for PostgreSQL)

---

## Setup

### 1. Clone the repository

```bash
git clone https://github.com/Pecyn/tapmap.git
cd tapmap
```

### 2. Start PostgreSQL

```bash
docker run --name tapmap-postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=tapmap \
  -p 5432:5432 \
  -v /your/path/tapmap-postgres:/var/lib/postgresql/data \
  --restart unless-stopped \
  -d postgres:17
```

### 3. Setup tapmap-api

```bash
cd tapmap-api
pnpm install
cp .env.example .env
# Fill in your DATABASE_URL in .env
pnpm migrate
pnpm generate
pnpm dev
```

API runs at `http://localhost:4200`
GraphQL Playground at `http://localhost:4200/graphql`

### 4. Setup tapmap-web

```bash
cd tapmap-web
pnpm install
cp .env.example .env.local
# Fill in your NEXT_PUBLIC_MAPBOX_TOKEN in .env.local
pnpm generate
pnpm dev
```

Web runs at `http://localhost:3000`

---

## Development

Run both projects simultaneously in separate terminals:

```bash
# Terminal 1
cd tapmap-api && pnpm dev

# Terminal 2
cd tapmap-web && pnpm dev
```

### Useful commands

```bash
# tapmap-api
pnpm dev          # start dev server with hot reload
pnpm generate     # regenerate GraphQL types + Prisma Client
pnpm migrate      # run database migrations
pnpm studio       # open Prisma Studio at localhost:5555
pnpm lint         # run ESLint
pnpm format       # run Prettier

# tapmap-web
pnpm dev          # start dev server with Turbopack
pnpm generate     # regenerate GraphQL types (tapmap-api must be running)
pnpm build        # production build
pnpm lint         # run ESLint
pnpm format       # run Prettier
```

---

## Project Structure

```
tapmap/
├── tapmap-api/     # Node.js · Fastify · GraphQL Yoga · Prisma
├── tapmap-web/     # Next.js 16 · Apollo Client · Mapbox GL JS
└── docs/           # Architecture, progress, decisions
```

See [docs/progress.md](docs/progress.md) for current development status.
