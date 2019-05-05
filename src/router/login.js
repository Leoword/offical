const Router = require('koa-router');
const router = module.exports = new Router();

const crypto = require('crypto');
const KEY = 'website:secret';

router.post('/login', async function (ctx) {
	const {db, request} = ctx;
	const {username, password} = request.body;

	if (!username || !password) {
		ctx.throw(400, 'The username and password is required.');
	}

	const user = await db.User.findOne({
		where: {
			username,
			password: crypto.createHmac('sha256', KEY).update(password).digest('hex')
		}
	});

	if (!user) {
		ctx.throw(404, 'The user is not existed.');
	}

	ctx.session.username = username;

	ctx.status = 200;
});

router.delete('/login', function (ctx) {
	delete ctx.session.username;

	ctx.status = 200;
});