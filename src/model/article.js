const Sequelize = require('sequelize');
const sequelize = require('./sequelize');

module.exports = sequelize.define('article', {
	id: {
		type: Sequelize.STRING,
		primaryKey: true
	},
	createdAt: {
		type: Sequelize.DATE,
		defaultValue: Sequelize.NOW,
		allowNull: false
	}
});