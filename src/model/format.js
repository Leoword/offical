const Sequelize = require('sequelize');
const sequelize = require('./sequelize');

module.exports = sequelize.define('format', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	comment: {
		type: Sequelize.STRING
	}
});