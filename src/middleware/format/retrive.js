module.exports = async function (ctx, next) {
	const {sequelize, response, params} = ctx;

	const Format = sequelize.model('format');
	const {id} = params;

	const format = await Format.findByPk(id);

	if (!format) {
		ctx.throw(404, 'The format is not existed.');

		return;
	}

	ctx.data = format;

	await next();

	ctx.body = format;
};