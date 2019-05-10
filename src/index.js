const sequelize = require('./model/sequelize');
const Page = require('./model/page');
const User = require('./model/user');

module.exports = {
	sequelize,
	userSetBackend: User.setBankend,
	pageSetBackend: Page.setBackend
};