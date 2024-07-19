'use strict';

module.exports = {
  lifecycles: {
    async afterCreate(result, data) {
      strapi.io.to(result.room).emit('message', result);
    },
  },
};