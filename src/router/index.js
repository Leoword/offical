const Router = require('koa-router');

const artilceRouter = require('./article');
const fileRouter = require('./file');
const sectionRouter = require('./section');

const router = module.exports = new Router({prefix: '/api'});

router.use(artilceRouter.routes());
router.use(fileRouter.routes());
router.use(sectionRouter.routes());
