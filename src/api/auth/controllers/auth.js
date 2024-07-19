'use strict';

const { sanitizeEntity } = require('strapi-utils');

module.exports = {
  async register(ctx) {
    const { username, email, password } = ctx.request.body;

    console.log(email);
    console.log(username);
    console.log(password);

    if (!username || !email || !password) {
      return ctx.throw(400, 'Please provide username, email, and password');
    }

    // const existingUser = await strapi.query('user', 'users-permissions').findOne({ email });

    // if (existingUser) {
    //   return ctx.throw(400, 'Email already exists');
    // }

    const user = await strapi.plugins['users-permissions'].services.user.add({
      username,
      email,
      password,
    });

    console.log(email);
    console.log(username);
    console.log(password);

    return sanitizeEntity(user, { model: strapi.query('user', 'users-permissions').model });
  },
};