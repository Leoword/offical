module.exports = async function (ctx) {
	const {sequelize, response, params} = ctx;
	const {articleId, categoryId} = params;

	const ArticleOfCategory = sequelize.model('article_category');

	try {
		const articleOfCategory = await ArticleOfCategory.findOrCreate({
			where: {
				article: articleId, category: categoryId
			}
		});

		response.body = articleOfCategory;
	} catch (e) {
		ctx.throw(500, 'Internal Error.');
	}
};