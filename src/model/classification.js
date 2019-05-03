const Sequelize = require('sequelize');
const sequelize = require('../sequelize');

module.exports = sequelize.define('classification', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	articleId: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	categoryId: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	createdAt: {
		type: Sequelize.DATE,
		defaultValue: Sequelize.NOW,
		allowNull: false
	}
});