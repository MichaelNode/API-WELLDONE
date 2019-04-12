const express = require('express')
const router = express.Router();
const Article = require('../../models/article');
const Users = require('../../models/user');
const upload = require('../../lib/configimage');
const { check ,validationResult } = require('express-validator/check');
const {validation, filter} = require('../../lib/articleService');
const path = require("path");
const {jwtAuth} = require('../../lib/jwtAuth');
var fs = require('fs');


router.post('/addarticle/:id?' , upload.single('file'),  validation, async(req, res, next) => {

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

					if(req.body.state == 'true'){
						data.publi_date = req.body.publi_date
					}
					if(req.body.id && req.body.id !== 'undefined')
					{
						data.article = req.body.id
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
				if(data.url){
					if(data.url.includes('youtube.com'))
					data.url_type = 'youtube'
					else
					data.url_type = 'mp4'
				}
				if(req.body.id && req.body.id !== 'undefined')
				{
					data.article = req.body.id
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

router.put('/editArticle/:id', upload.single('file'),  validation, async (req, res, next) => {

	const articleId = req.params.id
    try {
		if(req.body.title)
		{
			try {
				await Article.findOne({_id: articleId}, async function (err, article){
					if (err){
						console.log('hubo un error al encontrar el artículo', err)

					}


					const dato = {
						title: req.body.title,
						summary: req.body.summary,
						content: req.body.content,
						state:   req.body.state,
						publi_date: req.body.publi_date,
						last_modification: Date.now(),
						category: req.body.category
					}


					if(req.file && (req.body.url =='undefined'||req.body.url =='') ){


						if(article.file_name){
							if(req.file.filename !== article.file_name){
								fs.unlinkSync(path.join('public/images/uploads/', article.file_name ));
							}
						}
						dato.file_type = req.file.mimetype;
						dato.file_name = req.file.filename;
						dato.url = ''


					} else if (!req.file  && !(req.body.url =='undefined'||req.body.url =='')) {

						if(article.file_name){
							fs.unlinkSync(`public/images/uploads/${article.file_name}`);
						}
						dato.file_type = '';
						dato.file_name = '';
						dato.url = req.body.url
					}
					if(dato.url){
						if(dato.url.includes('youtube.com'))
						dato.url_type = 'youtube'
						else
						dato.url_type = 'mp4'
					}
					const articleObj = await Article.
						updateOne({_id: req.params.id},
						dato
					)
					res.json({success: true})
			});
		} catch (err) {
			console.log('Error ', err)
		}

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

router.get('/favourites', async (req, res, next) => {
	try {
	  const userId = req.session.user._id;
	  let articles = [];
	  await Users.findOne({ _id: userId }, async function(err, user) {
		if (err) {
		  console.log("Hubo un error recuperando el usuario");
		  return
		} else {
		  try {
			articles = await Article.find({
			  _id: { $in: user.favArticles }
			}).populate('author', 'nick_name');
		} catch (err) {
			console.log("Error recuperando los artículos favoritos", err);
			return
		}
		res.json({ success: "ok", articles: articles });
		}
	  });
	} catch (err) {
	  next(err);
	}
  });

/**
 * Get articles of user logged
 */
router.get('/me', jwtAuth(), async (req, res, next) => {
	const userId = req.user;
	const {articles, pagination} = await filter(req, res,{author: userId});
	res.json({articles: articles, pagination: pagination});
});

module.exports = router;
