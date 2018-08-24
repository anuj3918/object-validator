const common = require('./lib/common');
const _ = require('lodash');

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
    if (!_.isObjectLike(userSchema) || _.isArray(userSchema)) {
        return { err: new Error('Invalid schema passed for validation'), result: null }
    }

    // Validates type of userObj
    if (!_.isObjectLike(userObj) || _.isArray(userObj)) {
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
            return { err, result: null };
        }
    }

    // Loop through all the keys
    for (let [k, v] of Object.entries(schema)) {
        // Checks if key is undefined
        let response = common.checkKeyUndefined(k, v, obj);
        let { err, result } = response;
        if (err) {
            if (!(v.setDefault && v.default !== undefined)) {
                return { err, result: null }
            };
            obj[k] = v.default;
        }


        // Handles nested objects
        if (!Object.keys(v).includes("keyType")) {
            // If object (without default)
            if (!obj[k]) {
                obj[k] = {};
            }
            let recurseResult = validate(v, obj[k], noExtraKeys);
            let { err, result } = recurseResult;
            if (err) {
                return recurseResult;
            }
            obj[k] = result;
            continue;
        }

        // Checks type
        if (v.keyType === "array" && !_.isArray(obj[k])) {
            if (!(v.setDefault && v.default !== undefined)) {
                return { err: { message: `Type of key ${k} does not match ${v.keyType}` }, result: null };
            }
            obj[k] = v.default;
        }

        // Checks type other than array
        if (v.keyType !== "array" && typeof obj[k] !== v.keyType) {
            if (!(v.setDefault && v.default !== undefined)) {
                return { err: { message: `Type of key ${k} does not match ${v.keyType}`, result: null } };
            }
            obj[k] = v.default;
        }


        // Checks if blank value is passed to a string
        if (v.checkBlank) {
            let response = common.checkBlank(k, v, obj);
            let { err, result } = response;
            if (err) {
                if (!(v.setDefault && v.default !== undefined)) {
                    return { err, result: null }
                };
                obj[k] = v.default;
            }
        }

        // Size check
        if (_.isArray(v.size)) {
            let response = common.checkSize(k, v, obj);
            let { err, result } = response;
            if (err) {
                if (!(v.setDefault && v.default !== undefined)) {
                    return { err, result: null }
                };
                obj[k] = v.default;
            }
        }

        // Allowed check
        if (_.isArray(v.allowed)) {
            let response = common.checkAllowed(k, v, obj);
            let { err, result } = response;
            if (err) {
                if (!(v.setDefault && v.default !== undefined)) {
                    return { err, result: null }
                };
                obj[k] = v.default;
            }
        }

        // notAllowed check
        if (_.isArray(v.notAllowed)) {
            let response = common.checkNotAllowed(k, v, obj);
            let { err, result } = response;
            if (err) {
                if (!(v.setDefault && v.default !== undefined)) {
                    return { err, result: null }
                };
                obj[k] = v.default;
            }
        }
    }// for loop ends

    return { err: null, result: obj }
};

module.exports = { validate };
