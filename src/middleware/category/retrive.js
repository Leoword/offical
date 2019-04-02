module.exports = async function (ctx, next) {
	const {sequelize, request, response} = ctx;

	const Category = sequelize.model('category');

	const {id} = request.params;

	const category = await Category.findByPK(id);

	if (!category) {
		ctx.throw(404, 'The category is not existed.');
	}

	ctx.data = category;

	next();

	response.body = category;
}