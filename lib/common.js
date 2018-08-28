const strings = require('./modules/strings');
const arrays = require('./modules/arrays');
const objects = require('./modules/objects');

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
}

const checkNumberOfKeys = (schema, obj) => {
  if (Object.keys(schema).length !== Object.keys(obj).length) {
    return { err: new Error("Number of keys in object and schema are not equal"), result: 'invalid' };
  }

  return { err: null, result: 'valid' }
};

const checkKeyUndefined = (k, v, obj) => {
  if (obj[k] === undefined) {
    let err = new Error(`Required key does not exist: ${k}`);
    return { err, result: 'invalid' };
  }

  return { err: null, result: 'valid' }
};

const checkKeyType = (k, v, obj) => {
  let typeValidated = false;
  let allowedTypes = v.keyType;
  let strictObject = v.strictObject;

  for (let keyType of allowedTypes) {
    switch (keyType) {
      case "array":
        if (_.isArray(obj[k])) {
          typeValidated = true;
        }
        break;
      case "error":
        if (_.isError(obj[k])) {
          typeValidated = true;
        }
        break;
      case "null":
        if (_.isNull(obj[k])) {
          typeValidated = true;
        }
        break;
      case "object":
        if (strictObject === false && _.isObjectLike(obj[k])) {
          typeValidated = true;
        } else if (_.isPlainObject(obj[k])) {
          typeValidated = true;
        }
        break;
      default:
        if (keyType == typeof obj[k]) {
          typeValidated = true;
        }
    }

    if (typeValidated) {
      break;
    }
  }

  if (!typeValidated) {
    let err = new Error(`Type of key ${k} does not match in ${JSON.stringify(v.keyType)}`);
    return { err, message: 'Type mismatch occurred', result: 'invalid' };
  }

  return { err: null, message: 'KeyType validated', result: 'valid' };
}

const checkSize = (k, v, obj) => {
  let type = typeof obj[k]
  let response

  switch (type) {
    case 'string':
      response = strings.checkSize(k, v, obj);
      break;
    case 'array':
      response = arrays.checkSize(k, v, obj);
      break;
    default:
      response = { err: new Error(`Invalid datatype of key for size check: ${k}`), message: 'Invalid input error', result: 'invalid' }
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
    return { err, message: 'Invalid value error', result: 'invalid' }
  }

  response = { err: null, message: 'Validation successful', result: 'valid' };
  return response;
};

module.exports = { getTypeOf, checkKeyUndefined, checkNumberOfKeys, checkKeyType, checkSize, checkAllowed, checkNotAllowed };
