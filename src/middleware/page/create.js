module.exports = async function (ctx) {
	const {Page, request, response} = ctx;

	const {name, path, sectionList, comment} = request.body;

	let page;

	try {
		page = Page.create({name, path, sectionList, comment});
	} catch (e) {
		ctx.throw(500, 'Internal Error');
	}

	response.body = page;
};