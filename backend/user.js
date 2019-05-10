
const crypto = require('crypto');
const KEY = 'website:secret';
const path = require('path');

const Sequelize = require('sequelize');
const { sequelize } = require('../src');

const { account } = require(path.resolve('config.json'));

const User = sequelize.define('user', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	username: {
		type: Sequelize.STRING(32),
		allowNull: false,
		unique: true
	},
	password: {
		type: Sequelize.STRING,
		allowNull: false
	},
	createdAt: {
		type: Sequelize.DATE,
		defaultValue: Sequelize.NOW,
		allowNull: false
	}
});

const cache = {
	0: {
		id: 0,
		username: account.username,
		password: crypto.createHmac('sha256', KEY).update(account.password).digest('hex')
	}
};

async function initCache() {
	const userList = await User.findAll();

	userList.map(user => {
		cache[user.id] = user;
	});
}

module.exports = {
	findAll() {
		const result = [];

		for (let key in cache) {
			const { username, password} = cache[key];

			result.push({
				id: key,
				username, password
			});
		}

		return result;
	},
	findByPk(id) {
		return cache[id];
	},
	async create({ username, password }) {
		const user =  await User.create({
			username,
			password: crypto.createHmac('sha256', KEY).update(password).digest('hex')
		});

		cache[user.id] = user;

		return user;
	},
	async update(id, { username, password }) {
		await User.update({
			username,
			password: password ? crypto.createHmac('sha256', KEY).update(password).digest('hex') : undefined
		}, {
			where: {
				id
			}
		});

		cache[id] = {
			id, username, password
		};

		return cache[id];
	},
	async destroy(id) {
		const user = await User.destroy({
			where: {
				id
			}
		});

		delete cache[id];

		return user;
	},
	validate({ username, password}) {
		let user;

		for (let key in cache) {
			if (cache[key].username === username && cache[key].password === crypto.createHmac('sha256', KEY).update(password).digest('hex')) {
				user = cache[key];
			}
		}

		return user;
	},
	initCache
};