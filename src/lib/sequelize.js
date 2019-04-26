const Sequelize = require('sequelize');
const {
	database, username, password, host, force
} = config.db;

module.exports = new Sequelize(database, username, password, {
	host, dialect: 'mysql',
	define: {
		freezeTableName: true
	},
	timezone: '+08:00',
	sync: {
		force
	}
});