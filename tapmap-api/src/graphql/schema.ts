import { createSchema } from 'graphql-yoga'
import { readFileSync } from 'fs'
import { join } from 'path'

export const typeDefs = readFileSync(
  join(import.meta.dirname, 'schema.graphql'),
  'utf-8'
)

export const schema = createSchema({
  typeDefs,
  resolvers: {},
})
