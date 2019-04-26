const sequelize = require('./sequelize');

module.exports = async function ({type, exp}) {
	const File = sequelize.model('file');
	const options = {
		where: {type},
		order: [['created_at', 'desc']]
	};

	if (exp) {
		const {limit, hash} = exp;

		options.where.hash = hash;
		options.limit = limit;
	}

	const list = await File.findAll(options);

	const result = list.map(file => {
		return {type: file.type, URL: `/api/file/${file.hash}`};
	});

	return result;
};