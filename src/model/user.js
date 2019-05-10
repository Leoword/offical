let backend = null;

exports.User = class User {
	constructor ({id, username, password}) {
		this.id = id;
		this.username = username;
		this.password = password;
	}

	async update(info) {
		const {username, password} = info;

		this.username = username;
		this.password = password;

		return await backend.update(this.id, info);
	}

	async destroy() {
		return await backend.destroy(this.id);
	}

	static async get(id) {
		const user = await backend.findByPk(id);

		if (!user) {
			return null;
		}

		return new this(user);
	}

	static async query() {
		const userList = await backend.findAll();

		return userList.map(user => {
			return new this(user);
		});
	}

	static async create(info) {
		const user = await backend.create(info);

		return new this(user);
	}

	static async validate(info) {
		return await backend.validate(info);
	}
};

exports.setBankend = function setBankend(newBackend) {
	backend = newBackend;
};