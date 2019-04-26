module.exports = function (ctx) {
	const {Page, response} = ctx;

	const pages = Page.findAll();

	response.body = pages;
};