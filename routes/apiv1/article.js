const express = require('express')
const router = express.Router();
const Article = require('../../models/article');
const upload = require('../../lib/uploadConfig');
const generateImages = require('generate-responsive-images');



router.post('/addarticle',  upload.single('file'), async(req, res, next) => {
    try {
	
		console.log('entro en post', req.body.content)
		console.log(req.body.url)
		const data = {
			title: req.body.title,
			file_type: req.file.mimetype,
			file_name: req.file.filename,
			summary: req.body.summary,
			content: req.body.content,
			state:   req.body.state,
			publi_date: req.body.publi_date,
			url: req.body.url
		};

		Options = {
			name: req.file.filename,
			ext: 'jpg',
			dist: '../../uploads' 
		}
	
		generateImages(req.file.buffer, Options);

		const article = new Article(data);
		const articleSave = await article.save();
		res.json({ success: true, result: articleSave}); 
	} catch (err) {
	    next(err);
	}
})


router.get('/categories', (req, res, next) => {
    try {
		const categories =  Article.allowedCategories();
		res.json({results :categories})
	} catch (err) {
	    next(err);
	}
})


module.exports = router;