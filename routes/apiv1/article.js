const express = require('express')
const router = express.Router();
const Article = require('../../models/article');
const upload = require('../../lib/uploadConfig');
const { check ,validationResult } = require('express-validator/check');
const {validation} = require('../../lib/articleService');
const path = require("path");
const {jwtAuth} = require('../../lib/jwtAuth');

router.post('/addarticle' , upload.single('file'),  validation, async(req, res, next) => {
    try {
		var data = {};
		const validationErrors = validationResult(req.body);
		if (!validationErrors.isEmpty()) {
			return res.status(422).json({ errors: validationErrors.array() });
		}
		const date_public = null;
			if(req.file){
				const type_file = path.extname(req.file.filename).toLowerCase()
				if(type_file == '.jpg' || type_file == '.jpeg' || type_file == '.png'){
					data = {
						title: req.body.title,
						file_type: type_file,
						file_name: req.file.filename,
						summary: req.body.summary,
						content: req.body.content,
						state:   req.body.state,					
						author: req.body.idUSer,
						category: req.body.category
					}
					console.log('entro a',req.body.publi_date, req.body.state)
					if(req.body.state == 'true'){
						data.publi_date = req.body.publi_date 
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
					url: req.body.url,
					author: req.body.idUSer,
					category: req.body.category
				}
				if(req.body.state == 'true'){
					data.publi_date = req.body.publi_date 
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
		const articleId =req.params.id;
		const article = await Article
			.findById({_id: articleId})
			.select(`
				title 
				file_type 
				file_name 
				summary 
				content 
				state  
				publi_date 
				category
				url`)
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

router.put('/editArticle/:id',upload.single('file'), async (req, res, next) => {
	console.log(req.body)
	const articleId = req.params.id
    try {
		if(req.body.title)
		{ 
			await Article.findOne({_id: articleId}, async function (err, user){
				if (err){
					console.log('hubo un error al encontrar el artículo', err)
					return
				}
				try {
					const dato = {
						title: req.body.title,
						summary: req.body.summary,
						content: req.body.content,
						state:   req.body.state,
						publi_date: req.body.publi_date,
						last_modification: Date.now(),
						category: req.body.category
					}
				
					if(req.file && req. req.body.url){
						dato.file_type = req.file.mimetype;
						dato.file_name = req.file.filename;
						dato.url = null
					} else if (req.file && req.req.body.url == null){
						dato.file_type = req.file.mimetype;
						dato.file_name = req.file.filename;
						dato.url = null
					} else {
						dato.file_type = null;
						dato.file_name = null;
						dato.url = req.body.url
					}
					console.log('res',dato.content)
					const article = await Article.
						updateOne({_id: req.params.id}, 
						dato
					)
					console.log('res',article)
					console.log('actualizando artículo: ' + req.body.title);
				} catch (err) {
					console.log('Error ', err)
				}
			});
			res.json({success: true, req: req.body})
		}
		else {
			console.log('body null')
		}
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