const markdownIt = require('markdown-it');

module.exports = function (content) {
	const tokenList = markdownIt().parse(content);
	const type = ['image'];

	let thumbnail;
	const assets = tokenList.map(token => {

		if (token.children !== null) {

			return token.children.map(element => {

				if (type.indexOf(element.type) !== -1) {
					const url = element.attrs[0][1];

					return url.substring(url.lastIndexOf('/'));
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