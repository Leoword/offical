module.exports = async function (ctx) {
	const {sequelize, response} = ctx;
	const category = ctx.data;

	const Category = sequelize.model('category');
	const ArticleOfCategory = sequelize.model('article_category');

	try {
		await sequelize.transaction(async t => {
			await ArticleOfCategory.destroy({
				where: {
					category: category.hash
				},
				transaction: t
			});

			await Category.update({
				parent: null
			}, {
				where: {
					parent: category.hash
				},
				transaction: t
			});

			await category.destroy({
				transaction: t
			});
		});
		
		ctx.status(200);
	} catch (e) {
		ctx.throw(500, 'Internal Error.')
	}

}