const _ = require('lodash');
const flatten = require('flat');

const getPartialSchema = (schema, payload) => {
	const keys = Object.keys(flatten(payload));
	const partialSchema = _.pick(schema, keys);

	return {
		err: null,
		result: partialSchema
	};
};

module.exports = { getPartialSchema };
