const Router = require('koa-router');

const article = require('./article');
const category = require('./category');
const classification = require('./classification');
const file = require('./file');
const page = require('./page');
const user = require('./user');
const login = require('./login');

const router = module.exports = new Router();

const validatedRouter = new Router();

validatedRouter.use(article.routes());
validatedRouter.use(category.routes());
validatedRouter.use(classification.routes());
validatedRouter.use(file.routes());
validatedRouter.use(page.routes());
validatedRouter.use(user.routes());

router.use('/api', isLogin, validatedRouter.routes());
router.use(login.routes());

async function isLogin(ctx, next) {
	// if (!ctx.session.username) {
	// 	ctx.throw(401, 'You have to login.');

	// 	return;
	// }

	await next();
}