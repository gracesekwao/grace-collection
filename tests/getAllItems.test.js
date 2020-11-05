'use strict';

const { expect } = require('chai');
const fastify = require('fastify');
const getAllItems = require('../handlers/getAllItems');

describe('/', () => {
  let server;
  beforeAll(() => {});

  beforeEach(async () => {
    server = fastify({});
    server.register(getAllItems);
    await server.ready();

  });

  it("GET returns 200", async done => {
    const response = await server.inject({ method: 'GET', url: '/' });
    expect(response.statusCode).toEqual(200);
    done();
  });
});