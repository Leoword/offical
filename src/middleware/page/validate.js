module.exports = async function (ctx, next) {
	const {sequelize, request} = ctx;

	const {sectionList} = request.body;
	const Section = sequelize.model('section');

	const filteredList = await sectionList.filter(async sectionId => {
		const section = await Section.findByPk(sectionId);

		return section;
	});

	request.body.sectionList = filteredList;
	
	next();
};