const Router = require('koa-router');
const router = module.exports = new Router();

router.post('/page', async function (ctx) {
	const {db, request} = ctx;
	const {path, sectionList, state, comment} = request.body;

	const page = await db.Page.create({
		path, sectionList, state, comment
	});

	ctx.body = page;
});

router.get('/page', async function (ctx) {
	const {db} = ctx;

	ctx.body = await db.Page.findAll();
});

router.get('/page/:id', async function (ctx) {
	const {db, params} = ctx;

	const page = await db.Page.findByPk(params.id);

	if (!page) {
		ctx.throw(404, 'The page is not existed.');

		return;
	}

	ctx.body = page;
});

router.put('/page/:id', async function (ctx) {
	const {db, request, params} = ctx;
	const {path, sectionList, state, comment} = request.body;

	const page = await db.Page.findByPk(params.id);

	if (!page) {
		ctx.throw(404, 'The page is not existed.');

		return;
	}

	ctx.body = await page.update({
		path, sectionList, state, comment
	});
});

router.delete('/page/:id', async function (ctx) {
	const {db, params} = ctx;

	const page = await db.Page.findByPk(params.id);

	if (!page) {
		ctx.throw(404, 'The page is not existed.');

		return;
	}

	await page.destroy();

	ctx.status = 200;
});