'use strict';

/**
 * message router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

const defaultRouter = createCoreRouter('api::message.message');

const customRoutes = [
  {
    method: 'POST',
    path: '/webhook/message',
    handler: 'message.webhook',
    config: {
      policies: [],
    },
  },
];

module.exports = {
  ...defaultRouter,
  routes: [
    ...defaultRouter.routes,
    ...customRoutes,
  ],
};
