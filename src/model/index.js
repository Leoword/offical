require('./section');
require('./format');
require('./article');
require('./collection');
require('./assets');

const sequelize = require('../lib/sequelize');

sequelize.sync();