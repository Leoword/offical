const ISO6391 = require('@ovl/iso-639-1');
const getFiles = require('../../lib/getFilesOfArticle');
const lang = new ISO6391();

module.exports = async function (ctx) {
	const {sequelize, request, response} = ctx;

	const Article = sequelize.model('article');
	const Language = sequelize.model('language');
	const Commit = sequelize.model('commit');

	const {title, language: name, abstract, content} = request.body;
	const languageCode = lang.getCode(name);

	if (!languageCode) {
		ctx.throw(400, 'The language is not existed.');

		return;
	}

	try {
		const result = await sequelize.transaction(async t => {
			const article = await Article.create({}, {transaction: t});
			const {asset, thumbnail} = getFiles(content);

			let language = await Language.create({
				name: languageCode, article: article.hash,
				title, abstract, asset, thumbnail
			}, {transaction: t});

			const commit = await Commit.create({
				content, language: language.hash
			}, {transaction: t});
	
			language = await language.update({
				head: commit.hash
			}, {transaction: t});
	
			return Object.assign({}, {
				hash: article.hash
			}, {
				language: {
					hash: language.hash,
					name, title, abstract, content
				}
			});
		});

		response.body = result;
	} catch (e) {
		ctx.throw(500, 'Internal Error.');
	}
};