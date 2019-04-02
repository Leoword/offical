exports.create = {
	section: {
		body: {
			formatId: Joi.number().required(),
			collection: Joi.object().keys({
				
			}).required(),
			comment: Joi.string().max(200)
		},
		query: {
			formatId: Joi.number()
		}
	},
	format: {
		body: {
			name: Joi.string().max(15).required(),
			comment: Joi.string().max(200)
		}
	}
};

exports.update = {
	section: {
		body: {
			formatId: Joi.number(),
			collection: Joi.object().keys({
				
			}),
			comment: Joi.string().max(200)
		}
	},
	format: {
		body: {
			name: Joi.string().max(15),
			comment: Joi.string().max(200)
		}
	}
};