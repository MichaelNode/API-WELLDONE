'use strict'
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '..', 'public/images'))
    },
    filename: (req, file, cb) => {
        cb(null,  Date.now() + '_' + file.originalname )
    }
})

module.exports = multer({ storage: storage })