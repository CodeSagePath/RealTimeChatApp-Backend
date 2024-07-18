const socket = require('socket.io');

module.exports = {
  initialize: (strapi) => {
    const io = socket(strapi.server.httpServer);

    io.on('connection', (socket) => {
      console.log('A user connected');

      socket.on('joinRoom', (room) => {
        socket.join(room);
        console.log(`User joined room: ${room}`);
      });

      socket.on('leaveRoom', (room) => {
        socket.leave(room);
        console.log(`User left room: ${room}`);
      });

      socket.on('message', (message) => {
        io.to(message.room).emit('message', message);
        console.log(`Message sent to room ${message.room}: ${message.content}`);
      });

      socket.on('disconnect', () => {
        console.log('A user disconnected');
      });
    });

    strapi.io = io;
  }
};
