module.exports = async function () {
	const {sequelize, request, response} = ctx;
	const {id} = request.params.id;


	const Article = sequelize.model('article');
	const Language = sequelize.model('language');
	const Commit = sequelize.model('commit');

	const query = {
		model: Language,
		where: {},
		include: [{
			model: Commit,
			where: {}
		}]
	};

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

	const list = await Article.findAll({
		where: {
			hash: id
		},
		include: [query]
	});

	response.body = list;
}