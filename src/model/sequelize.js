const Sequelize = require('sequelize');
const path = require('path');

const { db } = require(path.resolve(process.cwd(), 'config.json'));

module.exports = new Sequelize(db.database, db.username, db.password, {
	host: db.host,
	dialect: 'mysql',
	define: {
		freezeTableName: true,
		timestamps: false
	},
	timezone: '+08:00'
});