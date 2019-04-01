const router = module.exports = new Router();

router.post('/section');
router.get('/section');
router.put('/section/:sectionId');
router.delete('/section/:sectionId');

router.post('/format');
router.get('/format');
router.put('/format/:formatId');
router.delete('/format/:formatId');