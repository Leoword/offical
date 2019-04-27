const Joi = require('joi');

module.exports = {
	create: {
		body: {
			name: Joi.string().required(),
			path: Joi.string().required(),
			sectionList: Joi.array()
		}
	},
	update: {
		body: {
			name: Joi.string(),
			path: Joi.string(),
			sectionList: Joi.array()
		}
	}
};