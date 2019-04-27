const fs = require('fs');

module.exports = async function (ctx) {
	const {sequelize, request, response} = ctx;
	
	const {type} = request.body;
	const file = request.files.file;
	const File = sequelize.model('file');

	let data = Buffer.from([]);
	const readerStream = fs.createReadStream(file.path);

	readerStream.on('data', function(chunk) {
		data = Buffer.concat([data, chunk], data.length + chunk.length);
 	});
 
	return new Promise((resolve) => {
		readerStream.on('end',async function () {
			const newFile = await File.create({type, file: data});
	
			response.body = {
				url: `/api/file/${newFile.hash}`
			};

			resolve();
		});
	});
};