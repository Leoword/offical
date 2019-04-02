const router = module.exports = new Router();

const {create, update} = require('../validator');
const {section, format} = require('../middleware');

router.post('/section', validate(create.section), section.create);
router.get('/section', validate(create.section), section.getList);
router.get('/section/:id', section.getRetrive);
router.put('/section/:id', validator(update.section), section.getRetrive, section.update);
router.delete('/section/:id', section.getRetrive, section.delete);

router.post('/format', validate(create.format), format.create);
router.get('/format', validate(create.format), format.getList);
router.get('/format/:id', format.getRetrive);
router.put('/format/:id', validate(update.format), format.getRetrive);
router.delete('/format/:id', format.getRetrive. format.delete);

router.get('/section/:id/article', section.getRetrive, section.getCollection);