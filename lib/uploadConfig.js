'use strict';

const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..' ,'public','images','uploads'));
  }, 
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname);
  }
});

module.exports = multer({ 
  storage: storage,
  limits: { fileSize: '50MB' }
});