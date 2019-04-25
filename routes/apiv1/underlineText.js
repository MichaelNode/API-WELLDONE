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
            res.json({success: true})
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
                const contents = await Text.populate(docs, opts)
                //console.log('estos son los contenidos', contents)
                
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

router.put('/', userAuth(), async (req, res, next) => {
  const userId = req.session.user._id
  try {
        let textData = req.body
        textData.user = userId
       
        const getText = await Text.findOne({
          article: textData.article, 
          user: textData.user, 
          content: { "$regex": textData.content, "$options": "i"}
        })

        if (getText) {
            getText.remove()
            res.json({success: true})
            console.log('contenido encontrado')
        } else {
          console.log('contenido no encontrado')
        }

       /*  if(!getText){
            const newText = await Text.findOne({
              article: textData.article, 
              user: textData.user,
              content:{ "$regex": textData.content, "$options": "i"} }) 
           
            if(newText){
              newText.remove()
              var newContent = newText.content.replace(textData.content,'')
              await Text.updateOne({_id: newText._id},{
                content: newContent
              }) 
            }
           
            if(!newText){ 
              console.log('contenido no encontrado')
              return
            }

            res.json({success: true})
            
        } */
        

    } catch (err) {
        console.log('error al eliminar contenido subrayado', err)
        next(err)
    }
})


module.exports = router;
