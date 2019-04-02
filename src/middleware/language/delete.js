module.exports = async function (ctx) {
	const {sequelize} = ctx;
	const {language, version} = ctx.data;

	try {
		await sequelize.transaction(async t => {
			language.destroy({
				transaction: t
			});
	
			version.destroy({
				transaction: t
			});
		});
	} catch (e) {
		ctx.throw(500, 'Internal Error');
	}

	ctx.status = 200;
};