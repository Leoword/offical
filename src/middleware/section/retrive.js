module.exports = async function (ctx, next) {
	const {sequelize, params, response} = ctx;

	const Section = sequelize.model('section');

	const {id} = params;

	const section = await Section.findByPk(id);

	if (!section) {
		ctx.throw(404, 'The section is not existed.');

		return;
	}

	ctx.data = section;

	await next();

	response.body = section;
};