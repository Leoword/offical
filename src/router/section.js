const router = module.exports = new Router();

const {section, format} = require('../validator');

router.post('/section', validate(section));
router.get('/section');
router.put('/section/:sectionId');
router.delete('/section/:sectionId');

router.post('/format', validate(format));
router.get('/format');
router.put('/format/:formatId');
router.delete('/format/:formatId');

router.get('/section/:sectionId/article');