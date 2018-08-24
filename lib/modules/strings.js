const checkBlank = (k, v, obj) => {
  if (!obj[k].length) {
    return { err: new Error(`Key ${k} of type ${typeof obj[k]} is blank`), result: 'invalid' };
  }

  return { err: null, result: 'valid' };
};

const checkSize = (k, v, obj) => {
  if (!v.size.includes(obj[k].length)) {
    return { err: new Error(`Size mismatch of key ${k} : ${obj[k]}`), result: 'invalid' };
  }

  return { err: null, result: 'valid' };
};

module.exports = { checkBlank, checkSize };
