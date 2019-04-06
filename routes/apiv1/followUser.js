const express = require('express')
const router = express.Router();
const Users = require('../../models/user');
const {userAuth} = require('../../lib/jwtAuth');

router.put('/', userAuth(), async (req, res, next) => {
    
    const userToFollow = req.body.userToFollow
    const userId = req.session.user._id

    try {
        const user = await Users.findOne({_id: userId}, async function (err, user){
           if (err) {
               console.log('hubo un error buscando usuario')
               return
           }
           if (user.followers.indexOf(userToFollow) === -1){
            await Users.updateOne(
                { _id: userId },
                { $push: { followers: userToFollow }});
                res.json({success: true, btnText:res.__('Unfollow')})
                console.log('se agregó el usuario a seguir ')
           } else {
            await Users.updateOne(
                { _id: userId },
                { $pull: { followers: userToFollow }});
                res.json({success: true, btnText:res.__('Follow')})
                console.log('se eliminó el usuario de la lista de seguidores')
           }
        })

    } catch (err) {
        console.log('error al buscar', err)
        next(err)
    }
})

module.exports = router