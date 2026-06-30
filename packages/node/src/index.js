'use strict';
/**
 * @nepali-datepicker-studio/node
 * Server-side BS/AD conversion for Node.js — Express, Fastify, Next.js API routes.
 */
const engine     = require('./engine');
const expressMW  = require('./middleware/express');

module.exports = {
  ...engine,
  ...expressMW,
  // Lazy-load Fastify plugin (peer dep optional)
  get fastifyPlugin() { return require('./middleware/fastify'); },
  // Lazy-load Zod helpers (peer dep optional)
  get zod() { return require('./zod'); },
};
