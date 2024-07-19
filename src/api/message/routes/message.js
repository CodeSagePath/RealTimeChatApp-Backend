'use strict';

/**
 * message router
 */

module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/messages',
      handler: 'message.create',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/messages',
      handler: 'message.find',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/messages/:id',
      handler: 'message.findOne',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/messages/room/:room',
      handler: 'message.findByRoom',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
