const Joi = require('joi');

module.exports = {
	body: {
		type: Joi.string().required(),
		file: Joi.string().required(),
	}
};