module.exports = function (ctx) {
	const {Page, request, response} = ctx;

	const {name, path, sectionList, comment} = request.body;
	const pageId = ctx.params.id;

	let page;

	try {
		page = Page.update(pageId, {name, path, sectionList, comment});
	} catch (e) {
		ctx.throw(500, 'Internal Error');
	}

	response.body = page;
};