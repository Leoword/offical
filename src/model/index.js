const path = require('path');
const config = require(path.resolve('config.json'));

const { User } = require('./user');
const { Page } = require('./page');
const { Content } = require('./content');
const Category = require('./category');
const Classification = require('./classification');
const File = require('./file');

const sequelize = require('./sequelize');

sequelize.sync({
	force: config.db.sync
});

module.exports = {
	User,
	Page,
	Content,
	Category, Classification,
	File
};