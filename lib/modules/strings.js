const checkSize = (k, v, obj) => {
	if (!v.size.includes(obj[k].length)) {
		let err = new Error(`Size not in given sizes ${JSON.stringify(v.size)} of key: ${k}`);
		return { err, message: 'Size mismatch error', result: 'invalid' };
	}

	return { err: null, message: 'Validation successful', result: 'valid' };
};

const checkRegExp = (k, v, obj) => {
	const regExp = v.regExp;

	if (!regExp.test(obj[k])) {
		let err = new Error(`Value does not match regExp -> ${regExp} of key: ${k}`);
		return { err, message: 'RegExp mismatch error', result: 'invalid' };
	}

	return { err: null, message: 'Validation successful', result: 'valid' };
};

module.exports = { checkSize, checkRegExp };
