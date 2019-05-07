const crypto = require('crypto');
const KEY = 'website:secret';

class User {
	constructor(interfaceInstance) {
		this.interface = interfaceInstance;
	}

	async create() {
		return await this.interface.create();
	}

	async update() {
		return await this.interface.update();
	}

	async get() {
		return await this.interface.get();
	}

	async destroy() {
		await this.interface.destroy();
	}
}

module.exports = new User({
	async create(ctx) {
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
	},
	async update(ctx) {
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
	},
	async getList(ctx) {
		const {db} = ctx;

		const userList = await db.User.findAll();

		ctx.body = userList.map(user => {
			return {
				id: user.id, username: user.username,
				createdAt: user.createdAt
			};
		});
	},
	async get(ctx) {
		const {db, params} = ctx;

		const user = await db.User.findByPk(params.id);

		if (!user) {
			ctx.throws(404, 'The user is not existed.');
		}

		ctx.body = {
			id: user.id, username: user.username,
			createdAt: user.createdAt
		};
	},
	async destroy(ctx) {
		const {db, params} = ctx;

		const user = await db.User.findByPk(params.id);

		if (!user) {
			ctx.throws(404, 'The user is not existed.');
		}

		await user.destroy();
	}
});