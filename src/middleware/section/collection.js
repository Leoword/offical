const getArticles = require('../../lib/getArticles');
const getFiles = require('../../lib/getFiles');
const EventEmitter = require('events');

module.exports = async function (ctx) {
	const {sequelize, params, response} = ctx;

	const {id} = params;
	const Section = sequelize.model('section');
	const Format = sequelize.model('format');
	const event = new EventEmitter();

	const {collection, format} = await Section.findByPk(id - 0);
	let result = [];
	const formatRetrive = await Format.findByPk(format);

	collection.forEach(async (collectionItem, index) => {
		const {type, args} = collectionItem;

		if (type === 'article') {
			const list = await getArticles(args ? args : {});

			result = result.concat(list);
		}

		if (type === 'file') {
			const list = await getFiles(args ? args : {});
			result = result.concat(list);
		}

		if (index === collection.length - 1) {
			event.emit('end');
		}
	});

	return new Promise(resolve => {
		event.on('end', function () {
			response.body = {
				collection: result,
				format: formatRetrive.name
			};
			resolve();
		})
	});
};