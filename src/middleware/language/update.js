const ISO6391 = require('@ovl/iso-639-1');
const lang = new ISO6391();

module.exports = async function (ctx) {
	const {sequelize, request, response} = ctx;
	const {language, commit} = ctx.data;

	const {title, language: name, abstract, content} = request.body;
	const options = {};

	if (name) {

		const languageCode = lang.getCode(name);
	
		if (!languageCode) {
			ctx.throw(400, 'The language is not existed.');
		}

		options.name = languageCode;
	}

	if (title) {
		options.title = title;
	}

	if (abstract) {
		options.abstract = abstract;
	}

	let result;

	try {
		result = await sequelize.transaction(async t => {
			const newLanguage = await language.update(options, {transaction: t});
			let newCommit = commit;

			if (content) {
				newCommit = await commit.update({content});
			}

			return {
				hash: newLanguage.article, title: newLanguage.title, abstract: newLanguage.abstract,
				name: newLanguage.name, content: newCommit.content
			}
		});
	} catch (e) {
		ctx.throw(500, 'Internal Error.');
	}

	response.body = result;
}