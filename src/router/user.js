const Router = require('koa-router');
const router = module.exports = new Router();

const User = require('./userAdapter');

router.post('/user', async function (ctx) {
	await User.create(ctx);

	ctx.status = 200;
});

router.get('/user', async function (ctx) {
	await User.getList(ctx);
});

router.get('/user/:id', async function (ctx) {
	await User.get(ctx);
});

router.put('/user/:id', async function (ctx) {
	await User.update(ctx);

	ctx.status = 200;
});

router.delete('/user/:id', async function (ctx) {
	await User.destroy(ctx);

	ctx.status = 200;
});

