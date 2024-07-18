'use strict';

module.exports = async () => {
  const io = require('socket.io')(strapi.server, {
    cors: {
      origin: 'http://localhost:3000', // your frontend URL
      methods: ['GET', 'POST'],
    },
  });

  const users = {};

  io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('register', (username) => {
      users[socket.id] = username;
      io.emit('activeUsers', Object.values(users));
    });

    socket.on('sendMessage', async (message) => {
      const newMessage = await strapi.services.message.create({
        content: message.content,
        username: message.username,
      });
      io.emit('message', newMessage);
    });

    socket.on('disconnect', () => {
      delete users[socket.id];
      io.emit('activeUsers', Object.values(users));
      console.log('user disconnected');
    });
  });

  strapi.io = io;
};
