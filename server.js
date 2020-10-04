'use strict';

const fastify = require('fastify')({ logger: true })

const postItem = require('./handlers/postItem');

fastify.post('/postItem', postItem);

const start = async () => {
  try {
    await fastify.listen(3000)
    fastify.log.info(`server listening on ${fastify.server.address().port}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start();