const Router = require('koa-router');
const router = module.exports = new Router();

router.post('/login', async function (ctx) {
	const user = await ctx.db.User.validate(ctx.request.body);

	if (!user) {
		ctx.throw(404, 'The user is not existed.');
	}

	ctx.session.id = user.id;
	ctx.session.username = user.username;

	ctx.status = 200;
});

router.delete('/logout', function (ctx) {
	delete ctx.session;

	ctx.status = 200;
});

router.get('/session', function (ctx) {
	ctx.body = {
		id: ctx.session.id,
		username: ctx.session.username
	};
});