const Router = require('koa-router');
module.exports = new Router({
	prefix: '/article'
}).use((ctx, next) => {
	ctx.Content = ctx.db.Content;

	return next();
}).param('id', async (id, ctx, next) => {
	const content = await ctx.Content.get(id);
	
	if (!content) {
		ctx.throw(404, 'The article is not existed.');

		return;
	}

	ctx.content = content;

	return next();
}).post('/', async function (ctx) {
	const { request } = ctx;

	const content = await ctx.Content.create(request.body.language);
	const commit = await content.write(request.body);

	commit.articleId = content.id;

	ctx.body = commit;
}).get('/', async function (ctx) {
	const { Content } = ctx;
	const result = [];

	const contentList = await Content.query();

	for (let content of contentList) {
		const langs = await content.langs();

		for (let lang of langs) {
			const commit = await content.read(lang);

			result.push({
				hash: commit.hash, articleId: content.id,
				lang, title: commit.title, abstract: commit.abstract,
				author: commit.author, createdAt: commit.createdAt
			});
		}
	}

	ctx.body = result;
}).get('/:id', async function (ctx) {
	const { query } = ctx;

	const content = ctx.content;

	if (!content) {
		ctx.throw(404, 'The article is not existed.');

		return;
	}

	ctx.body = await content.read(query.lang);
}).delete('/:id', async function (ctx) {
	const { params } = ctx;

	const article = await ctx.Content.remove(params.id);

	await ctx.db.Classification.destroy({
		where: {
			articleId: params.id
		}
	});

	ctx.body = article;
	ctx.status = 200;
}).post('/:id/commit', async function (ctx) {
	const { request } = ctx;

	ctx.body = await ctx.content.write(request.body);
});