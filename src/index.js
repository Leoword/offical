global.config = require('../config');
global.validate = require('koa2-validation');
global.Joi = require('joi');
global.Router = require('koa-router');

const bodyParser = require('koa-bodyparser');
const router = require('./router');
const Koa = require('koa');

require('./model');

const app = new Koa();

app.context.sequelize = require('./lib/sequelize');

app.use(bodyParser());
app.use(router.routes());

app.listen(config.server.port);