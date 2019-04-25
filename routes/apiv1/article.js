const express = require('express')
const router = express.Router();
const Article = require('../../models/article');
const Users = require('../../models/user');
const upload = require('../../lib/configimage');
const { check ,validationResult } = require('express-validator/check');
const {validation, filter} = require('../../lib/articleService');
const path = require("path");
const {jwtAuth} = require('../../lib/jwtAuth');
const {sendNotification} = require('../../lib/socket');
const cote = require('cote');
const request = new cote.Requester({ name: 'resize' });
const image = require('../../lib/delete_image')



router.post('/addarticle/:id?', upload.single('file'),  validation, jwtAuth(), async(req, res, next) => {
	 try {
		const user = req.session.user;
		var data = {};
		const validationErrors = validationResult(req.body);
		if (!validationErrors.isEmpty()) {
			return res.status(422).json({ errors: validationErrors.array() });
		}

			if(req.file){
				const type_file = path.extname(req.file.filename).toLowerCase()
				if(type_file == '.jpg' || type_file == '.jpeg' || type_file == '.png'){
					// send to micro service resize
					request.send({
						type: 'convert' ,
						image: req.file.filename,
					}, res => { 
						console.log('respuesta '+ res);
					});
					data = {
						title: req.body.title,
						file_type: type_file,
						file_name: req.file.filename,
						summary: req.body.summary,
						content: req.body.content,
						state:   req.body.state,
						author: user._id,
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
					author: user._id,
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

			const users_r =  await Users.findOne({_id:req.session.user._id})
			const followers_r = await users_r.getFollowing();

			sendNotification(
						'notification-article',
						followers_r ,
						`${res.__('New article')} ${articleSave.title} by ${users_r.nick_name}`,
						`${articleSave.summary}`,
						`${process.env.HOST}/article/${user.nick_name}/${articleSave._id}`
			);

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

router.put('/editArticle/:id', upload.single('file'),  validation, jwtAuth(), async (req, res, next) => {

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
								image.delete_image('public/images/uploads/',article.file_name,'public/images/resize/') 
							}
						}

						dato.file_type = req.file.mimetype;
						dato.file_name = req.file.filename;
						dato.url = ''

						// micro service - resize
						request.send({
							type: 'convert' ,
							image: req.file.filename,
						}, res => { 
							console.log('respuesta '+ res);
						});


					} else if (!req.file  && !(req.body.url =='undefined'||req.body.url =='')) {

						if(article.file_name){
							image.delete_image('public/images/uploads/',article.file_name,'public/images/resize/') 
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
		console.log('favoooritos',articles)
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
	const {articles, pagination} = await filter(req, res, {author: userId}, {}, true);
	res.json({articles: articles, pagination: pagination});
});


router.get('/resumen', async (req, res, next) => {
	console.log('ingreso a resumen')
	try {
	  const userId = req.session.user._id;
	
		let follower = null;
		let following = null;
		let articles = null;
	  await Users.findOne({ _id: userId }, async function(err, user) {
		if (err) {
		  console.log("Hubo un error recuperando el usuario");
		  return
		} else {
		  try {
			articles = await Article.find({
			  author: userId }
			).countDocuments();
			const users_r =  await Users.findOne({_id:userId})
			follower = await Users.find({followers: {$in: [userId]}}).countDocuments()
			following =  await Users.find({_id:userId}).select('-_id +followers').countDocuments()
			var response = {
				articles,
				follower,
				following
			}
		} catch (err) {
			console.log("Error recuperando los datos", err);
			return
		}
		res.json({ success: "ok", result: response });
		}
	  });
	} catch (err) {
	  next(err);
	}
  });

router.delete('/deleteArticle', jwtAuth(), async (req, res, next) => {
	const userId = req.user
	const artId = req.body.id
	try{
		await Article.findOne({_id: artId}, function (err, doc) {
			if (err){
				console.log('hubo un error al borrar el artículo', err)
				return
			}
			if (userId != doc.author){
				console.log('No tienes permiso para realizar esta acción')
				return
			} else {
				doc.remove();
			}
			console.log('artículo borrado', doc.title)
		})
	} catch (error) {
		console.log('no se pudo borrar el artículo')
	}
})



module.exports = router;
