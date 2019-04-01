global.config = require('../config');
global.validate = require('koa2-validation');
global.Joi = require('joi');

const db = require('./model');
const bodyParser = require('koa-bodyparser');
const router = require('./router');
const Koa = require('koa');

const app = new Koa();

app.context.db = db;

app.use(bodyParser());
app.use(router.routes());

app.listen(config.server.port);