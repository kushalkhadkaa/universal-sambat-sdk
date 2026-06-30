'use strict';
const { bsToAd, adToBs, BS2AD, AD2BS, isValidBs } = require('../engine');

/**
 * Fastify plugin for Nepali DatePicker Studio
 * Registers fastify.bsToAd(), fastify.adToBs(), fastify.BS2AD(), fastify.AD2BS()
 * Also adds a preHandler that auto-converts body fields ending in _bs → _ad.
 *
 * Usage:
 *   const fastify = require('fastify')();
 *   fastify.register(require('@nepali-datepicker-studio/node/middleware/fastify'));
 *
 *   fastify.post('/booking', async (req) => {
 *     const ad = fastify.BS2AD(req.body.date_bs);
 *     return { ad };
 *   });
 */
function nepaliDatePickerPlugin(fastify, options, done) {
  // Decorate with conversion utilities
  fastify.decorate('bsToAd', bsToAd);
  fastify.decorate('adToBs', adToBs);
  fastify.decorate('BS2AD',  BS2AD);
  fastify.decorate('AD2BS',  AD2BS);
  fastify.decorate('isValidBs', isValidBs);

  // Optional: auto-convert _bs fields
  if (options && options.autoConvert) {
    fastify.addHook('preHandler', async (request) => {
      const body = request.body;
      if (!body || typeof body !== 'object') return;
      for (const key of Object.keys(body)) {
        if (key.endsWith('_bs') && typeof body[key] === 'string') {
          try {
            const adKey = key.replace(/_bs$/, '_ad');
            body[adKey] = BS2AD(body[key]);
          } catch { /* skip invalid */ }
        }
      }
    });
  }

  done();
}

// Support both require() and fastify-plugin wrapping
try {
  const fp = require('fastify-plugin');
  module.exports = fp(nepaliDatePickerPlugin, { name: 'nepali-datepicker-studio', fastify: '>=4' });
} catch {
  module.exports = nepaliDatePickerPlugin;
}
