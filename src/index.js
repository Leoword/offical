global.config = require('../config');

const bodyParser = require('koa-bodyparser');
const router = require('./router');
const Koa = require('koa');

const {Pages} = require('./model');
app.context.Page = Pages;

const app = new Koa();

app.context.sequelize = require('./lib/sequelize');

app.use(bodyParser());
app.use(router.routes());

app.listen(config.server.port);