module.exports = async function (ctx) {
	const {sequelize, response} = ctx;

	const Format = sequelize.model('format');

	const list = await Format.findAll();

	response.body = list;
}