'use strict';

/**
 *  message controller
 */

'use strict';

const { sanitize } = require('@strapi/utils');

module.exports = {
  async create(ctx) {
    const { content, username, room } = ctx.request.body;

    if (!content || !username || !room) {
      return ctx.badRequest('Please provide content, username, and room');
    }

    const message = await strapi.db.query('api::message.message').create({
      data: {
        content,
        username,
        room,
        timestamp: new Date(),
        pfetchRoomsublishedAt: new Date(),
      },
    });

    console.log(username);

    const schema = strapi.getModel('api::message.message');
    return sanitize.contentAPI.output(message, schema);
  },

  async find(ctx) {
    const messages = await strapi.db.query('api::message.message').findMany();
    const schema = strapi.getModel('api::message.message');  // Ensure schema is correctly retrieved
    return sanitize.contentAPI.output(messages, schema);
  },

  async findOne(ctx) {
    const { id } = ctx.params;
    const message = await strapi.db.query('api::message.message').findOne({
      where: { id },
    });

    if (!message) {
      return ctx.notFound('Message not found');
    }

    const schema = strapi.getModel('api::message.message');  // Ensure schema is correctly retrieved
    return sanitize.contentAPI.output(message, schema);
  },

  async findByRoom(ctx) {
    const { room } = ctx.params;
    const messages = await strapi.db.query('api::message.message').findMany({
      where: { room },
    });

    const schema = strapi.getModel('api::message.message');  // Ensure schema is correctly retrieved
    return sanitize.contentAPI.output(messages, schema);
  },
};
