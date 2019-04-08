'use strict';

const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (req.originalUrl == '/apiv1/user') {
      cb(null, path.join(__dirname, '..', 'public/images'))
  } else if (req.originalUrl == '/apiv1/article/addarticle') {
      cb(null, path.join(__dirname, '..', 'uploads'))
  }
  }, 
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname);
  }
});

module.exports = multer({ 
  storage: storage,
  limits: { fileSize: '50MB' }
});