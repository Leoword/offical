const getArticles = require('../../lib/getArticles');
const getFiles = require('../../lib/getFiles');

module.exports = async function (ctx) {
	const {sequelize, params, response} = ctx;

	const {id} = params;
	const Section = sequelize.model('section');

	const {collection} = await Section.findByPk(id);
	const result = [];

	collection.forEach(collectionItem => {
		const {type, args} = collectionItem;

		if (type === 'article') {
			result.concat(getArticles(args));
		}

		if (type === 'file') {
			result.concat(getFiles(args));
		}
	});

	response.body = result;
};