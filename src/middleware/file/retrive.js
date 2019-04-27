module.exports = async function (ctx, next) {
	const {sequelize, response} = ctx;
	const {id} = ctx.params;

	const File = sequelize.model('file');

	const file = await File.findByPk(id);

	if (!file) {
		ctx.throw(404, 'The file is not existed.');

		return;
	}

	ctx.data = file;

	await next();

	response.set('Content-Type', file.type);
	ctx.body = Buffer.from(file.file);
};