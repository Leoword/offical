const path = require('path');
const config = require(path.resolve('config.json'));

const User = require('./user');
const Page = require('./page');
const Content = require('./content');
const Article = require('./article');
const Commit = require('./commit');
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
	Content, Article, Commit,
	Category, Classification,
	File
};