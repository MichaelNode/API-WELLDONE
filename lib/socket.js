"use strict";

const Users = require('../models/user');
const loadTemplate = require('../lib/email');
const ioEmitter = require('socket.io-emitter')({host: '127.0.0.1', port: 6379});

// Dependencies
class Socket {
  constructor(server, sessionMiddleware) {
    this.io = require('socket.io')(server);
    const redis = require('socket.io-redis');
    this.io.adapter(redis({host: 'localhost', port: 6379}));
    this.io.use(function (socket, next) {
      sessionMiddleware(socket.request, socket.request.res, next);
    });
    this.ioEmitter = ioEmitter;
    this.initializeSocket();

  };

  initializeSocket() {

    this.io.on('connection', async function (socket) {
      const user = socket.request.session.user;
      if (user) {
        try {
          await Users.findOneAndUpdate({_id: user._id}, {$set: {"socket": socket.id}});

          socket.on('disconnect', async () => {
            await Users.findOneAndUpdate({_id: user._id}, {$set: {"socket": null}});
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

module.exports.ioEmitter = ioEmitter;

/**
 * Function for send notification to an user
 * @param type
 * @param users
 * @param subject
 * @param message
 * @param url
 */

module.exports.sendNotification = (type, users, subject, message, url) => {
  users.forEach(user => {
    // if user is connected send notification in the screen
    if (user.socket) {
      return ioEmitter.to(user.socket).emit(type, subject, message, url);
    }
    // if is offline, send notification in email
    const context = [{
      user,
      subject,
      url,
      message
    }];

    loadTemplate.loadTemplate('notification', context).then((results, err) => {
      return Promise.all(results.map((result) => {
        loadTemplate.sendEmail({
          to: result.context.user.email,
          from: 'WellDone',
          subject: result.context.subject,
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
  })
};

