'use strict';

module.exports = {
  async handleWebhook(ctx) {
    try {
      const { body } = ctx.request;
      // Process the incoming webhook payload as needed
      // For example, emit a socket event or perform some database operations
      strapi.io.to(body.room).emit('message', body);
      ctx.send({ received: true });
    } catch (err) {
      ctx.send({ error: 'Failed to process webhook' }, 500);
    }
  },
};
