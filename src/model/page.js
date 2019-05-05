const Sequelize = require('sequelize');
const sequelize = require('./sequelize');

module.exports = sequelize.define('page', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	path: {
		type: Sequelize.STRING,
		allowNull: false
	},
	sectionList: {
		type: Sequelize.STRING,
		allowNull: false,
		set(value) {
			this.setDataValue('sectionList', JSON.stringify(value));
		},
		get() {
			return JSON.parse(this.getDataValue('sectionList'));
		}
	},
	state: {
		type: Sequelize.BOOLEAN,
		allowNull: false
	},
	comment:{
		type: Sequelize.STRING
	},
	createdAt: {
		type: Sequelize.DATE,
		defaultValue: Sequelize.NOW,
		allowNull: false
	}
});