module.exports = async function (ctx, next) {
	const {sequelize, request, response} = ctx;

	const Article = sequelize.model('article');
	const Language = sequelize.model('language');
	const Commit = sequelize.model('commit');

	const {articleId, languageId} = request.params;

	const article = await Article.findByPK(articleId);

	if (!article) {
		ctx.throw(404, 'The article is not existed.');
	}

	const language = await Language.findByPK(languageId);

	if (!language) {
		ctx.throw(404, 'The language of article is not existed.');
	}

	const commit = await Commit.findByPK(language.head);

	ctx.data = {
		language, commit
	};

	await next();

	response.body = {
		hash: article.hash, title: language.title, language: language.name,
		abstract: language.abstract, content: commit.content
	}
}