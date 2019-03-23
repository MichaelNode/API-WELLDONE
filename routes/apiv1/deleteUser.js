const express = require('express')
const router = express.Router();
const Users = require('../../models/user');

router.delete('/', async (req, res, next) => {
    
        try {
            const userId = req.session.user._id
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