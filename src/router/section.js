const Router = require('koa-router');
const Sequelize = require('sequelize');

const router = module.exports = new Router();

router.post('/section', async function (ctx) {
	const {db, request} = ctx;
	const {Format, Section} = db;

	const {name, formatId, collection, comment} = request.body;

	const format = await Format.findByPk(formatId);

	if (!format) {
		ctx.throw(404, 'The format is not existed.');

		return;
	}

	const list = await Section.findAll({
		where: {
			name
		}
	});

	if (list.length !== 0) {
		ctx.throw(400, 'The name of section has existed.');

		return;
	}

	if (typeof collection !== 'object' || !collection.type || typeof collection.args !== 'object') {
		ctx.throw(400, 'The collection should be an object and include type, args.');
	}

	const section = await Section.create({
		formatId, collection, comment, name
	});

	ctx.body = section;
});

router.get('/section', async function (ctx) {
	const {db} = ctx;

	ctx.body = await db.Section.findAll();
});

router.get('/section/:id', async function (ctx) {
	const {db, params} = ctx;

	const section = await db.Section.findByPk(params.id);

	if (!section) {
		ctx.throw(404, 'The format is not existed.');

		return;
	}

	ctx.body = section;
});

router.put('/section/:id', async function (ctx) {
	const {db, request, params} = ctx;
	const {Format, Section} = db;

	const section = await db.Section.findByPk(params.id);

	if (!section) {
		ctx.throw(404, 'The format is not existed.');

		return;
	}

	const {name, formatId, collection, comment} = request.body;

	if (formatId) {

		const format = await Format.findByPk(formatId);
	
		if (!format) {
			ctx.throw(404, 'The format is not existed.');
	
			return;
		}
	}

	if (name) {
		const list = await Section.findAll({
			where: {
				name,
				id: {
					[Sequelize.Op.not]: section.id
				}
			}
		});
	
		if (list.length !== 0) {
			ctx.throw(400, 'The name of section has existed.');
	
			return;
		}
	}

	if (collection && (typeof collection !== 'object' || !collection.type || typeof collection.args !== 'object')) {
		ctx.throw(400, 'The collection should be an object and include type, args.');
	}

	ctx.body = await section.update({
		name, formatId, collection, comment
	});
});

router.delete('/section/:id', async function (ctx) {
	const {db, params} = ctx;
	const {Section, Page} = db;

	const section = await Section.findByPk(params.id);

	if (!section) {
		ctx.throw(404, 'The format is not existed.');

		return;
	}

	await section.destroy();

	const pages = await Page.findAll();

	for (let page of pages) {
		const index = page.sectionList.indexOf(section.id);

		if (index !== -1) {
			page.sectionList.splice(index, 1);

			await page.update({
				sectionList: page.sectionList
			});
		}
	}

	ctx.status = 200;
});