const Router = require('koa-router');
const router = module.exports = new Router();

router.post('/article', async function (ctx) {
	const {db, request} = ctx;
	const {Content} = db;

	const content = await Content.create();

	ctx.body = await content.write(request.body);
});

router.get('/article/:id', async function (ctx) {
	const {db, params, query} = ctx;
	const {Content} = db;

	const content = await Content.get(params.id);

	if (!content) {
		ctx.throw(404, 'The article is not existed.');

		return;
	}

	ctx.body = await content.read(query.lang);
});

router.get('/article', async function (ctx) {
	const {db} = ctx;
	const {Article, Content} = db;
	const result = [];

	const articleList = await Article.findAll();

	for (let article of articleList) {
		const content = await Content.get(article.id);
		const langs = await content.langs();

		for (let lang of langs) {
			const commit = content.read(lang);

			result.push({
				hash: commit.hash, articleId: article.id,
				lang, title: commit.title, abstract: commit.abstract,
				author: commit.author, createdAt: commit.createdAt
			});
		}
	}

	ctx.body = result;
});

router.delete('/article/:id', async function (ctx) {
	const {db, params} = ctx;

	const {Content} = db;

	await Content.remove(params.id);
});

router.post('/article/:id/commit', async function (ctx) {
	const {db, params, request} = ctx;
	const {Content} = db;

	const content = await Content.get(params.id);

	if (!content) {
		ctx.throw(404, 'The article is not existed.');

		return;
	}

	ctx.body = await content.write(request.body);
});