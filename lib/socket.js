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
    this.clients_conn = []
    this.initializeSocket();
  
  };

  initializeSocket() {
    
    this.io.on('connection', async (socket) =>  {
      const user = socket.request.session.user;
      if (user) {
        this.clients_conn[user.nick_name] =  socket.id;
        console.log('user conn:', this.clients_conn)
        let user_res =  await Users.findOne({followers: '5caff2cb64875e379ccec7e8'}).select('_id');
        
        console.log('seguidores',user_res)
        socket.to( this.clients_conn['mzamora']).emit('notification-article', 'logggg');
        socket.on('disconnect', () => {
          delete  this.clients_conn[user.nick_name]
        });
      }
    });
  }
}

module.exports.Socket = Socket;

const ioEmitter = require('socket.io-emitter')({host: '127.0.0.1', port: 6379});

/**
 * Function for send notification in a room
 * @param roomId
 * @param type
 * @param message
 */
module.exports.sendToRoom = (roomId, type, message) => {
  // TODO: COMPROBAR QUE EXISTE EL ROOM Y SINO MANDAMOS EMAIL
 console.log('test',this.clients_conn)
  ioEmitter.to(roomId).emit(type, message);
};