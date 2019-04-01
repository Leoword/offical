exports.Section = require('./section');
exports.Format = require('./format');
exports.Article = require('./article');
exports.Collection = require('./collection');
exports.File = require('./file');

const sequelize = require('../lib/sequelize');

sequelize.sync();