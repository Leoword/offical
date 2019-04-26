module.exports = function (ctx, next) {
	const {Page, params, response} = ctx;

	const pageId = params.id;

	const page = Page.findByPk(pageId);

	if (!page) {
		ctx.throw(404, 'The page is not existed.');

		return;
	}

	next();

	response.body = {name: page.name, path: page.path, sectionList: page.sectionList};
};