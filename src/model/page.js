const fs = require('fs');
const storage = config.storage;

const Page = class Page {
	constructor(id, name, path, sectionList, comment) {
		this.id = id;
		this.name = name;
		this.path = path;
		this.sectionList = sectionList;
		this.comment = comment;
	}

	update({name, path, sectionList, comment}) {
		this.name = name ? name : this.name;
		this.path = path ? path : this.path;
		this.sectionList = sectionList ? sectionList : this.sectionList;
		this.comment = comment ? comment : this.comment;
	}
};

let id = 1;

module.exports = {
	pages: [],
	dirPath: `${process.cwd()}/${storage.dir}`,
	get filePath() {
		return `${this.dirPath}/${storage.file}`;
	},
	init() {
		createStore(this.dirPath, this.filePath);
		const pageList = fs.readFileSync(this.filePath, {encoding: 'utf8'});

		const list = pageList ? JSON.parse(fs.readFileSync(this.filePath, {encoding: 'utf8'})): [];

		list.forEach(page => this.pages.push(
			new Page(page.id, page.name, page.path, page.sectionList, page.comment)
		));

		id = this.pages.length;
	},
	create({name, path, sectionList, comment}) {
		const page = new Page(id ++, name, path, sectionList, comment);

		const origin = Object.assign({}, this.pages);

		this.pages.push(page);

		const result = persistent(this.filePath, JSON.stringify(this.pages));

		if (!result) {
			this.pages = origin;

			throw new Error('Internal Error');
		}

		return {
			path, sectionList, comment
		};
	},
	findAll() {
		return this.pages;
	},
	findByPK(id) {
		return this.pages.find(page => page.id - 0 === id - 0);
	},
	update(id, {name, path, sectionList, comment}) {
		const page = this.findByPK(id - 0);
		const origin = Object.assign({}, this.pages);

		page.update({name, path, sectionList, comment});

		const result = persistent(this.filePath, JSON.stringify(this.pages));

		if (!result) {
			this.pages = origin;

			throw new Error('Internal Error');
		}

		return {name, path, sectionList, comment};
	},
	delete(id) {
		const origin = Object.assign({}, this.pages);

		this.pages.find((page, index) => {
			if (page.id - 0 === id - 0) {
				this.pages.splice(index);
			}
		});

		const result = persistent(this.filePath, JSON.stringify(this.pages));

		if (!result) {
			this.pages = origin;

			throw new Error('Internal Error');
		}

		return true;
	}
};

function createStore(dirPath, filePath) {
	const dirIsExisted = fs.existsSync(dirPath);
	const fileIsExisted = fs.existsSync(filePath);

	if (!dirIsExisted) {
		fs.mkdirSync(dirPath);
	}

	if (!fileIsExisted) {
		fs.writeFileSync(filePath, JSON.stringify([]));
	}
}

function persistent(filePath, data) {
	try {
		fs.writeFileSync(filePath, data);
	} catch (e) {
		return false;
	}

	return true;
}