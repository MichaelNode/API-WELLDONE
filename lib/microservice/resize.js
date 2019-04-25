'use strict';

const cote = require('cote');
const sharp = require('sharp');
const fs = require('fs');

const sizes = [ {width: 400},
                {width: 600},
                {width: 800}
            ]

const responder = new cote.Responder({ name: 'resize' });

responder.on('convert', (req, done) =>  {
    sizes.forEach((img) => {
        sharp( '../../public/images/uploads/' + req.image)
        .resize(img.width)
        .toBuffer()
        .then( data => {
            fs.writeFileSync('../../public/images/resize/' + img.width + 'px-' + req.image, data);
        })
        .catch( err => {
            console.log(err);
        });		
    })
});
