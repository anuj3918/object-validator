const strings = require('./modules/strings');
const arrays = require('./modules/arrays');
const objects = require('./modules/objects');
const numbers = require('./modules/numbers');

const _ = require('lodash');

const getTypeOf = (value) => {
	if (_.isArray(value)) {
		return 'array';
	}

	if (_.isNull(value)) {
		return 'null';
	}

	if (_.isUndefined(value)) {
		return 'undefined';
	}

	if (_.isDate(value)) {
		return 'date';
	}

	if (_.isError(value)) {
		return 'error';
	}

	if (_.isNumber(value)) {
		return 'number';
	}

	if (_.isString(value)) {
		return 'string';
	}

	if (_.isPlainObject(value)) {
		return 'object';
	}
};

const checkStrictMatch = (schema, obj) => {
	if (Object.keys(schema).length !== Object.keys(obj).length) {
		let err = new Error('Number of keys in object and schema are not equal');
		return { err, message: 'Strictmatch object error', result: 'invalid' };
	}

	return { err: null, message: 'Validation successful', result: 'valid' };
};

const checkKeyUndefined = (k, v, obj) => {
	if (obj[k] === undefined) {
		let err = new Error(`Required key does not exist in object: ${k}`);
		return { err, message: 'Key not exists error', result: 'invalid' };
	}

	return { err: null, message: 'Validation successful', result: 'valid' };
};

const checkKeyType = (k, v, obj) => {
	let typeValidated = false;
	let allowedTypes = v.keyType;
	let strictObject = v.strictObject;

	for (let keyType of allowedTypes) {
		// Handles special case of object
		if (keyType === 'object') {
			if (strictObject === false && _.isObjectLike(obj[k])) {
				typeValidated = true;
				break;
			}

			if (getTypeOf(obj[k]) === 'object') {
				typeValidated = true;
				break;
			}
		}

		// Handles all other types
		if (keyType === getTypeOf(obj[k])) {
			typeValidated = true;
			break;
		}
	}

	if (!typeValidated) {
		let err = new Error(`KeyType not in ${JSON.stringify(v.keyType)} for key: ${k}`);
		return { err, message: 'Type mismatch occurred', result: 'invalid' };
	}

	return { err: null, message: 'KeyType validated', result: 'valid' };
};

const checkSize = (k, v, obj) => {
	let type = getTypeOf(obj[k]);
	let response;

	switch (type) {
		case 'string':
			response = strings.checkSize(k, v, obj);
			break;
		case 'array':
			response = arrays.checkSize(k, v, obj);
			break;
		default:
			response = {
				err: new Error(`Invalid datatype of key for size check: ${k}`),
				message: 'Invalid input error',
				result: 'invalid'
			};
	}
	return response;
};

const checkRegExp = (k, v, obj) => {
	let response = { err: null, message: 'Validation successful', result: 'valid' };

	if (v.keyType.includes('string')) {
		if (getTypeOf(obj[k]) === 'string') {
			response = strings.checkRegExp(k, v, obj);
			return response;
		}
	} else {
		response = {
			err: new Error(`Invalid keyType for flag -> matchRegExp for key: ${k}`),
			message: 'Invalid input error',
			result: 'invalid'
		};
	}

	return response;
};

const checkAllowed = (k, v, obj) => {
	let response;

	if (_.isArray(obj[k])) {
		response = arrays.checkAllowed(k, v, obj);
		return response;
	}

	if (_.isPlainObject(obj[k])) {
		response = objects.checkAllowed(k, v, obj);
		return response;
	}

	if (!v.allowed.includes(obj[k])) {
		let err = new Error(`Value passed not among allowed values of key: ${k}`);
		response = { err, message: 'Invalid value error', result: 'invalid' };
		return response;
	}

	response = { err: null, message: 'Validation successful', result: 'valid' };
	return response;
};

const checkNotAllowed = (k, v, obj) => {
	let response;

	if (_.isArray(obj[k])) {
		response = arrays.checkNotAllowed(k, v, obj);
		return response;
	}

	if (_.isPlainObject(obj[k])) {
		response = objects.checkNotAllowed(k, v, obj);
		return response;
	}

	if (v.notAllowed.includes(obj[k])) {
		let err = new Error(`Value passed among notAllowed values of key: ${k}`);
		return { err, message: 'Invalid value error', result: 'invalid' };
	}

	response = { err: null, message: 'Validation successful', result: 'valid' };
	return response;
};

const checkMax = (k, v, obj) => {
	let response = { err: null, message: 'Validation successful', result: 'valid' };
	if (getTypeOf(obj[k]) === 'number') {
		response = numbers.checkMax(k, v, obj);
	}

	return response;
};

const checkMin = (k, v, obj) => {
	let response = { err: null, message: 'Validation successful', result: 'valid' };
	if (getTypeOf(obj[k]) === 'number') {
		response = numbers.checkMin(k, v, obj);
	}

	return response;
};

const checkRange = (k, v, obj) => {
	let response = { err: null, message: 'Validation successful', result: 'valid' };
	if (getTypeOf(obj[k]) === 'number') {
		response = numbers.checkRange(k, v, obj);
	}

	return response;
};

module.exports = {
	getTypeOf,
	checkKeyUndefined,
	checkStrictMatch,
	checkKeyType,
	checkSize,
	checkAllowed,
	checkNotAllowed,
	checkMin,
	checkMax,
	checkRange,
	checkRegExp
};
