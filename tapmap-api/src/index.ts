import Fastify from "fastify";

const app = Fastify({ logger: true });
const port = Number(process.env.PORT ?? 4200);

app.get("/health", async () => ({
  status: "ok",
  timestamp: new Date().toISOString(),
}));

await app.listen({ port, host: "127.0.0.1" });
