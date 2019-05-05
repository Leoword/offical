const Sequelize = require('sequelize');
const sequelize = require('./sequelize');

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
		allowNull: false
	},
	createdAt: {
		type: Sequelize.DATE,
		defaultValue: Sequelize.NOW,
		allowNull: false
	}
});