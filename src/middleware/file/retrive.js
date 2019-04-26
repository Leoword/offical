module.exports = async function (ctx, next) {
	const {sequelize, request, response} = ctx;
	const {id} = request.query;

	const File = sequelize.model('file');

	const file = await File.findAll({
		where: {
			hash: id
		}
	});

	if (!file) {
		ctx.throw(404, 'The file is not existed.');

		return;
	}

	ctx.data = file;

	await next();

	response.set('Content-Type', file.type);
	response.data = file.file;
};