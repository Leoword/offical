const Sequelize = require('sequelize');
const { sequelize } = require('../src');

const Article = sequelize.define('article', {
	id: {
		type: Sequelize.STRING,
		primaryKey: true
	},
	createdAt: {
		type: Sequelize.DATE,
		defaultValue: Sequelize.NOW,
		allowNull: false
	}
});

const markdownIt = require('markdown-it');

const Commit = sequelize.define('commit', {
	hash: {
		type: Sequelize.STRING(70),
		primaryKey: true,
		defaultValue: Sequelize.UUIDV4
	},
	lang: {
		type: Sequelize.STRING,
		allowNull: false
	},
	articleId: {
		type: Sequelize.STRING,
		allowNull: false
	},
	title: {
		type: Sequelize.STRING,
		allowNull: false
	},
	abstract: {
		type: Sequelize.STRING,
		allowNull: false
	},
	assets: {
		type: Sequelize.STRING,
		get() {
			const text = this.getDataValue('text');
			const assets = [];

			if (!text) {
				return assets;
			}

			const nodeList = markdownIt().parse(text);

			nodeList.forEach(node => {
				if (node.children !== null) {
					node.children.forEach(element => {
						if (element.type === 'image') {
							const url = element.attrs[0][1];

							assets.push(url);
						}
					});
				}
			});

			return assets;
		}
	},
	thumbnail: {
		type: Sequelize.STRING
	},
	text: {
		type: Sequelize.TEXT,
		allowNull: false
	},
	base: {
		type: Sequelize.STRING(70)
	},
	author: {
		type: Sequelize.STRING
	},
	createdAt: {
		type: Sequelize.DATE,
		defaultValue: Sequelize.NOW,
		allowNull: false
	}
});

async function initStore() {
	const store = {};

	try {
		const articleList = await Article.findAll();
		const commitList = await Commit.findAll({
			order: [['createdAt', 'ASC']]
		});
	
		articleList.forEach(article => store[article.id] = {});
		commitList.forEach(commit => {
			const {hash, articleId, lang, title, abstract, text, author, createdAt} = commit;
	
			if (!store[articleId]) {
				return;
			}
	
			if (!store[articleId][lang]) {
				store[articleId][lang] = [];
			}
	
			store[articleId][lang].push({
				hash, title, abstract, text, author, createdAt
			});
		});
	} catch (e) {
		return {};
	}

	return store;
}

let store = null;

initStore().then(result => store = result);

module.exports = {
	content: {
		identify() {
			return Math.random().toString(16).substr(2, 8);
		},
		read(id) {
			return store[id];
		},
		query() {
			const result = [];

			for (let key in store) {
				result.push({
					id: key
				});
			}
			
			return result;
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

			if (!article[lang]) {
				article[lang] = [];
			}

			const commitList = article[lang];
			const existedCommitList = commitList.filter(commit => {
				commit.hash === hash;
			});

			if (existedCommitList.length !== 0) {
				return existedCommitList[0];
			}
			

			await Commit.create({
				hash, lang,
				articleId: id,
				title, abstract, text,
				base: commitList.length > 0 ? commitList[commitList.length - 1].hash : null,
				author, createdAt
			});

			article[lang].push({
				hash, title, abstract, author, text, createdAt
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
};