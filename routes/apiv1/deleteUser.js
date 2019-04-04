const express = require('express')
const router = express.Router();
const Users = require('../../models/user');
const {jwtAuth} = require('../../lib/jwtAuth');

router.delete('/', jwtAuth(), async (req, res, next) => {

        try {
            const userId = req.user;
            await Users.findOne({_id: userId}, function (err, user){
                if (err){
                    console.log('hubo un error al borrar la cuenta del usuario', err)
                    return
                }
                user.remove();
                console.log('Usuario borrado: ' + user.name + ' ' + user.last_name);
            });
            res.json({success: true})
        } catch (err) {
            console.log('error al borrar', err)
            next(err)
        }
    })

module.exports = router;
