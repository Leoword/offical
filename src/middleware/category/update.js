const Sequelize = require('sequelize');

module.exports = async function (ctx) {
	const {sequelize, response, request} = ctx;
	const category = ctx.data;

	const Category = sequelize.model('category');

	const {name, comment, parent} = request;

	const list = await Category.findAll({
		where: {
			name,
			hash: {
				[Sequelize.Op.not]: category.hash
			}
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
		const newCategory = await category.update({
			name, comment, parent
		});

		response.body = newCategory;
	} catch (e) {
		ctx.throw(500, 'Internal Error.');
	}

};