const Router = require('koa-router');
const router = module.exports = new Router();

const crypto = require('crypto');
const KEY = 'website:secret';

router.post('/user', async function (ctx) {
	await createUser(ctx);
});

router.get('/user', async function (ctx) {
	await getUserList(ctx);
});

router.get('/user/:id', async function (ctx) {
	await getUser(ctx);
});

router.put('/user/:id', async function (ctx) {
	await updateUser(ctx);
});

router.delete('/user/:id', async function (ctx) {
	await deleteUser(ctx);
});

async function createUser(ctx) {
	const {request, db} = ctx;
	const {username, password} = request;

	const userList = await db.User.findAll({
		where: {
			username
		}
	});

	if (userList.length !== 0) {
		ctx.throws(400, 'The username is existed.');
	}

	db.User.create({
		username,
		password: crypto.createHmac('sha256', KEY).update(password).digest('hex')
	});

	ctx.status = 200;
}

async function getUserList(ctx) {
	const {db} = ctx;

	const userList = await db.User.findAll();

	ctx.body = userList.map(user => {
		return {
			id: user.id, username: user.username,
			createdAt: user.createdAt
		};
	});
}

async function getUser(ctx) {
	const {db, params} = ctx;

	const user = await db.User.findByPk(params.id);

	if (!user) {
		ctx.throws(404, 'The user is not existed.');
	}

	ctx.body = {
		id: user.id, username: user.username,
		createdAt: user.createdAt
	};
}

async function updateUser(ctx) {
	const {db, params, request} = ctx;
	const {username, password} = request;

	const user = await db.User.findByPk(params.id);

	if (!user) {
		ctx.throws(404, 'The user is not existed.');
	}

	const userList = await db.User.findAll({
		where: {
			username
		}
	});

	if (userList.length !== 0) {
		ctx.throws(400, 'The username is existed.');
	}

	user.update({
		username,
		password: password ? crypto.createHmac('sha256', KEY).update(password).digest('hex') : undefined
	});

	ctx.status = 200;
}

async function deleteUser(ctx) {
	const {db, params} = ctx;

	const user = await db.User.findByPk(params.id);

	if (!user) {
		ctx.throws(404, 'The user is not existed.');
	}

	await user.destroy();

	ctx.status = 200;
}

