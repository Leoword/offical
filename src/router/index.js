const Router = require('koa-router');

const article = require('./article');
const category = require('./category');
const classification = require('./classification');
const file = require('./file');
const page = require('./page');
const user = require('./user');
const login = require('./login');

const router = module.exports = new Router({
	prefix: '/api'
});

router.use(login.routes());

router.get('/file/:hash', async function (ctx) {
	const file = await ctx.db.File.findByPk(ctx.params.hash);

	if (!file) {
		ctx.throw(404, 'The file is not existed.');

		return;
	}

	ctx.set('Content-Type', file.type);
	ctx.body = Buffer.from(file.file);
});

router.use(isLogin);

router.use(article.routes());
router.use(category.routes());
router.use(classification.routes());
router.use(file.routes());
router.use(page.routes());
router.use(user.routes());

async function isLogin(ctx, next) {
	if (!ctx.session.username) {
		ctx.throw(401, 'You have to login.');

		return;
	}

	await next();
}