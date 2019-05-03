const config = require('../../config.json');

const User = require('./user');
const Page = require('./page');
const Section = require('./section');
const Format = require('./format');
const Article = require('./content');
const Commit = require('./content/commit');
const Category = require('./category');
const Classification = require('./classification');
const File = require('./file');

const sequelize = require('../sequelize');

sequelize.sync({
	force: config.db.sync
});

module.exports = {
	User,
	Page, Section, Format,
	Article, Commit,
	Category, Classification,
	File
};