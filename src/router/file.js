const Router = require('koa-router');
const fs = require('fs');
const path = require('path');

const config = require(path.resolve('config.json'));

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

	if (!request.files || !request.files.file) {
		ctx.throw(400, 'The file is required.');

		return;
	}
	
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
				url: `${config.server.url}/api/file/${newFile.hash}`
			};

			resolve();
		});
	});
}).get('/', async function (ctx) {
	const fileList = await ctx.File.findAll();

	ctx.body = fileList.map(file => {
		const { hash, type, comment } = file;

		return {
			url: `${config.server.url}/api/file/${hash}`,
			type, comment, id: hash
		};
	});
}).delete('/:hash', async function (ctx) {
	if (!ctx.file) {
		ctx.throw(404, 'The file is not existed.');

		return;
	}

	await ctx.file.destroy();

	ctx.status = 200;
});