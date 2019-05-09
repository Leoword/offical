const Sequelize = require('sequelize');
const sequelize = require('./sequelize');

const markdownIt = require('markdown-it');

module.exports = sequelize.define('commit', {
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

			if (!text) {
				return null;
			}

			const nodeList = markdownIt().parse(text);
			const assets = [];

			nodeList.forEach(node => {
				if (node.children !== null) {
					node.children.forEach(element => {
						if (element.type === 'image') {
							const url = element.attrs[0][1];

							assets.push(url.substring(url.lastIndexOf('/') + 1));
						}
					});
				}
			});

			return assets;
		}
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