const express = require('express')
const router = express.Router();
const Users = require('../../models/user');
const {userAuth} = require('../../lib/jwtAuth');

router.put('/', userAuth(), async (req, res, next) => {

        const articleID = req.body.articleID
        const userId = req.session.user._id
       try {
            const user = await Users.findOne({_id: userId}, async function (err, user){
               if (err) {
                   console.log('hubo un error buscando usuario')
                   return
               }
               if (user.favArticles.indexOf(articleID)){
                await Users.updateOne(
                    { _id: userId },
                    { $push: { favArticles: articleID }});
                    res.json({success: true, add: 'fas', remove: 'far'})
                    console.log('se agregó el artículo como favorito')
               } else {
                await Users.updateOne(
                    { _id: userId },
                    { $pull: { favArticles: articleID }});
                    res.json({success: true, add: 'far', remove: 'fas'})
                    console.log('se eliminó el artículo como favorito')
               }
            })

        } catch (err) {
            console.log('error al buscar', err)
            next(err)
        }
    })

module.exports = router;
