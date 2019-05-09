const Router = require('koa-router');
const fs = require('fs');
const path = require('path');

const config = require(path.resolve(process.cwd(), 'config.json'));

module.exports = new Router({
	prefix: '/file'
}).use((ctx, next) => {
	ctx.File = ctx.db.File;

	return next();
}).param('hash', async (hash, ctx, next) => {
	const file = await ctx.File.findByPk(hash);

	if (!file) {
		ctx.throw(404, 'The file is not existed.');

		return;
	}

	ctx.file = file;

	return next();
}).post('/', async function (ctx) {
	const { request } = ctx;
	
	const file = request.files.file;

	let data = Buffer.from([]);
	const readerStream = fs.createReadStream(file.path);

	readerStream.on('data', function(chunk) {
		data = Buffer.concat([data, chunk], data.length + chunk.length);
	});
 
	return new Promise((resolve) => {
		readerStream.on('end',async function () {
			const newFile = await ctx.File.create({type: file.type, file: data});
	
			ctx.body = {
				url: `${config.server.protocol}://${config.server.hostname}:${config.server.port}/api/file/${newFile.hash}`
			};

			resolve();
		});
	});
}).get('/', async function (ctx) {
	const fileList = await ctx.File.findAll();

	ctx.body = fileList.map(file => {
		const {hash, type, comment} = file;

		return {
			url: `${config.server.protol}://${config.server.hostname}:${config.server.port}/api/file/${hash}`,
			type, comment, id: hash
		};
	});
}).get('/:hash', async function (ctx) {
	if (!ctx.file) {
		ctx.throw(404, 'The file is not existed.');

		return;
	}

	ctx.set('Content-Type', ctx.file.type);
	ctx.body = Buffer.from(ctx.file.file);
}).delete('/:hash', async function (ctx) {
	const { Commit } = ctx.db;

	if (!ctx.file) {
		ctx.throw(404, 'The file is not existed.');

		return;
	}

	const commits = await Commit.findAll({
		attributes: ['assets']
	});

	const isUsing = commits.filter(commit => commit.assets.indexOf(ctx.file.hash) !== -1);

	if (isUsing.length !== 0) {
		ctx.throw(403, 'The file is used');
	}

	await ctx.file.destroy();

	ctx.status = 200;
});