const express = require('express')
const router = express.Router();
const Users = require('../../models/user');
const { userAuth } = require('../../lib/jwtAuth');
const { sendNotification } = require('../../lib/socket');

router.put('/', userAuth(), async (req, res, next) => {

    const userToFollow = req.body.userToFollow;
    const userLogged = req.session.user._id;
    const userName = req.session.user.name;
    const user_nickName = req.session.user.nick_name

    try {
        await Users.findOne({_id: userToFollow}, async function (err, user){
           if (err) {
               console.log('hubo un error buscando usuario')
               return
           }
           if (user.followers.indexOf(userLogged) === -1){
            await Users.updateOne(
                { _id: user._id },
                { $push: { followers: userLogged }});
                res.json({success: true, btnText:res.__('Unfollow')})
                sendNotification(
                    'follow-user', 
                    [user], 
                    `${userName} ${res.__('follows you')}`,
                    `${res.__('Congrats! You have a new follower')}`,
                    `${process.env.HOST}/articles/user/${user_nickName}`
        ); 
                console.log('se agregó el usuario a seguir ')
           } else {
            await Users.updateOne(
                { _id: user._id },
                { $pull: { followers: userLogged }});
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
