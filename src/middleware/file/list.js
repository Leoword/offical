module.exports = async function (ctx) {
	const {sequelize, response} = ctx;

	const File = sequelize.model('file');

	const fileList = await File.findAll();

	response.body = fileList.map(file => {
		const {hash, type, comment} = file;

		return {
			url: `/api/file/${hash}`,
			type, comment, id: hash
		};
	});
};