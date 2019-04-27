const Sequelize = require('sequelize');

module.exports = async function (ctx) {
	const {sequelize, response, request} = ctx;
	const format = ctx.data;
	const {name, comment} = request.body;

	const Format = sequelize.model('format');

	const list = await Format.findAll({
		where: {
			name,
			id: {
				[Sequelize.Op.not]: format.id
			}
		}
	});

	if (list.length !== 0) {
		ctx.throw(400, 'The name of format has existed.');

		return;
	}

	try {
		const newFormat = await format.update({
			name, comment
		});

		ctx.body = newFormat;
	} catch (e) {
		ctx.throw(500, 'Internal Error.');
	}
};