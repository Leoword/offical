const Router = require('koa-router');
const Sequelize = require('sequelize');

const router = module.exports = new Router();

router.post('/format', async function (ctx) {
	const {db, request} = ctx;
	const {name, comment} = request.body;

	const list = await db.Format.findAll({
		where: {
			name
		}
	});

	if (list.length !== 0) {
		ctx.throw(400, 'The name of format has existed.');

		return;
	}

	const format = await db.Format.create({
		name, comment
	});

	ctx.body = format;
});

router.get('/format', async function (ctx) {
	const {db} = ctx;

	ctx.body = await db.Format.findAll();
});

router.get('/format/:id', async function (ctx) {
	const {db, params} = ctx;

	const format = await db.Format.findByPk(params.id);

	if (!format) {
		ctx.throw(404, 'The format is not existed.');

		return;
	}

	ctx.body = format;
});

router.put('/format/:id', async function (ctx) {
	const {db, params, request} = ctx;
	const {name, comment} = request.body;

	const format = await db.Format.findByPk(params.id);

	if (!format) {
		ctx.throw(404, 'The format is not existed.');

		return;
	}

	if (name) {
		const list = await db.Format.findAll({
			where: {
				name,
				id: {
					[Sequelize.Op.not]: format.id
				}
			}
		});
	
		if (list.length !== 0) {
			ctx.throw(400, 'The name of format has existed.');
	
			return;
		}
	}

	ctx.body = await format.update({
		name, comment
	});
});

router.delete('/format/:id', async function (ctx) {
	const {db, params} = ctx;
	const {Format, Section} = db;

	const format = await Format.findByPk(params.id);

	if (!format) {
		ctx.throw(404, 'The format is not existed.');

		return;
	}

	await format.destroy();

	await Section.update({formatId: null}, {
		where: {
			formatId: format.id
		}
	});

	ctx.status = 200;
});