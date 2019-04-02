module.exports = async function (ctx) {
	const {sequelize, response, request} = ctx;
	const {articleId, categoryId} = request.params;

	const ArticleOfCategory = sequelize.model('article_category');

	try {
		await ArticleOfCategory.destroy({
			where: {
				article: articleId, category: categoryId
			}
		});

		response.status(200);
	} catch (e) {
		ctx.throw(500, 'Internal Error.');
	}
}