const router = module.exports = new Router();

router.post('/article');
router.get('/article'); //参数
router.get('/article/:articleHash');
router.put('/article');
router.delete('/article');

router.post('/category');
router.get('/category');
router.get('/category/:categoryHash');
router.put('/category');
router.delete('/category');

router.post('/article/:articleHash/category/:categoryHash');
router.delete('/article/:articleHash/category/:categoryHash');
router.get('/article/:articleHash/category');
router.get('/category/:categoryHash/article')

router.post('/collection');
router.get('/collection');
router.put('/collection');
router.delete('/collection');