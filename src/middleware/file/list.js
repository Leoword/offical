module.exports = async function (ctx) {
	const {sequelize, response} = ctx;

	const File = sequelize.model('file');

	const fileList = await File.findAll();

	response.body = fileList.map(file => {
		const {hash, type, comment} = file;

		return {
			url: `${config.server.protol}://${config.server.hostname}:${config.server.port}/api/file/${hash}`,
			type, comment, id: hash
		};
	});
};