const Router = require('koa-router');

const article = require('./article');
const category = require('./category');
const classification = require('./classification');
const file = require('./file');
const format = require('./format');
const section = require('./section');
const page = require('./page');
const user = require('./user');

const router = module.exports = new Router({prefix: '/api'});

router.use(article.routes());
router.use(category.routes());
router.use(classification.routes());
router.use(file.routes());
router.use(format.routes());
router.use(section.routes());
router.use(page.routes());
router.use(user.routes());