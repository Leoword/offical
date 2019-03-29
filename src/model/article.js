const sequelize = require('../lib/sequelize');
const Sequelize = require('sequelize');

const ISO6391 = require('@ovl/iso-639-1');
const lang = new ISO6391();

exports.Article = sequelize.define('article', {
	hash: {
		type: Sequelize.UUID,
		defaultValue: true
	}
}, {
	updatedAt: false
});

exports.Language = sequelize.define('language', {
	hash: {
		type: Sequelize.UUID,
		defaultValue: true,
		primaryKey: true
	},
	name: {
		type: Sequelize.ENUM(...lang.getAllCodes()),
		allowNull: false
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
		type: Sequelize.UUID,
		allowNull: false
	}
}, {
	createdAt: false,
	updatedAt: false
});

exports.Commit = sequelize.define('commit', {
	hash: {
		type: Sequelize.UUID,
		primaryKey: true,
		defaultValue: true
	},
	content: {
		type: Sequelize.TEXT,
		allowNull: false
	},
	base: {
		type: Sequelize.UUID,
		allowNull: false
	},
	language: {
		type: Sequelize.UUID,
		allowNull: false
	},
	author: {
		type: Sequelize.STRING,
		allowNull: false
	}
}, {
	updatedAt: false
});

exports.Category = sequelize.define('category', {
	hash: {
		type: Sequelize.UUID,
		primaryKey: true,
		defaultValue: true
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