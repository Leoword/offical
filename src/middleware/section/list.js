module.exports = async function (ctx) {
	const {sequelize, request, response} = ctx;

	const Section = sequelize.model('section');

	const {formatId} = request.query;

	const query = {};

	if (formatId) {
		query.formatId = formatId;
	}

	const list = await Section.findAll({
		where: query
	});

	response.body = list;
}