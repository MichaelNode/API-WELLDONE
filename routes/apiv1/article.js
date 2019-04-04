const express = require('express')
const router = express.Router();
const Article = require('../../models/article');
const upload = require('../../lib/uploadConfig');
const { check ,validationResult } = require('express-validator/check');
const {validation} = require('../../lib/articleService');
const path = require("path");


router.post('/addarticle' ,  upload.single('file'),  validation, async(req, res, next) => {
    try {
		var data = {};
		const type_file = path.extname(req.file.filename).toLowerCase()
		const validationErrors = validationResult(req.body);
		if (!validationErrors.isEmpty()) {
			return res.status(422).json({ errors: validationErrors.array() });
		}
			if(req.file){
				if(type_file == '.jpg' || type_file == '.jpeg' || type_file == '.png'){
					data = {
						title: req.body.title,
						file_type: type_file,
						file_name: req.file.filename,
						summary: req.body.summary,
						content: req.body.content,
						state:   req.body.state,
						publi_date: req.body.publi_date
					}
				} else {
					return res.json({ error: 'imagen no valida'});
				}	
			}
			else {
				data = {
					title: req.body.title,
					summary: req.body.summary,
					content: req.body.content,
					state:   req.body.state,
					publi_date: req.body.publi_date,
					url: req.body.url
				}
			}

			const article = new Article(data);
			const articleSave = await article.save();
			console.log('create success')
			res.json({ success: true, result: articleSave});
	
	
	} catch (err) {
	    next(err);
	}
})


router.get('/editArticle/:id', async (req, res, next) => {
	try {
		const articleId = req.params.id;
		const article = await Article
			.findById({_id: articleId})
			.select(`
				title 
				file_type 
				file_name 
				summary 
				content 
				state  
				publi_date url`)
			.exec();
		if(!article){
			next(createError(404));
			return;
		}
		res.json({result: article})
	} catch (err) {
		next(err);
	}
});

router.put('/editArticle/:id', async (req, res, next) => {
    try {
        const articleId = req.params.id
        await Article.findOne({_id: articleId}, async function (err, user){
            if (err){
                console.log('hubo un error al encontrar el artículo', err)
                return
            } 
            try {
                await Article.updateOne({_id: ArticleId}, {
					title: req.body.title,
					file_type: req.file.mimetype,
					file_name: req.file.filename,
					summary: req.body.summary,
					content: req.body.content,
					state:   req.body.state,
					publi_date: req.body.publi_date,
					url: req.body.url,
					last_modification: Date.now()
                })
                console.log('actualizando artículo: ' + req.body.title);
            } catch (err) {
                console.log('Error ', err)
            }
        });
        res.json({success: true})
    } catch (err) {
        console.log('hubo un error al encontrar el artículo', err)
        next(err)
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