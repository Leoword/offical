const Sequelize = require('sequelize');
const sequelize = require('../sequelize');

const crypto = require('crypto');
const KEY = 'secret';

module.exports = sequelize.define('user', {
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
		allowNull: false,
		set(value) {
			const password = crypto.createHmac('sha256', KEY).update(value).digest('hex');

			this.setDataValue('password', password);
		}
	},
	createdAt: {
		type: Sequelize.DATE,
		defaultValue: Sequelize.NOW,
		allowNull: false
	}
});