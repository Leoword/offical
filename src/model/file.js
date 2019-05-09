const Sequelize = require('sequelize');
const sequelize = require('./sequelize');

module.exports = sequelize.define('file', {
	hash: {
		type: Sequelize.UUID,
		primaryKey: true,
		defaultValue: Sequelize.UUIDV4
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