module.exports = async function (ctx) {
	const {sequelize, request, response} = ctx;

	const Format = sequelize.model('format');
	const Section = sequelize.model('section');

	const {formatId, collection, comment} = request.body;

	const format = await Format.findByPK(formatId);

	if (!format) {
		ctx.throw(404, 'The format is not existed.');
	}

	const section = await Section.create({
		formatId, collection, comment
	});

	response.body = section;
}