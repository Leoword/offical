module.exports = async function (ctx) {
	const {sequelize, response, request} = ctx;

	const Format = sequelize.model('format');
	const {name, comment} = request.body;

	const list = await Format.findAll({
		where: {
			name
		}
	});

	if (list.length !== 0) {
		ctx.throw(400, 'The name of format has existed.');

		return;
	}

	try {
		const format = await Format.create({
			name, comment
		});

		response.body = format;
	} catch (e) {
		ctx.throw(500, 'Internal Error');
	}
};