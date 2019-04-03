const ISO6391 = require('@ovl/iso-639-1');
const lang = new ISO6391();

const Sequelize = require('sequelize');

module.exports = async function () {
	const {sequelize, request, response} = ctx;

	const {language, keyword} = request.query;
	const query = {
		where: {},
		include = [{
			model: Commit,
			where: {}
		}]
	};

	const Language = sequelize.model('language');
	const Commit = sequelize.model('commit');

	if (language) {
		query.where.name = lang.getCode(language);
	}

	if (keyword) {
		query.where.title = {
			[Sequelize.Op.like]: `%${keyword}%`
		};

		query.include[0].where.content = {
			[Sequelize.Op.like]: `%${keyword}%`
		};
	}

	const list = await Language.findAll(query);

	response.body = list;
}