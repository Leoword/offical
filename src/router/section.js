const Router = require('koa-router');
const router = module.exports = new Router();
const validate = require('koa2-validation');

const {section: sectionValidate, format: formatValidate} = require('../validator');
const {section, format} = require('../middleware');

router.post('/section', validate(sectionValidate.create), section.create);
router.get('/section', section.getList);
router.get('/section/:id', section.getRetrive);
router.put('/section/:id', validate(sectionValidate.update), section.getRetrive, section.update);
router.delete('/section/:id', section.getRetrive, section.delete);

router.post('/format', validate(formatValidate.create), format.create);
router.get('/format', format.getList);
router.get('/format/:id', format.getRetrive);
router.put('/format/:id', validate(formatValidate.update), format.getRetrive, format.update);
router.delete('/format/:id', format.getRetrive, format.delete);

router.get('/section/:id/collection', section.getRetrive, section.getCollection);