const sequelize = require('../lib/sequelize');
const Sequelize = require('sequelize');

module.exports = sequelize.define('section', {
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	formatId: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	collection: {
		type: Sequelize.JSON,
		allowNull: false,
		defaultValue: true
	},
	comment: {
		type: Sequelize.STRING
	}
});