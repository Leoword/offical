const markdownIt = require('markdown-it');

module.exports = function (content) {
	const tokenList = markdownIt().parse(content);
	const type = ['image'];

	let thumbnail;
	const assets = [];

	tokenList.forEach(token => {

		if (token.children !== null) {

			token.children.forEach(element => {

				if (type.indexOf(element.type) !== -1) {
					const url = element.attrs[0][1];

					assets.push(url.substring(url.lastIndexOf('/')));
				}

				if (!thumbnail && element.type === 'image') {
					const url = element.attrs[0][1];

					thumbnail = url.substring(url.lastIndexOf('/'));
				}
			});
		}
	});

	return {
		asset: assets, thumbnail
	};
};