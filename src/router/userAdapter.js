
let backend = null;

exports.User = {
	async create(ctx) {
		return await backend.create(ctx);
	},
	async update(ctx) {
		return await backend.update(ctx);
	},
	async get(ctx) {
		return await backend.get(ctx);
	},
	async getList(ctx) {
		return await backend.getList(ctx);
	},
	async destroy(ctx) {
		return await backend.destroy(ctx);
	},
	async validate(ctx) {
		return await backend.validate(ctx);
	}
};

exports.setBackend = function (newBackend) {
	backend = newBackend;
};
