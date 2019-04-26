const Sequelize = require('sequelize');

module.exports = async function (ctx) {
	const {sequelize, response, params} = ctx;
	const {categoryId} = params;

	const Language = sequelize.model('language');
	const Commit = sequelize.model('commit');
	const ArticleOfCategory = sequelize.model('article_category');

	const list = await ArticleOfCategory.findAll({
		where: {
			category: categoryId
		},
		attributes: ['article']
	});

	const languageList = await Language.findAll({
		where: {
			article: {
				[Sequelize.Op.in]: list.map(({article}) => article)
			}
		},
		attributes: ['hash', 'name', 'title', 'abstact', 'head', 'asset']
	});

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