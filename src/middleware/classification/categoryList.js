const Sequelize = require('sequelize');

module.exports = async function (ctx) {
	const {sequelize, response, params} = ctx;
	const {articleId} = params;

	const Category = sequelize.model('category');
	const ArticleOfCategory = sequelize.model('article_category');

	const list = await ArticleOfCategory.findAll({
		where: {
			article: articleId
		},
		attributes: ['category']
	});

	const categoryList = await Category.findAll({
		where: {
			hash: {
				[Sequelize.Op.in]: list.map(({category}) => category)
			}
		},
		attributes: ['hash', 'name', 'comment']
	});

	response.body = categoryList;
};