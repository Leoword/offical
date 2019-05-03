const Sequelize = require('sequelize');
const sequelize = require('../sequelize');

module.exports = sequelize.define('section', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	formatId: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	collection: {
		type: Sequelize.STRING,
		allowNull: false,
		set(value) {
			this.setDataValue('collection', JSON.stringify(value));
		},
		get() {
			return JSON.parse(this.getDataValue('collection'));
		}
	},
	comment: {
		type: Sequelize.STRING
	}
});