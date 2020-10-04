'use strict';

const fastify = require('fastify')({ logger: true })

const postItem = require('./handlers/postItem');
const getAllItems = require('./handlers/getAllItems');
const getCategories = require('./handlers/getCategories')

fastify.post('/postItem', postItem);
fastify.get('/', getAllItems);
fastify.get('/categories', getCategories);

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