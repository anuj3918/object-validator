const common = require('./lib/common');
const helpers = require('./lib/helpers');
const _ = require('lodash');

// const flatten = require('flat');

/**
 * Validates a given object against its schema and returns validated object
 * @param {object} userSchema - schema of object
 * @param {object} userObj - object on which validation will run
 * @param {boolean} noExtraKeys - if true, will not allow any extra keys in object that are not in schema
 * @returns {object} response
 * @returns {object} response.err - Any error that occurred during validation
 * @returns {object} response.result - Validated object
 */
const validate = (userSchema, userObj, userOptions) => {
	const options = {
		matchPartialSchema: false,
		strictMatch: false,
		setDefaultValues: true
	};
	_.assign(options, userOptions);
	const { matchPartialSchema, strictMatch, setDefaultValues } = options;

	// Validates type of schema
	if (common.getTypeOf(userSchema) !== 'object') {
		let err = new Error('Schema passed for validation is not an object');
		return { err, message: 'Invalid input error', result: null };
	}

	// Validates type of userObj
	if (common.getTypeOf(userObj) !== 'object') {
		let err = new Error('Payload passed for validation is not an object');
		return { err, message: 'Invalid input error', result: null };
	}

	// Makes a clone of userObj
	let obj = _.cloneDeep(userObj);
	let schema = _.cloneDeep(userSchema);

	if (matchPartialSchema) {
		let { err, result } = helpers.getPartialSchema(schema, obj);
		if (err) {
			return { err, message: 'Partial schema creation error', result: null };
		}
		schema = result;
		console.log('Schema: ', schema);
	}

	// Checks if schema and payload are a strict match i.e. no extra keys in schema or object
	if (strictMatch) {
		let response = common.checkStrictMatch(schema, obj);
		let { err, message, result } = response;
		if (err) {
			return { err, message, result: null };
		}
	}

	// Loop through all the keys
	for (let [ k, v ] of Object.entries(schema)) {
		// Checks if key is undefined
		let response = common.checkKeyUndefined(k, v, obj);
		let { err, message, result } = response;
		if (err) {
			if (setDefaultValues && v.default !== undefined) {
				obj[k] = v.default;
			} else {
				return { err, message, result: null };
			}
		}

		// Handles nested objects
		if (!Object.keys(v).includes('keyType')) {
			let recurseResult = validate(v, obj[k], options);
			let { err, result } = recurseResult;
			if (err) {
				return recurseResult;
			}
			obj[k] = result;
			continue;
		}

		// Checks type of key
		if (v.keyType && _.isArray(v.keyType) && v.keyType.length > 0) {
			let response = common.checkKeyType(k, v, obj);
			let { err, result } = response;
			if (err) {
				if (setDefaultValues && v.default !== undefined) {
					obj[k] = v.default;
				} else {
					return { err, message: 'Type mismatch occurred', result: null };
				}
			}
		} else {
			let err = new Error(`KeyType is a mandatory flag and should a non-empty array for key: ${k}`);
			return { err, message: 'Invalid input error', result: null };
		}

		// Size check
		if (v.size) {
			if (common.getTypeOf(v.size) !== 'array') {
				let err = new Error(`Invalid value of flag -> size for key: ${k}`);
				return { err, message: 'Invalid input error', result: null };
			}

			let response = common.checkSize(k, v, obj);
			let { err, message, result } = response;
			if (err) {
				if (setDefaultValues && v.default !== undefined) {
					obj[k] = v.default;
				} else {
					return { err, message, result: null };
				}
			}
		}

		// Regular expression check
		if (v.regExp) {
			if (!_.isRegExp(v.regExp)) {
				let err = new Error(`Value of flag -> regExp not a valid regular expression for key: ${k}`);
				return { err, message: 'Invalid input error', result: null };
			}

			let response = common.checkRegExp(k, v, obj);
			let { err, message, result } = response;
			if (err) {
				if (setDefaultValues && v.default !== undefined) {
					obj[k] = v.default;
				} else {
					return { err, message, result: null };
				}
			}
		}

		// Allowed check
		if (v.allowed) {
			if (common.getTypeOf(v.allowed) !== 'array') {
				let err = new Error(`Invalid value of flag -> allowed for key: ${k}`);
				return { err, message: 'Invalid input error', result: null };
			}

			let response = common.checkAllowed(k, v, obj);
			let { err, message, result } = response;
			if (err) {
				if (setDefaultValues && v.default !== undefined) {
					obj[k] = v.default;
				} else {
					return { err, message, result: null };
				}
			}
		}

		// notAllowed check
		if (v.notAllowed) {
			if (common.getTypeOf(v.notAllowed) !== 'array') {
				let err = new Error(`Invalid value of flag -> notAllowed for key: ${k}`);
				return { err, message: 'Invalid input error', result: null };
			}

			let response = common.checkNotAllowed(k, v, obj);
			let { err, message, result } = response;
			if (err) {
				if (setDefaultValues && v.default !== undefined) {
					obj[k] = v.default;
				} else {
					return { err, message, result: null };
				}
			}
		}

		// Range check for number
		if (v.range) {
			if (!v.keyType.includes('number')) {
				let err = new Error(`Range flag is valid only on number datatype for key: ${k}`);
				return { err, message: 'Invalid input error', result: null };
			}

			if (common.getTypeOf(v.range) !== 'array' || v.range.length !== 2) {
				let err = new Error(`Range flag can only have [min, max] format for key: ${k}`);
				return { err, message: 'Invalid input error', result: null };
			}

			let response = common.checkRange(k, v, obj);
			let { err, message, result } = response;
			if (err) {
				if (setDefaultValues && v.default !== undefined) {
					obj[k] = v.default;
				} else {
					return { err, message, result: null };
				}
			}
		}

		// Max check for number
		if (v.max !== undefined) {
			if (!v.keyType.includes('number')) {
				let err = new Error(`Max flag is valid only on number datatype for key: ${k}`);
				return { err, message: 'Invalid input error', result: null };
			}

			if (common.getTypeOf(v.max) !== 'number') {
				let err = new Error(`Max flag can only have number value for key: ${k}`);
				return { err, message: 'Invalid input error', result: null };
			}

			let response = common.checkMax(k, v, obj);
			let { err, message, result } = response;
			if (err) {
				if (setDefaultValues && v.default !== undefined) {
					obj[k] = v.default;
				} else {
					return { err, message, result: null };
				}
			}
		}

		// Min check for number
		if (v.min !== undefined) {
			if (!v.keyType.includes('number')) {
				let err = new Error(`Min flag is valid only on number datatype for key: ${k}`);
				return { err, message: 'Invalid input error', result: null };
			}

			if (common.getTypeOf(v.min) !== 'number') {
				let err = new Error(`Min flag can only have number value for key: ${k}`);
				return { err, message: 'Invalid input error', result: null };
			}

			let response = common.checkMin(k, v, obj);
			let { err, message, result } = response;
			if (err) {
				if (setDefaultValues && v.default !== undefined) {
					obj[k] = v.default;
				} else {
					return { err, message, result: null };
				}
			}
		}
	} // for loop ends

	return { err: null, message: 'Validations successful', result: obj };
};

module.exports = { validate };
