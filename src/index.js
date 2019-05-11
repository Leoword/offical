const sequelize = require('./model/sequelize');
const Page = require('./model/page');
const User = require('./model/user');
const Content = require('./model/content');

module.exports = {
	sequelize,
	userSetBackend: User.setBankend,
	pageSetBackend: Page.setBackend,
	contentSetBackend: Content.setBackend
};