const Router = require('koa-router');
const router = module.exports = new Router();
const validate = require('koa2-validation');

const {page: pageValidate} = require('../validator');
const {page} = require('../middleware');

router.post('/page', validate(pageValidate.create), page.validate, page.create);
router.get('/page', page.getList);
router.get('/page/:id', page.getRetrive);
router.put('/page/:id', validate(pageValidate.update), page.validate, page.update);
router.delete('/page/:id', page.getRetrive, page.delete);