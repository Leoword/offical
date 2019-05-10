const Router = require('koa-router');
const router = module.exports = new Router();

const { User } = require('./userAdapter');

router.post('/login', async function (ctx) {
	await User.validate(ctx);

	ctx.status = 200;
});

router.delete('/logout', function (ctx) {
	delete ctx.session.username;

	ctx.status = 200;
});

router.get('/session', function (ctx) {
	ctx.body = {
		id: ctx.session.id,
		username: ctx.session.username
	};
});