# tapmap-api

Resolvers are thin – if resolver logic exceeds ~20 lines, extract to a service function.
Use Prisma Client for standard CRUD. Use $queryRaw for aggregations, GROUP BY, and fulltext search.
Never edit files in generated/ – run npm run generate instead.
