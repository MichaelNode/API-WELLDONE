// Dependencies
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const {getUserFromRequestLogged, isLogged} = require('../../lib/jwtAuth');
var multer = require('multer');
var upload = multer();

/**
 * POST login by api, will return jwt token
 */
router.post('/login', upload.any(), async (req, res, next) => {
    try {
        const user = await getUserFromRequestLogged(req);
        // if no user then return an error
        if (!user) {
            res.status(400);
            res.json({'success': false, 'error': res.__('Invalid credentials')});
            return;
        }

        // get jwt token from this user
        jwt.sign({_id: user.id}, process.env.JWT_SECRET, {
            expiresIn: '1d'
        }, (err, token) => {
            // check if error exists
            if (err) {
                console.log('AQUI');
                console.log(err);
                res.json({'success': false, 'error': res.__('Error in login process')});
                return;
            }
            // save user in session
            req.session.user = {_id: user._id};
            // return token with a success response
            res.json({'success': true, token: token});
        });
    } catch (err) {
        console.log(err);
        next(err);
    }

});

/**
 * GET logout route, will destroy user session
 */
router.get('/logout', (req, res, next) => {
    if (!isLogged(req)) {
        res.json({'success': false, 'error': res.__('you are not authenticated')});
        return;
    }

    // remove session
    delete req.session.user;

    // regenerate empty session
    req.session.regenerate(function (err) {
        if (err) {
            next(err);
        } else {
            res.json({'success': true});
        }
    })
});

module.exports = router;
