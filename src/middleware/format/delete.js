module.exports = async function (ctx) {
	const format = ctx.data;
	const {sequelize, response} = ctx;

	const Section = sequelize.model('section');

	try {
		await sequelize.transaction(async t => {
			await Section.update({}, {
				where: {
					format
				},
				transaction: t
			});
	
			await format.destroy({
				transaction: t
			});
		});

		ctx.status = 200;
	} catch (e) {
		ctx.throw(500, 'Internal Error.');
	}
}