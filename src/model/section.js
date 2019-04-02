const sequelize = require('../lib/sequelize');
const Sequelize = require('sequelize');

module.exports = sequelize.define('section', {
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	format: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	collection: {
		type: Sequelize.JSON,
		allowNull: false,
		defaultValue: Sequelize.JSON
	},
	comment: {
		type: Sequelize.STRING
	}
});