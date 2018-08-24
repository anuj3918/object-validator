const strings = require('./modules/strings');
const arrays = require('./modules/arrays');

const checkNumberOfKeys = (schema, obj) => {
  if (Object.keys(schema).length !== Object.keys(obj).length) {
    return { err: new Error("Number of keys in object and schema are not equal"), result: 'invalid' };
  }

  return { err: null, result: 'valid' }
};

const checkKeyUndefined = (key, value, obj) => {
  if (obj[key] === undefined) {
    return { err: new Error(`Required key ${key} doesn't exist`), result: 'invalid' };
  }

  return { err: null, result: 'valid' }
};

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
      response = { err: new Error(`Invalid type of key for size check: ${type}`), result: 'invalid' }
  }
  return response;
};

const checkBlank = (k, v, obj) => {
  let type = typeof obj[k]
  let response;
  switch (type) {
    case 'string':
      response = strings.checkBlank(k, v, obj);
      break;
    case 'array':
      response = arrays.checkBlank(k, v, obj);
      break;
    default:
      response = { err: new Error(`Invalid type of key to be checked as blank: ${type}`), result: 'invalid' }
  }
  return response;
};

const checkAllowed = (k, v, obj) => {
  if (!v.allowed.includes(obj[k])) {
    return { err: new Error(`Value ${obj[k]} of key ${k} is not among allowed values`), result: 'invalid' }
  }
  return { err: null, result: 'valid' }
};

const checkNotAllowed = (k, v, obj) => {
  if (v.notAllowed.includes(obj[k])) {
    return { err: new Error(`Value ${obj[k]} of key ${k} is among notAllowed values`), result: 'invalid' }
  }
  return { err: null, result: 'valid' }
};

module.exports = { checkKeyUndefined, checkNumberOfKeys, checkSize, checkBlank, checkAllowed, checkNotAllowed };
