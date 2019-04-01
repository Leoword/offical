exports.artilce = {
	body: {
		title: Joi.string().required().min(2),
		language: Joi.string().required(),
		abstract: Joi.string().max(200),
		content: Joi.string().required()
	}
};

exports.category = {
	body: {
		name: Joi.string().required().min(2),
		comment: Joi.string().max(200)
	}
};