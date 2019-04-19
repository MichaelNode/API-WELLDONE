"use strict";

const Users = require('../models/user');

// Dependencies
class Socket {
  constructor(server, sessionMiddleware) {
    this.io = require('socket.io')(server);
    const redis = require('socket.io-redis');
    this.io.adapter(redis({host: 'localhost', port: 6379}));
    this.io.use(function (socket, next) {
      sessionMiddleware(socket.request, socket.request.res, next);
    });
    this.ioEmitter = require('socket.io-emitter')({host: '127.0.0.1', port: 6379});
    this.initializeSocket();
  };

  initializeSocket() {
    this.io.on('connection', async function (socket) {
      const user = socket.request.session.user;
      if (user) {
        try {
          await Users.findOneAndUpdate({_id: user._id}, {$set: {"socket": socket.id}})
          socket.join(user._id); // Add user in a room with his id
          socket.on('disconnect', () => socket.leave(user._id));
        } catch (err) {
          console.log('error al agregar socket al usuario', err)
        }
      }
    });
  }
}

module.exports.Socket = Socket;

module.exports.ioEmitter = require('socket.io-emitter')({host: '127.0.0.1', port: 6379});

/**
 * Function for send notification in a room
 * @param roomId
 * @param type
 * @param message
 */
module.exports.sendToRoom = (roomId, type, message) => {
  // TODO: COMPROBAR QUE EXISTE EL ROOM Y SINO MANDAMOS EMAIL
  ioEmitter.to(roomId).emit(type, message);
};