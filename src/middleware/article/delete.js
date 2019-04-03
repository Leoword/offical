module.exports = async function (ctx) {
	const {sequelize, request, response} = ctx;
	const {id} = request.params.id;

	const Article = sequelize.model('article');
	const Language = sequelize.model('language');
	const Commit = sequelize.model('commit');
	const ArticleOfCategory = sequelize.model('article_category');

	try {
		await sequelize.transaction(async t => {
			await Article.destroy({
				where: {
					hash: id
				},
				transaction: t
			});

			let list = await Language.destroy({
				where: {
					article: id
				},
				attributes: ['hash'],
				transaction: t
			});

			await Commit.destroy({
				where: {
					language: {
						[Sequelize.Op.in]: list
					}
				},
				transaction: t
			});
		});

		await ArticleOfCategory.destroy({
			where: {
				article: article.hash
			},
			transaction: t
		});

		response.status = 200;
	} catch (e) {
		ctx.throw(500, 'Internal Error.');
	}
}