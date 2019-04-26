module.exports = async function (ctx, next) {
	const {sequelize, params} = ctx;
	const Article = sequelize.model('article');

	const {articleId} = params;

	const article = await Article.findByPk(articleId);

	if (!article) {
		ctx.throw(404, 'The article is not existed.');

		return;
	}

	await next();
};