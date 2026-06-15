import Fastify from 'fastify'
import { createYoga } from 'graphql-yoga'
import { schema } from './graphql/schema.js'

const app = Fastify({ logger: true })

const yoga = createYoga({
  schema,
  logging: {
    debug: (...args) => args.forEach((arg) => app.log.debug(arg)),
    info: (...args) => args.forEach((arg) => app.log.info(arg)),
    warn: (...args) => args.forEach((arg) => app.log.warn(arg)),
    error: (...args) => args.forEach((arg) => app.log.error(arg)),
  },
})

app.route({
  url: yoga.graphqlEndpoint,
  method: ['GET', 'POST', 'OPTIONS'],
  handler: (req, reply) => yoga.handleNodeRequestAndResponse(req, reply),
})

const port = Number(process.env.PORT ?? 4200)
await app.listen({ port, host: '127.0.0.1' })
