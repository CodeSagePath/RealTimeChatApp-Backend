'use strict';

const { sanitizeEntity } = require('strapi-utils');

module.exports = {
  async create(ctx) {
    const { content, username } = ctx.request.body.data; // Access the wrapped data object

    if (!content || !username) {
      return ctx.throw(400, 'Please provide content and username');
    }

    const message = await strapi.services.message.create({
      content,
      username,
      timestamp: new Date(),
    });

    strapi.io.emit('message', sanitizeEntity(message, { model: strapi.models.message }));

    return sanitizeEntity(message, { model: strapi.models.message });
  },

  async find(ctx) {
    const messages = await strapi.services.message.find();
    return messages.map(entity => sanitizeEntity(entity, { model: strapi.models.message }));
  },
};
