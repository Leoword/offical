const ISO6391 = require('@ovl/iso-639-1');
const lang = new ISO6391();

const Sequelize = require('sequelize');

module.exports = async function (ctx) {
	const {sequelize, request, response} = ctx;

	const {language, keyword} = request.query;
	const query = {
		where: {},
		attributes: ['hash', 'name', 'title', 'abstract', 'head']
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
	}

	const list = await Language.findAll(query);

	const commitList = await Commit.findAll({
		where: {
			hash: {
				[Sequelize.Op.in]: list.map(({head}) => head)
			},
			content: {
				[Sequelize.Op.like]: `%${keyword}%`
			}
		},
		attributes: ['hash', 'content']
	});

	response.body = list.map(languageItem => {

		commitList.forEach(commit => {
			if (commit.hash === languageItem.head) {
				Object.assign({}, languageItem, {
					content: commit.content
				});
			}
		});

		return languageItem;
	});
};