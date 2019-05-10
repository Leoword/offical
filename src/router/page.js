const Router = require('koa-router');

module.exports = new Router({
	prefix: '/page'
}).use((ctx, next) => {
	ctx.Page = ctx.db.Page;

	return next();
}).param('id', async (id, ctx, next) => {
	const pageId = id;
	const page = await ctx.Page.getById(pageId);
	
	if (!page) {
		ctx.throw(404, 'The page is not existed.');

		return;
	}

	ctx.page = page;

	return next();
}).post('/', async ctx => {
	const { name, router} = ctx.request.body;

	if (!name || !router) {
		ctx.throw(400, 'The name and router is required.');
	}

	const pageList = await ctx.Page.query();

	pageList.forEach(page => {
		if (page.name === name || page.router === router) {
			ctx.throw(400, 'The name or router is existed.');
		}
	});

	const page = await ctx.Page.create(ctx.request.body);

	ctx.body = page;
}).get('/', async ctx => {
	ctx.body = await ctx.Page.query();
}).get('/:id', async ctx => {
	ctx.body = ctx.page;
}).put('/:id', async ctx => {
	const { name, router} = ctx.request.body;

	const pageList = await ctx.Page.query();

	pageList.forEach(page => {
		if (page.id !== ctx.params.id && (page.name === name || page.router === router)) {
			ctx.throw(400, 'The name or router is existed.');
		}
	});

	ctx.body = await ctx.page.update(ctx.request.body);
}).delete('/:id', async ctx => {
	ctx.body = await ctx.page.destroy();
});