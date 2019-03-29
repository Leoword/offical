const Sequelize = require('sequelize');
const {
	database, username, password, host, dialect, force,
	freezeTableName
} = global.config.db;

module.exports = new Sequelize(database, username, password, {
	host, dialect,
	define: {
		freezeTableName
	},
	timezone: '+08:00',
	sync: {
		force
	}
});