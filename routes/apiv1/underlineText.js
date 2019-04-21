const express = require('express')
const router = express.Router();
const Text = require('../../models/text');
const {userAuth} = require('../../lib/jwtAuth');

router.post('/', userAuth(), async (req, res, next) => {

        const userId = req.session.user._id

       try {
            let textData = req.body
            textData.user = userId
            const newText = new Text(textData);
            await newText.save()
            res.json({success: true})

        } catch (err) {
            console.log('error al guardar contenido subrayado', err)
            next(err)
        }
    })

router.get('/', async (req, res, next) => {
    try {
        const userId = req.session.user._id;
        await Text.find({ user: userId }, async function(err, docs) {
          if (err) {
            console.log("Hubo un error recuperando los contenidos del usuario");
            return
          } else {
            try {
                let opts = [{path: 'article', select:'title'}, {path: 'user', select:'nick_name'}]
                const contents = await Text.populate(docs, opts)
                console.log('estos son los contenidos', contents)
                
          } catch (err) {
              console.log("Error recuperando los contenidos subrayados", err);
              return
          }
          res.json({ success: "ok", contents: docs });
          }
        });
      } catch (err) {
        next(err);
      }
})

module.exports = router;
