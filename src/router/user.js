const Router = require('koa-router');
const { User } = require('./userAdapter');

module.exports = new Router({
	prefix: '/user'
}).post('/', async function (ctx) {
	await User.create(ctx);

	ctx.status = 200;
}).get('/', async function (ctx) {
	await User.getList(ctx);
}).get('/:id', async function (ctx) {
	await User.get(ctx);
}).put('/:id', async function (ctx) {
	await User.update(ctx);

	ctx.status = 200;
}).delete('/:id', async function (ctx) {
	await User.destroy(ctx);

	ctx.status = 200;
});

