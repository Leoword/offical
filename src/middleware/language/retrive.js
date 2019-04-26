module.exports = async function (ctx, next) {
	const {sequelize, params, response} = ctx;

	const Language = sequelize.model('language');
	const Commit = sequelize.model('commit');

	const {id} = params;

	const language = await Language.findByPk(id);

	if (!language) {
		ctx.throw(404, 'The language of article is not existed.');

		return;
	}

	const commit = await Commit.findByPk(language.head);

	ctx.data = {
		language, commit
	};

	await next();

	response.body = {
		article: language.article, hash: language.hash, title: language.title, language: language.name,
		abstract: language.abstract, content: commit.content
	};
};