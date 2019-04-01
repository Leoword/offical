exports.section = {
	body: {
		formatId: Joi.number().required(),
		collection: Joi.object().keys({
			
		}).required(),
		comment: Joi.string().max(200)
	}
};

exports.format = {
	body: {
		name: Joi.string().max(15).required(),
		comment: Joi.string().max(200)
	}
};