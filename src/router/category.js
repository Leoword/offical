const Router = require('koa-router');
const Sequelize = require('sequelize');

module.exports = new Router({
	prefix: '/category'
}).use((ctx, next) => {
	ctx.Category = ctx.db.Category;
	ctx.Classification = ctx.db.Classification;

	return next();
}).param('id', async (id, ctx, next) => {
	const category = await ctx.Category.findByPk(Number(id));
	
	if (!category) {
		ctx.throw(404, 'The category is not existed.');

		return;
	}

	ctx.category = category;

	return next();
}).post('/', async function (ctx) {
	const { Category, request } = ctx;

	const { name, comment, parent } = request.body;

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
}).get('/', async function (ctx) {
	const {db} = ctx;

	ctx.body = await db.Category.findAll();
}).get('/:id', async function (ctx) {

	if (!ctx.category) {
		ctx.throw(404, 'The category is not existed.');

		return;
	}

	ctx.body = ctx.category;
}).put('/:id', async function (ctx) {
	const { Category, request } = ctx;

	const { name, comment, parent } = request.body;

	const category = ctx.category;

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

		if (parentCategory.id === category.id) {
			ctx.throw(400, 'The parent category should not be self.');

			return;
		}
	}

	ctx.body = await category.update({
		name, comment, parent
	});
}).delete('/:id', async function (ctx) {
	const { Category, Classification } = ctx;

	if (!ctx.category) {
		ctx.throw(404, 'The category is not existed.');

		return;
	}

	await ctx.category.destroy();

	await Category.update({parent: null}, {
		where: {
			parent: ctx.category.id
		}
	});

	await Classification.update({categoryId: null}, {
		where: {
			categoryId: ctx.category.id
		}
	});

	ctx.status = 200;
});