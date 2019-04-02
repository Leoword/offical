module.exports = async function (ctx, next) {
	const {sequelize, request, response} = ctx;

	const Section = sequelize.model('section');

	const {id} = request.params;

	const section = await Section.findByPK(id);

	if (!section) {
		ctx.throw(404, 'The section is not existed.');
	}

	ctx.data = section;

	await next();

	response.body = section;
}