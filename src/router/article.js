const router = module.exports = new Router();

const {create, update} = require('../validator');
const {article, language, category, classification} = require('../middleware');

router.post('/article', validate(create.article), article.create);
router.get('/article', validate(create.article), article.getList);
router.delete('/article/:id', article.getRetrive);

router.post('/article/:id/language', validate(create.article), article.getRetrive, language.create);
router.get('/article/:id/language',  validate(create.article), article.getRetrive, language.getList);
router.get('/article/:articleId/language/:languageId', article.getRetrive, language.getRetrive);
router.put('/article/:articleId/language/:languageId',  validate(update.article), article.getRetrive, language.update);
router.delete('/article/:articleId/language/:languageId', article.getRetrive, language.getRetrive, language.delete);

router.post('/category', validate(create.category), category.create);
router.get('/category', category.getList);
router.get('/category/:id', category.getRetrive);
router.put('/category/:id', validate(update.category), category.update);
router.delete('/category/:id', category.getRetrive, category.delete);

router.post('/article/:articleId/category/:categoryId', article.getRetrive, category.getRetrive, classification.create);
router.delete('/article/:articleId/category/:categoryId', article.getRetrive, category.getRetrive, classification.delete);
router.get('/article/:articleId/category', article.getRetrive, classification.getCategoryList);
router.get('/category/:categoryId/article', category.getRetrive, classification.getArticleList);