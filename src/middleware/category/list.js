module.exports = async function (ctx) {
	const {sequelize, response} = ctx;

	const Category = sequelize.model('category');

	const list = await Category.findAll();

	response.body = list;
}