
'use strict'

const db = require('dotenv');
const mongoose = require('mongoose');
const conn = mongoose.connection;

conn.on('error', err => {
	console.error('Error de conexión', err);
	process.exit(1);
});

conn.once('open', () => {
	console.log('Conectado a MongoDB en', conn.name);
});

mongoose.connect("mongodb://localhost:27017/welldone", { useNewUrlParser: true,  useCreateIndex: true  });

module.exports = conn;