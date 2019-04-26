exports.Section = require('./section');
exports.Format = require('./format');
exports.Article = require('./article');
exports.File = require('./file');

const Pages = exports.Pages = require('./page');
Pages.init();

const sequelize = require('../lib/sequelize');
sequelize.sync();