const Router = require('koa-router');
const router = module.exports = new Router();

router.post('/article/:articleId/category/:categoryId', async function (ctx) {
	const {db, params} = ctx;
	const {articleId, categoryId} = params;
	const {Article, Category, Classification} = db;

	const article = await Article.findByPk(articleId);
	const category = await Category.findByPk(categoryId);

	if (!article || !category) {
		ctx.throw(404, 'The article or the category is not existed.');

		return;
	}

	ctx.body = await Classification.findOrCreate({
		where: {
			articleId, categoryId
		}
	});
});

router.delete('/article/:articleId/category/:categoryId', async function (ctx) {
	const {db, params} = ctx;
	const {articleId, categoryId} = params;

	const classification = await db.Classification.findOne({
		where: {
			articleId, categoryId
		}
	});

	if (!classification) {
		ctx.throw(404, 'The classification  is not existed.');

		return;
	}

	await classification.destroy();

	ctx.status(200);
});

router.get('/article/:id/category', async function (ctx) {
	const {db, params} = ctx;
	const {Article, Classification} = db;

	const article = await Article.findByPk(params.id);

	if (!article) {
		ctx.throw(404, 'The article is not existed.');

		return;
	}

	const classificationList = await Classification.findAll({
		where: {
			articleId: article.id
		}
	});

	ctx.body = classificationList.map(classification => classification.categoryId);
});