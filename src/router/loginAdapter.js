const crypto = require('crypto');
const KEY = 'website:secret';

class Login {
	constructor(interfaceInstance) {
		this.interface = interfaceInstance;
	}

	async validate(info) {
		return await this.interface.validate(info);
	}
}

module.exports = new Login({
	async validate(ctx) {
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
	}
});