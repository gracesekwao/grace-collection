'use strict';

const fastify = require('fastify')({ logger: true });

const postItem = require('./handlers/postItem');
const getAllItems = require('./handlers/getAllItems');
const getCategories = require('./handlers/getCategories')
const getItem = require('./handlers/getItem');

fastify.post('/items', postItem);
fastify.get('/items', getAllItems);
fastify.get('/categories', getCategories);
fastify.get('/item/:item', getItem);

fastify.setErrorHandler((error, req, reply) => {
  const statusCode = error.statusCode;
		if (statusCode >= 500) {
			fastify.log.error(error);
		} else if (statusCode >= 400) {
			fastify.log.info(error);
		} else {
			fastify.log.error(error);
    }
    
    reply.send(error);
});

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