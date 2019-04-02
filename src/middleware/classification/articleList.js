module.exports = async function (ctx) {
	const {sequelize, response, request} = ctx;
	const {categoryId} = request.params;

	const Article = sequelize.model('article');
	const ArticleOfCategory = sequelize.model('article_category');

	const list = await ArticleOfCategory.findAll({
		where: {
			category: categoryId
		},
		include: [{
			model: Article
		}]
	});

	//可能缺数据！！

	response.body = list;
}