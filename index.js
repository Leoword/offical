const Koa = require('koa');
const serve = require('koa-static');
const koaBody = require('koa-body');
const path = require('path');

const config = require('./config');
const db = require('./src/model');
const router = require('./src/router');

const app = new Koa();

app.context.db = db;

app.use(koaBody({
	multipart: true,
	formidable: {
		maxFileSize: 200*1024*1024
	}
}));

app.use(serve(path.resolve(__dirname, config.static.path), {
	maxAge: 3600000,
	gzip: true
}));

app.use(router.routes());

app.listen(config.server.port, '0.0.0.0');