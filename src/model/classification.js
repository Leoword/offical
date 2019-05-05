const Sequelize = require('sequelize');
const sequelize = require('./sequelize');

module.exports = sequelize.define('classification', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	articleId: {
		type: Sequelize.INTEGER
	},
	categoryId: {
		type: Sequelize.INTEGER
	},
	createdAt: {
		type: Sequelize.DATE,
		defaultValue: Sequelize.NOW,
		allowNull: false
	}
});