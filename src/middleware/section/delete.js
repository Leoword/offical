module.exports = async function (ctx) {
	const {sequelize, response} = ctx;
	
	const section = ctx.data;

	try {
		await section.destroy();

		response.status = 200;
	} catch (e) {
		ctx.throw(500, 'Internal Error.');
	}
}