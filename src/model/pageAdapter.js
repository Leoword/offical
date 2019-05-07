module.exports = class Base {
	constructor (interfaceInstance) {
		this.interface = interfaceInstance;
	}

	async get(id) {
		const pages = await this.interface.read();

		const page = pages.find(page => page.id === id);

		if (!page) {
			return null;
		}

		return new Page(id, this);
	}

	async getPages() {
		return await this.interface.read();
	}

	async create() {
		const id = await this.interface.identify();

		return new Page(id, this);
	}

	async destroy(id) {
		const page = await this.interface.destroy(id);

		return page;
	}
};

class Page {
	constructor(id, base) {
		this.id = id;
		this.base = base;
	}

	async write(options) {
		const page = await this.base.interface.write(this.id, options);

		return page;
	}
}