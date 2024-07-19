'use strict';

/**
 * message controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::message.message', ({ strapi }) => ({
  async create(ctx) {
    const { content, room, username } = ctx.request.body.data;

    const newMessage = await strapi.service('api::message.message').create({
      data: {
        content,
        room,
        username,
      },
    });

    strapi.io.to(room).emit('message', newMessage);

    return newMessage;
  },
}));
