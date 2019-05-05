const Sequelize = require('sequelize');
const Article = require('./article');
const Commit = require('./commit');
const {Base, Interface} = require('../../../content');

async function initStore() {
	const store = {};

	const articleList = await Article.findAll();
	const commitList = await Commit.findAll({
		order: [['createdAt', 'ASC']]
	});

	articleList.forEach(article => store[article.id] = {});
	commitList.forEach(commit => {
		const {hash, articleId, lang, title, abstract, author, createdAt} = commit;

		if (store[articleId] && store[articleId][lang]) {
			store[articleId][lang].push({
				hash, title, abstract, author, createdAt
			});
		} else {
			store[articleId][lang] = [];
		}
	});
}

let id = 1;
let store = null;

initStore().then(result => store = result);

const interface = new Interface({
	content: {
		identify() {
			return id++;
		},
		read(id) {
			return store[id];
		},
		async write(id) {
			const article = store[id];

			if (article) {
				return article;
			}

			store[id] = {};

			return await Article.create({id});
		},
		async destroy(id) {
			const article = store[id];
			const commits = [];

			if (!article) {
				return;
			}

			for (let lang in article) {
				article[lang].forEach(commit => {
					commits.push(commit.hash);
				});
			}

			await Commit.destroy({
				where: {
					hash: {
						[Sequelize.Op.in]: commits
					}
				}
			});

			await Article.destroy({
				where: {
					id
				}
			});

			delete store[id];
		}
	},
	i18n: { 
		langs(id) {
			const article = store[id];

			if (!article) {
				return [];
			}

			return Object.keys(article);
		}
	},
	commit: {
		read(id, lang) {
			const article = store[id];

			if (article && article[lang]) {
				const commits = article[lang];

				return commits[commits.length - 1];
			}
		},
		async write(id, lang, {
			hash,
			author,
			title, abstract, text,
			createdAt
		}) {
			let article = store[id];

			if (!article) {
				article = await Article.create({id});
				
				store[id] = {};
			}

			if (!article[lang]) {
				article[lang] = [];
			}

			const commits = article[lang];

			await Commit.create({
				hash, lang,
				articleId: article.id,
				title, abstract, text,
				base: commits[commits.length - 1],
				author, createdAt
			});

			commits.push({
				hash, title, abstract, author, createdAt
			});
		},
		query(id, lang) {
			const article = store[id];

			if (!article || !article[lang]) {
				return [];
			}

			return article[lang];
		}
	}
});

module.exports = new Base(interface, {
	defaultLang: 'zh'
});