const sequelize = require('./sequelize');

module.exports = async function ({type, exp}) {
	const File = sequelize.model('file');
	const options = {};

	if (exp) {
		const {limit, hash} = exp;

		options.where.hash = hash;
		options.limit = limit;
	}

	const list = await File.findAll(options);

	const result = list.map(file => {
		return {type: file.type, URL: `${config.server.protol}://${config.server.hostname}:${config.server.port}/api/file/${file.hash}`};
	}).filter(item => item.type === type || !type);

	return result;
};