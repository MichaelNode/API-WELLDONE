const express = require('express')
const router = express.Router();
const db = require('../../lib/connectMongoose');
const ObjectId = require('mongodb').ObjectID;
const jwt = require('jsonwebtoken');

router.delete('/', async (req, res, next) => {
    
        try {
            const userId = req.session.user._id
            await db.collection('users').deleteOne({
                "_id": ObjectId(userId)})
            res.json({success: true})
        } catch (err) {
            console.log('error al borrar', err)
            next(err)
        }

    })
       


module.exports = router;