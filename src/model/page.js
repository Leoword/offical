let backend = null;

exports.Page = class Page {
	constructor(id, { name, title, meta, router, body}) {
		this.id = id;

		this.name = name;
		this.title = title;
		this.meta = meta;
		this.router = router;
		this.body = body;
	}

	async update(options) {
		const page = await backend.write(this.id, options);

		return page;
	}

	async destroy() {
		return await backend.destroy(this.id);
	}

	static async getById(id) {
		const page = await backend.read(id);

		if (!page) {
			return null;
		}

		return new this(page.id, page);
	}

	static async create(options) {
		const id = await backend.identify();

		await backend.write(id, options);

		return new this(id, options);
	}

	static async query() {
		const pageList = await backend.readAll();

		return pageList.map(page => {
			return new this(page.id, page);
		});
	}
};

exports.setBackend = function (newBackend) {
	backend = newBackend;
};