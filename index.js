const Koa = require('koa');
const serve = require('koa-static');
const koaBody = require('koa-body');
const koaSession = require('koa-session');
const path = require('path');

const config = require(path.resolve('config.json'));
const db = require('./src/model');
const router = require('./src/router');
const { setBackend } = require('./src/router/userAdapter');

setBackend(require('./backend/user'));
db.Page.setBackend(require('./backend/fs'));

const app = new Koa();

app.keys = [Math.random().toString(16).substr(2, 8)];
app.context.db = db;

app.use(koaBody({
	multipart: true,
	formidable: {
		maxFileSize: 200*1024*1024
	}
}));

app.use(koaSession({
	key: config.cookie.key,
	maxAge: config.cookie.maxAge
}, app));

app.use(serve(path.resolve(__dirname, config.static.path), {
	maxAge: 3600000,
	gzip: true
}));

app.use(router.routes());

app.listen(config.server.port, '0.0.0.0');