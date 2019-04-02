
exports.create = {
	artilce: {
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
	category: {
		body: {
			name: Joi.string().required().min(2),
			comment: Joi.string().max(200)
		}
	}
};

exports.update = {
	artilce: {
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
	},
	category: {
		body: {
			name: Joi.string().min(2),
			comment: Joi.string().max(200)
		}
	}
}