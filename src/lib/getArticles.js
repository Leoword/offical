const sequelize = require('./sequelize');
const Sequelize = require('sequelize');

module.exports = async function ({catgory, thumbnail, exp}) {
	const ArticleOfCategory = sequelize.model('article_category');
	const Language = sequelize.model('language');
	const Commit = sequelize.model('commit');

	const Category = sequelize.model('category');

	const categoryList = await Category.findAll({
		where: {
			name: {
				[Sequelize.Op.like]: `%${catgory}%`
			}
		},
		attributes: ['hash']
	});

	const list = await ArticleOfCategory.findAll({
		where: {
			category: {
				[Sequelize.Op.in]: categoryList.map(({hash}) => hash)
			}
		},
		attributes: ['article']
	});

	const options = {
		where: {
			article: {
				[Sequelize.Op.in]: list.map(({article}) => article)
			}
		},
		attributes: ['hash', 'name', 'title', 'abstact', 'head', 'thumbnail']
	};

	if (exp) {
		const {limit, hash, title} = exp;

		options.where.hash = hash;
		options.where.title = {
			[Sequelize.Op.like]: `%${title}%`
		};
		options.limit = limit;
	}

	const languageList = await Language.findAll(options);

	const commitList = await Commit.findAll({
		where: {
			hash: {
				[Sequelize.Op.in]: languageList.map((item) => item.head)
			}
		},
		attributes: ['hash', 'content']
	});

	return languageList.map(languageItem => {
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