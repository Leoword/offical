const sequelize = require('../lib/sequelize');
const Sequelize = require('sequelize');

module.exports = sequelize.define('file', {
	hash: {
		type:Sequelize.UUID,
		primaryKey: true,
		defaultValue: Sequelize.UUIDV4
	},
	type: {
		type: Sequelize.STRING
	},
	file: {
		type: Sequelize.BLOB('medium')
	}
}, {
	updatedAt: false
});