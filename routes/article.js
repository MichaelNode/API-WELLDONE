'use strict';



const express = require('express');
const router = express.Router();
const Articles = require('../models/article')



/* GET anuncios page. */
router.get('/', function (req, res, next) {
        console.log('entro')
        Articles.find({}).exec(function(err, resp){
            res.render('articles', { articles: resp });
        })
       
      
     

    
});

module.exports = router;