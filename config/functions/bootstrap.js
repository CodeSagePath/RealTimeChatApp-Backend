'use strict';

const io = require('socket.io');

module.exports = async (strapi) => {
  // Initialize Socket.io
  const socketServer = io(strapi.server, {
    cors: {
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST'],
    },
  });

  // Handle new connections
  socketServer.on('connection', (socket) => {
    console.log('A user connected');

    // Join a room
    socket.on('joinRoom', ({ username, room }) => {
      socket.join(room);
      console.log(`${username} joined room: ${room}`);
      socketServer.to(room).emit('message', {
        username: 'admin',
        content: `${username} has joined the room.`,
      });
    });

    // Handle new messages
    socket.on('sendMessage', async (message) => {
      try {
        // Save message to database
        const newMessage = await strapi.service('api::message.message').create({
          data: {
            content: message.content,
            username: message.username,
            room: message.room,
            timestamp: new Date(),
          },
        });

        // Broadcast message to all clients in the room
        socketServer.to(message.room).emit('message', newMessage);
      } catch (error) {
        console.error('Error saving message:', error);
      }
    });

    // Handle disconnect
    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });

  strapi.io = socketServer; 
};
