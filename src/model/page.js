const Base = require('./pageAdapter');
const path = require('path');
const fs = require('fs');

const {store} = require(path.resolve(process.cwd(), 'config.json'));
const filePath = `${store.path}/${store.filename}`;

let i = 0;

module.exports = new Base({
	identify() {
		return i++;
	},
	read() {
		const isExist = fs.existsSync(filePath);
		
		if (!isExist) {
			fs.writeFileSync(filePath, '[]');
		}

		const isFile = fs.statSync(filePath).isFile();

		if (isFile) {
			const result = fs.readFileSync(filePath, {
				encoding: 'utf8'
			});

			if (result !== '') {
				return JSON.parse(result);
			}
		}

		return [];
	},
	write(id, options) {
		const pageList = this.read();
		const index = pageList.findIndex(page => page.id === id);
		const newPath = `${filePath}.${Date.now()}`;

		if (index === -1) {
			pageList.push({
				id, options
			});
		} else {
			pageList[index] = {
				id, options
			};
		}

		fs.renameSync(filePath, newPath);
		fs.writeFileSync(filePath, JSON.stringify(pageList));
		fs.unlinkSync(newPath);

		return {id, options};
	},
	destroy(id) {
		const pageList = this.read();
		const index = pageList.findIndex(page => page.id === id);
		const newPath = `${filePath}.${Date.now()}`;


		if (index !== -1) {
			pageList.splice(index, 1);
		}

		fs.renameSync(filePath, newPath);
		fs.writeFileSync(filePath, JSON.stringify(pageList));
		fs.unlinkSync(newPath);

		return pageList;
	}
});