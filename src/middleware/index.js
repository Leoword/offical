module.exports = {
	article: {
		create: require('./article/create'),
		getList: require('./article/list'),
		delete: require('./article/delete'),
		getRetrive: require('./article/retrive')
	},
	language: {
		create: require('./language/create'),
		getList: require('./language/list'),
		getRetrive: require('./language/retrive'),
		update: require('./language/update'),
		delete: require('./language/delete')
	},
	category: {
		create: require('./category/create'),
		getList: require('./category/list'),
		getRetrive: require('./category/retrive'),
		update: require('./category/update'),
		delete: require('./category/delete')
	},
	classification: {
		create: require('./classification/create'),
		getArticleList: require('./classification/articleList'),
		getCategoryList: require('./classification/categoryList'),
		delete: require('./classification/delete')
	},
	section: {
		create: require('./section/create'),
		getList: require('./section/list'),
		getRetrive: require('./section/retrive'),
		update: require('./section/update'),
		delete: require('./section/delete'),
		getCollection: null
	},
	format: {
		create: require('./format/create'),
		getList: require('./format/list'),
		getRetrive: require('./format/retrive'),
		update: require('./format/update'),
		delete: require('./format/delete')
	},
	file: {
		create: require('./file/create'),
		getList: require('./file/list'),
		getRetrive: require('./file/retrive'),
		delete: require('./file/delete')
	}
}