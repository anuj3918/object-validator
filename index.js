const common = require('./lib/common');
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
const validate = (userSchema, userObj, noExtraKeys) => {
    // Validates type of schema
    if (common.getTypeOf(userSchema) !== 'object') {
        return { err: new Error('Invalid schema passed for validation'), result: null }
    }

    // Validates type of userObj
    if (common.getTypeOf(userObj) !== 'object') {
        return { err: new Error('Invalid object passed for validation'), result: null }
    }

    // Makes a clone of userObj
    let obj = _.cloneDeep(userObj);
    let schema = _.cloneDeep(userSchema);

    // Checks if equal number of keys in schema and obj
    if (noExtraKeys) {
        let response = common.checkNumberOfKeys(schema, obj);
        let { err, result } = response;
        if (err) {
            return { err, message: "ExtraKeys present in object error", result: null };
        }
    }

    // Loop through all the keys
    for (let [k, v] of Object.entries(schema)) {

        // Checks if key is undefined
        let response = common.checkKeyUndefined(k, v, obj);
        let { err, result } = response;
        if (err) {
            if (!(v.setDefault && v.default !== undefined)) {
                return { err, message: 'Key not exists', result: null }
            };
            obj[k] = v.default;
        }


        // Handles nested objects
        if (!Object.keys(v).includes("keyType")) {
            let recurseResult = validate(v, obj[k], noExtraKeys);
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
                if (!(v.setDefault && v.default !== undefined)) {
                    return { err, message: "Type mismatch occurred", result: null }
                }
                obj[k] = v.default;
            }
        } else {
            let err = new Error(`KeyType is a mandatory flag and should not be an empty array`);
            return { err, message: "Invalid input", result: null }
        }

        // Size check
        if (v.size) {
            if (common.getTypeOf(v.size) !== 'array') {
                let err = new Error(`Invalid value of flag -> size for key: ${k}`)
                return { err, message: 'Invalid input error', result: null };
            }

            let response = common.checkSize(k, v, obj);
            let { err, message, result } = response;
            if (err) {
                if (!(v.setDefault && v.default !== undefined)) {
                    return { err, message, result: null }
                };
                obj[k] = v.default;
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
                if (!(v.setDefault && v.default !== undefined)) {
                    return { err, message, result: null }
                };
                obj[k] = v.default;
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
                if (!(v.setDefault && v.default !== undefined)) {
                    return { err, message, result: null }
                };
                obj[k] = v.default;
            }
        }

    }// for loop ends

    return { err: null, message: 'Validations successful', result: obj }
};

module.exports = { validate };
