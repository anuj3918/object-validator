const _ = require('lodash');

const checkAllowed = (k, v, obj) => {
    let found = false;
    for (let allowedVal of v.allowed) {
        if (_.isEqual(obj[k], allowedVal)) {
            found = true;
            break;
        }
    }

    if (!found) {
        let err = new Error(`Value passed not among allowed values of key: ${k}`);
        return { err, message: 'Invalid value error', result: 'invalid' }
    }

    return { err: null, message: 'Validation successful', result: 'valid' }
};

const checkNotAllowed = (k, v, obj) => {
    let found = false;
    for (let notAllowedVal of v.notAllowed) {
        if (_.isEqual(obj[k], notAllowedVal)) {
            found = true;
            break;
        }
    }

    if (found) {
        let err = new Error(`Value passed among notAllowed values of key: ${k}`);
        return { err, message: 'Invalid value error', result: 'invalid' }
    }

    return { err: null, message: 'Validation successful', result: 'valid' }
};

module.exports = { checkAllowed, checkNotAllowed };
