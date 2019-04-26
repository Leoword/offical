module.exports = async function (ctx) {
	const {sequelize, request, response} = ctx;
	const {type} = request.query;

	const File = sequelize.model('file');

	const fileList = await File.findAll({
		where: {
			type
		}
	});

	response.body = fileList.map(file => {
		const {hash, type, comment} = file;

		return {
			url: `/api/file/${hash}`,
			type, comment
		};
	});
};