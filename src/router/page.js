const Router = require('koa-router');
const router = module.exports = new Router();

router.post('/page', async function (ctx) {
	const {db, request} = ctx;
	const {options} = request.body;

	const page = await db.Page.create();

	ctx.body = page.write(options);
});

router.get('/page', async function (ctx) {
	const {db} = ctx;

	ctx.body = await db.Page.getPages();
});

router.get('/page/:id', async function (ctx) {
	const {db, params} = ctx;

	const page = await db.Page.get(params.id);

	if (!page) {
		ctx.throw(404, 'The page is not existed.');

		return;
	}

	ctx.body = page;
});

router.put('/page/:id', async function (ctx) {
	const {db, request, params} = ctx;
	const {options} = request.body;

	const page = await db.Page.get(params.id);

	if (!page) {
		ctx.throw(404, 'The page is not existed.');

		return;
	}

	ctx.body = await page.write(options);
});

router.delete('/page/:id', async function (ctx) {
	const {db, params} = ctx;

	await db.Page.destroy(params.id);

	ctx.status = 200;
});