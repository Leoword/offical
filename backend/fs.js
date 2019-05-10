/* eslint-disable require-atomic-updates */
const path = require('path');
const fs = require('fs-extra');

const filePath = require(path.resolve('config.json')).store;

async function writeToFS(data) {
	const newPath = `${filePath}.${Date.now()}`;

	await fs.copy(filePath, newPath);
	await fs.writeJson(filePath, data);
	await fs.remove(newPath);
}

async function initCache() {
	await fs.ensureFile(filePath);
	
	try {
		return await fs.readJson(filePath);
	} catch (e) {
		await fs.writeJson(filePath, {});

		return {};
	} 
}

const page = module.exports = {
	cache: null,
	identify() {
		return Math.random().toString(16).substr(2, 8);
	},
	read(id) {
		return this.cache[id];
	},
	readAll() {
		const result = [];

		for (let key in this.cache) {
			result.push(Object.assign({}, {
				id: key
			}, this.cache[key]));
		}

		return result;
	},
	async write(id, options) {
		options.id =id;

		this.cache[id] = options;

		await writeToFS(this.cache);

		return options;
	},
	async destroy(id) {
		const page = this.cache[id];

		delete this.cache[id];

		await writeToFS(this.cache);

		return page;
	}
};

initCache().then((pageMapping) => {
	page.cache = pageMapping;
});