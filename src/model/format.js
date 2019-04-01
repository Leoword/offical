const sequelize = require('../lib/sequelize');
const Sequelize = require('sequelize');

module.exports = sequelize.define('format', {
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	comment: {
		type: Sequelize.STRING
	}
});