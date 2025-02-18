module.exports = ({ env, strapi }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS'),
  },
  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
  },
  bootstrap() {
    const socketService = require('../src/extensions/socket');
    socketService.initialize(strapi);
  }
});
