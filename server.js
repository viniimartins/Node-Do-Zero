import { fastify } from "fastify";
import { DatabasePostgres } from "./database-postgres.js";

const server = fastify();

const database = new DatabasePostgres();

// GET, POST, PUT, DELETE, PATCH,

// POST http://localhost:3333/videos    => Criar video

server.post("/videos", async (request, reply) => {
  const { title, description, duration } = request.body;

  await database.create({
    title,
    description,
    duration,
  });

  return reply.status(201).send();
});

// GET http://localhost:3333/videos    => Listar video

server.get("/videos", async (request) => {
  const search = request.query.search;

  const videos = await database.list(search);

  return videos;
});

// PUT http://localhost:3333/videos/3    => Atualizar video

// Route Parameter

server.put("/videos/:id", async (request, reply) => {
  const videoId = request.params.id;

  const { title, description, duration } = request.body;

  await database.update(videoId, {
    title,
    description,
    duration,
  });

  return reply.status(204).send();
});

// DELETE http://localhost:3333/videos/3    => Deletar video

server.delete("/videos/:id", async (request, reply) => {
  const videoId = request.params.id;

  await database.delete(videoId);

  return reply.status(204).send();
});

server.listen({
  port: process.env.port ?? 3333,
});
