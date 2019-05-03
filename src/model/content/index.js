const Article = require('./article');
const Commit = require('./commit');

const {Base, Interface} = require('../../../../content');

let id = 1;

const interface = new Interface({
	content: {
		identify() {
			return id++;
		},
		async read(id) {
			const article = await Article.findByPk(id);

			return article;
		},
		async write(id) {
			const article = await Article.findByPk(id);

			if (article) {
				return article;
			}

			return await Article.create({id});
		},
		async destroy(id) {
			const article = await Article.findByPk(id);
			const commits = await Commit.findAll({
				where: {
					articleId: id
				}
			});

			for (const commit of commits) {
				commit.destroy();
			}

			article.destroy();
		}
	},
	i18n: { 
		async langs(id) {
			const commits = await Commit.findAll({
				where: {
					articleId: id
				}
			});
			const langs = [];

			commits.forEach(commit => {
				if (langs.indexOf(commit.lang) === -1) {
					langs.push(commit.lang);
				}
			});

			return langs;
		}
	},
	commit: {
		async read(id, lang) {
			const commits = await Commit.findAll({
				where: {
					articleId: id,
					lang
				},
				order: [['createdAt', 'DESC']]
			});

			return commits[0];
		},
		async write(id, lang, {
			hash,
			author,
			title, abstract, text,
			createdAt
		}) {
			let article = await Article.findByPk(id);

			if (!article) {
				article = await Article.create({id});	
			}

			const commits = await Commit.findAll({
				where: {
					articleId: id,
					lang
				},
				order: [['createdAt', 'DESC']]
			});

			await Commit.create({
				hash, lang,
				articleId: article.id,
				title, abstract, text,
				base: commits[0].hash,
				author, createdAt
			});
		},
		async query(id, lang) {
			return  await Commit.findAll({
				where: {
					articleId: id,
					lang
				},
				order: [['createdAt', 'DESC']]
			});
		}
	}
});

module.exports = new Base(interface, {
	defaultLang: 'zh'
});