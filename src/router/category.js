const Router = require('koa-router');
const Sequelize = require('sequelize');

const router = module.exports = new Router();

router.post('/category', async function (ctx) {
	const {db, request} = ctx;
	const Category = db.Category;

	const {name, comment, parent} = request.body;

	const categoryList = await Category.findAll({
		where: {
			name
		}
	});

	if (categoryList.length !== 0) {
		ctx.throw(400, 'The name of category has existed.');

		return;
	}

	if (parent) {
		const parentCategory = await Category.findByPk(parent);

		if (!parentCategory) {
			ctx.throw(404, 'The parent category is not existed.');

			return;
		}
	}

	const category = await Category.create({
		name, comment, parent
	});

	ctx.body = category;
});

router.get('/category', async function (ctx) {
	const {db} = ctx;

	ctx.body = await db.Category.findAll();
});

router.get('/category/:id', async function (ctx) {
	const {db, params} = ctx;
	const Category = db.Category;

	const category = await Category.findByPk(params.id);

	if (!category) {
		ctx.throw(404, 'The category is not existed.');

		return;
	}

	ctx.body = category;
});

router.put('/category/:id', async function (ctx) {
	const {db, request, params} = ctx;
	const Category = db.Category;

	const {name, comment, parent} = request.body;

	const category = await Category.findByPk(params.id);

	if (!category) {
		ctx.throw(404, 'The category is not existed.');

		return;
	}

	if (name) {
		const categoryList = await Category.findAll({
			where: {
				name,
				id: {
					[Sequelize.Op.not]: category.id
				}
			}
		});
	
		if (categoryList.length !== 0) {
			ctx.throw(400, 'The name of category has existed.');
	
			return;
		}
	}

	if (parent) {
		const parentCategory = await Category.findByPk(parent);

		if (!parentCategory) {
			ctx.throw(404, 'The parent category is not existed.');

			return;
		}
	}

	ctx.body = await category.update({
		name, comment, parent
	});
});

router.delete('/category/:id', async function (ctx) {
	const {db, params} = ctx;
	const {Category, Classification} = db;

	const category = await Category.findByPk(params.id);

	if (!category) {
		ctx.throw(404, 'The category is not existed.');

		return;
	}

	await category.destroy();

	await Classification.update({categoryId: null}, {
		where: {
			categoryId: category.id
		}
	});

	ctx.status = 200;
});