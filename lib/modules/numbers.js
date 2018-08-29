const _ = require('lodash');

const checkRange = (k, v, obj) => {
	let min = v.range[0];
	let max = v.range[1];

	if (obj[k] < min || obj[k] > max) {
		let err = new Error(`Value passed not in range ${JSON.stringify(v.range)} of key: ${k}`);
		return { err, message: 'Value not in range error', result: 'invalid' };
	}

	return { err: null, message: 'Validation successful', result: 'valid' };
};

const checkMax = (k, v, obj) => {
	let max = v.max;

	if (obj[k] > max) {
		let err = new Error(`Value passed is greater than max -> ${max} of key: ${k}`);
		return { err, message: 'Value greater than max', result: 'invalid' };
	}

	return { err: null, message: 'Validation successful', result: 'valid' };
};

const checkMin = (k, v, obj) => {
	let min = v.min;

	if (obj[k] < min) {
		let err = new Error(`Value passed is less than min -> ${min} of key: ${k}`);
		return { err, message: 'Value less than min', result: 'invalid' };
	}

	return { err: null, message: 'Validation successful', result: 'valid' };
};

module.exports = { checkMin, checkMax, checkRange };
