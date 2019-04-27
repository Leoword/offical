module.exports = async function (ctx) {
	const {sequelize, request, response} = ctx;

	const Format = sequelize.model('format');
	const Section = sequelize.model('section');

	const {name, formatId, collection, comment} = request.body;

	const format = await Format.findByPk(formatId);

	if (!format) {
		ctx.throw(404, 'The format is not existed.');

		return;
	}

	const list = await Section.findAll({
		where: {
			name
		}
	});

	if (list.length !== 0) {
		ctx.throw(400, 'The name of section has existed.');

		return;
	}

	const section = await Section.create({
		format: formatId, collection, comment, name
	});

	response.body = section;
};