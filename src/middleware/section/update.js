module.exports = async function (ctx) {
	const {sequelize, request, response} = ctx;
	
	const section = ctx.data;

	const Format = sequelize.model('format');

	const {formatId, collection, comment} = request.body;

	const format = await Format.findByPK(formatId);

	if (!format) {
		ctx.throw(404, 'The format is not existed.');
	}

	try {
		const newSection = await section.update({
			formatId, collection, comment
		});

		response.body = newSection;
	} catch (e) {
		ctx.throw(500, 'Internal Error.');
	}
}