const moment = require('moment');

const checkRange = (k, v, obj) => {
	const dateFormat = 'DD/MM/YYYY HH:mm:ss';

	const min = moment(v.range[0], dateFormat, true);
	const max = moment(v.range[1], dateFormat, true);
	const date = moment(obj[k], dateFormat);

	if (!min.isValid() || !max.isValid()) {
		const err = new Error(`Range flag can only have date of format ${dateFormat} for key: ${k}`);
		return { err, message: 'Invalid input error', result: 'invalid' };
	}
	
	if (!date.isBetween(min, max, null, "[]")) {
		const err = new Error(`Value passed not in range ${JSON.stringify(v.range)} of key: ${k}`);
		return { err, message: 'Value not in range error', result: 'invalid' };
	}

	return { err: null, message: 'Validation successful', result: 'valid' };
};

module.exports = { checkRange };
