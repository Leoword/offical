const Sequelize = require('sequelize');

module.exports = async function (ctx) {
	const {sequelize, request, response} = ctx;
	
	const section = ctx.data;

	const Format = sequelize.model('format');
	const Section = sequelize.model('section');

	const {name, formatId, collection, comment} = request.body;

	if (formatId) {
		const format = await Format.findByPk(formatId);
	
		if (!format) {
			ctx.throw(404, 'The section is not existed.');
	
			return;
		}
	}

	const list = await Section.findAll({
		where: {
			name,
			id: {
				[Sequelize.Op.not]: section.id
			}
		}
	});

	if (list.length !== 0) {
		ctx.throw(400, 'The name of section has existed.');

		return;
	}

	try {
		const newSection = await section.update({
			format: formatId, collection, comment, name
		});

		response.body = newSection;
	} catch (e) {
		ctx.throw(500, 'Internal Error.');
	}
};