const router = module.exports = new Router();
const fileSchema = require('../validator');

const {file} = require('../middleware');

router.post('/file', validate(fileSchema), file.create);
router.get('/file', validate(fileSchema), file.getList);
router.get('/file/:id', file.getRetrive);
router.delete('/file/:id', file.getRetrive, file.delete);