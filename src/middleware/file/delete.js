module.exports = async function (ctx) {
	const {sequelize, data: file, response} = ctx;
	const Language = sequelize.model('language');
	let isUsing = false;

	const articleList = await Language.findAll({
		attributes: ['asset'],
	});

	articleList.forEach(article => {
		article.asset.forEach(fileDescribe => {
			if (fileDescribe.type === file.type && fileDescribe.hash) {
				isUsing = true;
			}
		});
	});

	if (isUsing) {
		ctx.throw(403, 'The file is used');
	}

	await file.destroy();

	response.status = 200;
};