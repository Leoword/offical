module.exports = async function (ctx, next) {
	const {sequelize, request} = ctx;
	const Article = sequelize.model('article');

	const {articleId} = request.params;

	const article = await Article.findByPK(articleId);

	if (!article) {
		ctx.throw(404, 'The article is not existed.');
	}

	await next();
}