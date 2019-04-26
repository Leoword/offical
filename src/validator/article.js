const Joi = require('joi');

exports.artilce = {
	create: {
		body: {
			title: Joi.string().required().min(2),
			language: Joi.string().required(),
			abstract: Joi.string().max(200).required(),
			content: Joi.string().required()
		},
		query: {
			language: Joi.string(),
			keyword: Joi.string()
		}
	},
	update: {
		body: {
			title: Joi.string().min(2),
			language: Joi.string(),
			abstract: Joi.string().max(200),
			content: Joi.string()
		},
		query: {
			language: Joi.string(),
			keyword: Joi.string()
		}
	}
};

exports.category = {
	create: {
		body: {
			name: Joi.string().required().min(2),
			comment: Joi.string().max(200)
		}
	},
	update: {
		body: {
			name: Joi.string().min(2),
			comment: Joi.string().max(200)
		}
	}
};