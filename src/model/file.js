const Sequelize = require('sequelize');
const sequelize = require('./sequelize');

module.exports = sequelize.define('file', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	type: {
		type: Sequelize.STRING,
		allowNull: false
	},
	file: {
		type: Sequelize.BLOB('medium'),
		allowNull: false
	},
	createdAt: {
		type: Sequelize.DATE,
		defaultValue: Sequelize.NOW,
		allowNull: false
	}
});