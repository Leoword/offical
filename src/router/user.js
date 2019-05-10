const Router = require('koa-router');

module.exports = new Router({
	prefix: '/user'
}).use((ctx, next) => {
	ctx.User = ctx.db.User;

	return next();
}).post('/', async function (ctx) {
	const { username, password } = ctx.request.body;

	if (!username || !password) {
		ctx.throw(400, 'The username and password is required.');

		return;
	}

	const userList = await ctx.User.query();

	const isExisted = userList.filter(user => {
		return user.username === username;
	});

	if (isExisted.length !== 0) {
		ctx.throw(400, 'The username is existed.');

		return;
	}
	
	const user = await ctx.User.create(ctx.request.body);

	ctx.body = {
		id: user.id,
		username: user.username
	};
}).get('/', async function (ctx) {
	const userList = await ctx.User.query();

	ctx.body = userList.map(user => {
		return {
			id: user.id,
			username: user.username
		};
	});
}).get('/:id', async function (ctx) {
	const user = await ctx.User.get(ctx.params.id);

	if (!user) {
		ctx.throw(404, 'The user is not existed.');

		return;
	}

	ctx.body = {
		id: user.id,
		username: user.username
	};
}).put('/:id', async function (ctx) {
	const { username } = ctx.request.body;

	const user = await ctx.User.get(ctx.params.id);

	if (!user) {
		ctx.throw(404, 'The user is not existed.');

		return;
	}

	const userList = await ctx.User.query();

	userList.forEach(user => {
		if (user.username === username && user.id !== ctx.params.id) {
			ctx.throw(400, 'The username is existed.');

			return;
		}
	});

	ctx.body = await user.update(ctx.request.body);
}).delete('/:id', async function (ctx) {
	const user = await ctx.User.get(ctx.params.id);

	if (!user) {
		ctx.throw(404, 'The user is not existed.');

		return;
	}

	ctx.body = await user.destroy();
});

