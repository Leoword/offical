const Sequelize = require('sequelize');
const sequelize = require('./sequelize');

module.exports = sequelize.define('category', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	parent: {
		type: Sequelize.INTEGER
	},
	comment: {
		type: Sequelize.STRING
	},
	createdAt: {
		type: Sequelize.DATE,
		defaultValue: Sequelize.NOW,
		allowNull: false
	}
});