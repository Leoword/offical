global.config = require('../config');

const bodyParser = require('koa-body');
const router = require('./router');
const Koa = require('koa');
const serve = require('koa-static');
const path = require('path');

const {Pages} = require('./model');

const app = new Koa();

app.context.Page = Pages;
app.context.sequelize = require('./lib/sequelize');

app.use(bodyParser({
	multipart: true,
	formidable: {
		maxFileSize: 200*1024*1024
	}
}));
app.use(router.routes());
app.use(serve(path.resolve(__dirname, './www'), {
	maxAge: 3600000,
	gzip: true
}));

app.listen(config.server.port, '0.0.0.0');