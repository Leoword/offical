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
router.use(isLogin, article.routes());
router.use(isLogin, category.routes());
router.use(isLogin, classification.routes());
router.use(isLogin, file.routes());
router.use(isLogin, page.routes());
router.use(isLogin, user.routes());

async function isLogin(ctx, next) {
	if (!ctx.session.username) {
		ctx.throw(401, 'You have to login.');

		return;
	}

	await next();
}