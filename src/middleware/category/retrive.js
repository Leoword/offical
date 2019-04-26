module.exports = async function (ctx, next) {
	const {sequelize, params, response} = ctx;

	const Category = sequelize.model('category');

	const {id} = params;

	const category = await Category.findByPk(id);

	if (!category) {
		ctx.throw(404, 'The category is not existed.');

		return;
	}

	ctx.data = category;

	next();

	response.body = category;
};