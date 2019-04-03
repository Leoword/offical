const sequelize = require('../lib/sequelize');
const Sequelize = require('sequelize');

const ISO6391 = require('@ovl/iso-639-1');
const lang = new ISO6391();

exports.Article = sequelize.define('article', {
	hash: {
		type: Sequelize.UUID,
		defaultValue: Sequelize.UUIDV4,
		primaryKey: true
	}
}, {
	updatedAt: false
});

exports.Language = sequelize.define('language', {
	hash: {
		type: Sequelize.UUID,
		defaultValue: Sequelize.UUIDV4,
		primaryKey: true
	},
	name: {
		type: Sequelize.STRING,
		allowNull: false,
		get() {
			return lang.getName(this.getDataValue('name'));
		}
	},
	article: {
		type: Sequelize.UUID,
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
	head: {
		type: Sequelize.UUID
	}
}, {
	createdAt: false,
	updatedAt: false
});

exports.Commit = sequelize.define('commit', {
	hash: {
		type: Sequelize.UUID,
		primaryKey: true,
		defaultValue: Sequelize.UUIDV4
	},
	content: {
		type: Sequelize.TEXT,
		allowNull: false
	},
	base: {
		type: Sequelize.UUID
	},
	language: {
		type: Sequelize.UUID,
		allowNull: false
	},
	author: {
		type: Sequelize.STRING
	}
}, {
	updatedAt: false
});

exports.Category = sequelize.define('category', {
	hash: {
		type: Sequelize.UUID,
		primaryKey: true,
		defaultValue: Sequelize.UUIDV4
	},
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	comment: {
		type: Sequelize.STRING
	},
	parent: {
		type: Sequelize.UUID,
		allowNull: false
	}
}, {
	createdAt: false,
	paranoid: true
});

exports.AticleOfCategory = sequelize.define('article_category', {
	article: {
		type: Sequelize.UUID,
		allowNull: false
	},
	category: {
		type: Sequelize.UUID,
		allowNull: false
	}
}, {
	updatedAt: false
});