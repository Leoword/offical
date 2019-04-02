module.exports = async function (ctx, next) {
	const {sequelize, response, request} = ctx;

	const Format = sequelize.model('format');
	const {id} = request.params;

	const format = await Format.findByPK(id);

	if (!format) {
		ctx.throw(404, 'The format is not existed.');
	}

	ctx.data = format;

	await next();

	response.body = format;
}