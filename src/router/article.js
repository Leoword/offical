const router = module.exports = new Router();

const {article, category} = require('../validator');

router.post('/article', validate(article));
router.get('/article');
router.get('/article/:articleHash');
router.put('/article');
router.delete('/article');

router.post('/category', validate(category));
router.get('/category');
router.get('/category/:categoryHash');
router.put('/category');
router.delete('/category');

router.post('/article/:articleHash/category/:categoryHash');
router.delete('/article/:articleHash/category/:categoryHash');
router.get('/article/:articleHash/category');
router.get('/category/:categoryHash/article');