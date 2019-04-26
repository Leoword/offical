module.exports = function (ctx) {
	const {Page, params} = ctx;

	const pageId = params.id;

	try {
		Page.delete(pageId);
	} catch (e) {
		ctx.throw(500, e.message);
	}

	ctx.status = 200;
};