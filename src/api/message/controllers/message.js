'use strict';

/**
 * message controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::message.message', ({ strapi }) => ({
  async webhook(ctx) {
    const message = ctx.request.body;

    strapi.io.to(message.room).emit('message', message);

    ctx.send({ received: true });
  },
}));