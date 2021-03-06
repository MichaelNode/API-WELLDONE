const express = require('express')
const router = express.Router();
const Text = require('../../models/text');
const {userAuth} = require('../../lib/jwtAuth');

router.post('/', userAuth(), async (req, res, next) => {
  const userId = req.session.user._id
  try {
      let textData = req.body
      textData.user = userId

      const newText = await Text.findOne({
        article: textData.article,
        user: textData.user,
        content:textData.content })
      if(newText){
        console.log("el contenido subrayado ya existe el la BD");
        return
      } else {
        const updateText = await Text.findOne({
          article: textData.article,
          user: textData.user,
          content:{ $regex: '.*' +  textData.content + '.*' }})

          if(updateText){
              await Text.updateOne({_id: updateText._id},{
                 content: textData.content
            })

          } else {
            // save new underline
            const newTextunder = new Text(textData);
            await newTextunder.save()
            res.json({success: true, text: newTextunder})
          }
      }
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
                await Text.populate(docs, opts)
                
          } catch (err) {
              console.log("Error recuperando los contenidos subrayados", err);
              return
          }
          
          res.json({ success: "ok", contents: docs.filter(doc => doc.article !== null) });
          }
        });
      } catch (err) {
        next(err);
      }
})

router.delete('/', userAuth(), async (req, res, next) => {
  const userId = req.session.user._id
  try {
        let textData = req.body
        textData.user = userId

        const getText = await Text.findOne({
          _id: textData.id,
          user: textData.user
        })

        if (getText) {
            getText.remove()
            res.json({success: true})
            console.log('contenido encontrado')
        } else {
          console.log('contenido no encontrado')
        }

    } catch (err) {
        console.log('error al eliminar contenido subrayado', err)
        next(err)
    }
})


module.exports = router;
