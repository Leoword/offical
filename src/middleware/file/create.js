module.exports = async function (ctx) {
	const {sequelize, request, response} = ctx;
	const {type, file: fileBlob, comment} = request.body;

	const File = sequelize.model('file');

	const file = await File.create({type, file: fileBlob, comment});

	response.body = {
		url: `/api/file/${file.hash}`
	};
};