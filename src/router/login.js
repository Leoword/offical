const Router = require('koa-router');
const router = module.exports = new Router();

const loginValidate = require('./loginAdapter');

router.post('/login', async function (ctx) {
	await loginValidate.validate(ctx);

	ctx.status = 200;
});

router.delete('/login', function (ctx) {
	delete ctx.session.username;

	ctx.status = 200;
});