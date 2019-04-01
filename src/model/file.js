const sequelize = require('../lib/sequelize');
const Sequelize = require('sequelize');

module.exports = sequelize.define('file', {
	hash: {
		type:Sequelize.UUID,
		primaryKey: true
	},
	comment: {
		type: Sequelize.STRING
	},
	type: {
		type: Sequelize.STRING
	},
	file: {
		type: Sequelize.BLOB
	}
}, {
	updatedAt: false
});