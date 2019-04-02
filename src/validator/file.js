module.exports = {
	body: {
		comment: Joi.string(),
		type: Joi.string().required(),
		file: Joi.string().required(),
	},
	query: {
		type: Joi.string()
	}
}