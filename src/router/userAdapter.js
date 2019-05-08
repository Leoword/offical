const crypto = require('crypto');
const KEY = 'website:secret';

class User {
	constructor(interfaceInstance) {
		this.interface = interfaceInstance;
	}

	async create(ctx) {
		return await this.interface.create(ctx);
	}

	async update(ctx) {
		return await this.interface.update(ctx);
	}

	async get(ctx) {
		return await this.interface.get(ctx);
	}

	async getList(ctx) {
		return await this.interface.getList(ctx);
	}

	async destroy(ctx) {
		await this.interface.destroy(ctx);
	}
}

module.exports = new User({
	async create(ctx) {
		const {request, db} = ctx;
		const {username, password} = request.body;

		if (!username || !password) {
			ctx.throw(400, 'The username and password is required.');
		}

		const userList = await db.User.findAll({
			where: {
				username
			}
		});

		if (userList.length !== 0) {
			ctx.throw(400, 'The username is existed.');
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
			ctx.throw(404, 'The user is not existed.');
		}

		const userList = await db.User.findAll({
			where: {
				username
			}
		});

		if (userList.length !== 0) {
			ctx.throw(400, 'The username is existed.');
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
			ctx.throw(404, 'The user is not existed.');
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
			ctx.throw(404, 'The user is not existed.');
		}

		await user.destroy();
	}
});