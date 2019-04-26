const Joi = require('joi');

exports.section = {
	create: {
		body: {
			formatId: Joi.number().required(),
			collection: Joi.array().items(
				Joi.object().keys({
					type: Joi.string().allow(['file', 'article']).required(),
					args: Joi.object().keys({
						category: Joi.string(),
						type: Joi.string(),
						thumbnail: Joi.boolean(),
						exp: {
							limit: Joi.number(),
							hash: Joi.string(),
							title: Joi.string()
						}
					})
				})
			).required(),
			comment: Joi.string().max(200),
			name: Joi.string().required()
		},
		query: {
			formatId: Joi.number()
		}
	},
	update: {
		body: {
			formatId: Joi.number(),
			collection: Joi.array().items(
				Joi.object().keys({
					type: Joi.string().allow(['file', 'article']).required(),
					args: Joi.object().keys({
						category: Joi.string(),
						type: Joi.string(),
						thumbnail: Joi.boolean(),
						exp: {
							limit: Joi.number(),
							hash: Joi.string(),
							title: Joi.string()
						}
					})
				})
			),
			comment: Joi.string().max(200),
			name: Joi.string()
		}
	}
};

exports.format = {
	create: {
		body: {
			name: Joi.string().required(),
			comment: Joi.string()
		}
	},
	update: {
		body: {
			name: Joi.string(),
			comment: Joi.string()
		}
	}
};