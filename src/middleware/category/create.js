module.exports = async function (ctx) {
	const {sequelize, request, response} = ctx;

	const Category = sequelize.model('category');

	const {name, comment, parent} = request;

	const list = await Category.findAll({
		where: {
			name
		}
	});

	if (list.length !== 0) {
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

	try {
		const category = await Category.create({
			name, comment, parent
		});

		response.body = category;
	} catch (e) {
		ctx.throw(500, 'Internal Error.');
	}
};