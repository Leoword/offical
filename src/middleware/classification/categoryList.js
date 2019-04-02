module.exports = async function (ctx) {
	const {sequelize, response, request} = ctx;
	const {articleId} = request.params;

	const Category = sequelize.model('category');
	const ArticleOfCategory = sequelize.model('article_category');

	const list = await ArticleOfCategory.findAll({
		where: {
			article: articleId
		},
		include: [{
			model: Category
		}]
	});

	response.body = list;
}