const Sequelize = require('sequelize');
const ISO6391 = require('@ovl/iso-639-1');
const lang = new ISO6391();

module.exports = async function (ctx) {
	const {sequelize, request, response} = ctx;
	const {id} = ctx.params;
	const {language, keyword} = request.query;

	const Language = sequelize.model('language');
	const Commit = sequelize.model('commit');

	const query = {
		where: {
			article: id
		},
		attributes: ['hash', 'name', 'title', 'abstact', 'head']
	};

	if (language) {
		query.where.name = lang.getCode(language);
	}

	if (keyword) {
		query.where.title = {
			[Sequelize.Op.like]: `%${keyword}%`
		};
	}

	const languageList = await Language.findAll(query);

	const commitList = await Commit.findAll({
		where: {
			hash: {
				[Sequelize.Op.in]: languageList.map(({head}) => head)
			}
		},
		attributes: ['hash', 'content']
	});

	response.body = languageList.map(languageItem => {

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