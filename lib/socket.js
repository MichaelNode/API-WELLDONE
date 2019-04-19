"use strict";

const Users = require('../models/user');
const loadTemplate = require('../lib/email');

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
          
          socket.emit('res','asdsa')

          socket.on('disconnect', () => {
            socket.leave(user._id)
          });

        } catch (err) {
          console.log('error al agregar socket al usuario', err)
        }

      }
    });
  }
}

module.exports.Socket = Socket;

module.exports.ioEmitter = require('socket.io-emitter')({host: '127.0.0.1', port: 6379});;
const ioEmitter = require('socket.io-emitter')({host: '127.0.0.1', port: 6379});

/**
 * Function for send notification in a room
 * @param roomId
 * @param type
 * @param message
 */
module.exports.sendNotification = (user, type, followers , subject ,message , url) => {
  // TODO: COMPROBAR QUE EXISTE EL ROOM Y SINO MANDAMOS EMAIL
  followers.forEach(follow => {
    if(follow.socket){
      ioEmitter.to(follow.socket).emit(type, subject ,message, url);
    } else {
      const context = [{
        follow,
        subject,
        url,
        message
      }];
      loadTemplate.loadTemplate('notification', context).then((results, err) => {
        return Promise.all(results.map((result) => {
        loadTemplate.sendEmail({
                to: result.context.follow.email,
                from: 'WellDone',
                subject:  result.context.subject ,
                html: result.email.html,
                attachments: [{
                filename: 'blog-".jpg',
                path: './public/images/blog-2.jpg',
                cid: 'blog',
                contentDisposition: "inline"
            }],
            });
        }));
      }).then(() => {
        console.log('send email!');
      })  
    }
  }
)}
   
