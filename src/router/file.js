const Router = require('koa-router');
const fs = require('fs');
const path = require('path');

const config = require(path.resolve(process.cwd(), 'config.json'));

const router = module.exports = new Router();

router.post('/file', async function (ctx) {
	const {db, request} = ctx;
	
	const {type} = request.body;
	const file = request.files.file;

	let data = Buffer.from([]);
	const readerStream = fs.createReadStream(file.path);

	readerStream.on('data', function(chunk) {
		data = Buffer.concat([data, chunk], data.length + chunk.length);
	});
 
	return new Promise((resolve) => {
		readerStream.on('end',async function () {
			const newFile = await db.File.create({type, file: data});
	
			ctx.body = {
				url: `${config.server.protocol}://${config.server.hostname}:${config.server.port}/api/file/${newFile.hash}`
			};

			resolve();
		});
	});
});

router.get('/file', async function (ctx) {
	const {db} = ctx;

	const fileList = await db.File.findAll();

	ctx.body = fileList.map(file => {
		const {hash, type, comment} = file;

		return {
			url: `${config.server.protol}://${config.server.hostname}:${config.server.port}/api/file/${hash}`,
			type, comment, id: hash
		};
	});
});

router.get('/file/:hash', async function (ctx) {
	const {db, params} = ctx;

	const file = await db.File.findByPk(params.hash);

	if (!file) {
		ctx.throw(404, 'The file is not existed.');

		return;
	}

	ctx.set('Content-Type', file.type);
	ctx.body = Buffer.from(file.file);
});

router.delete('/file/:hash', async function (ctx) {
	const {db, params} = ctx;
	const {File, Commit} = db;

	const file = await File.findByPk(params.hash);

	if (!file) {
		ctx.throw(404, 'The file is not existed.');

		return;
	}

	const commits = await Commit.findAll({
		attributes: ['assets']
	});

	const isUsing = commits.filter(commit => commit.assets.indexOf(file.hash) !== -1);

	if (isUsing) {
		ctx.throw(403, 'The file is used');
	}

	await file.destroy();

	ctx.status = 200;
});