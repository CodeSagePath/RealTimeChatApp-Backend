'use strict';

module.exports = async () => {
  const io = require('socket.io')(strapi.server, {
    cors: {
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('sendMessage', async (message) => {
      const newMessage = await strapi.services.message.create({
        content: message,
        username: socket.username,
      });
      io.emit('message', newMessage);
    });

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });

  strapi.io = io;
};
