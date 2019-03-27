const express = require('express')
const router = express.Router();
const Article = require('../../models/article');
var multer = require('multer');
var upload = multer();


router.post('/addarticle', upload.any(), async(req, res, next) => {

    try {
        console.log(req.body)
		const data = req.body;
		const article = new Article(data);
		const articleSave = await article.save();
		res.json({ success: true, result: articleSave});
	} catch (err) {
	    next(err);
	}
})

module.exports = router;