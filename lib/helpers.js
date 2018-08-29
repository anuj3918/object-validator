const _ = require('lodash');
const flatten = require('flat');

const getKeysWithEndpoints = (passedSchema, stopFields) => {
	//  make a copy of original schema that was passed
	let schema = Object.assign({}, passedSchema);
	// get all the keys at the parent level, use keys like a queue
	let keys = Object.keys(schema);

	//  initialise a final array that will contain all the parent and nested keys
	let allKeys = {};

	//  loop till we finish analysing any key(parent+nested) whose value is also an object
	while (keys.length) {
		//  take the first element of queue
		let key = keys[0];

		//  For key = 'key1' keyTree will contain ['key1']
		//  For key = 'key1.key2' keyTree will contain ['key1', 'key2']
		let keyTree = key.split('.');

		//  we now move from parent to child keys, storing the value in tempValue
		let tempValue = schema[keyTree[0]];
		for (let i = 1; i < keyTree.length; i += 1) {
			let nestedKey = keyTree[i];
			tempValue = tempValue[nestedKey];
		}

		// tempValue = { key2: { type: 'string', default: '' }}
		// if tempValue is an object and not an array/error/string
		// then we need to analyse keys inside tempValue as well
		let isObj = _.isObject(tempValue);
		let isValidObj = !(_.isArray(tempValue) || _.isError(tempValue) || _.isString(tempValue));

		let endpointReached = false;
		// any key having value null, undefined, error, string, array will not be analysed further
		if (isObj && isValidObj) {
			//  extract keys found inside tempValue
			let keysInTempObj = Object.keys(tempValue).sort();

			let keysNotMatched = _.difference(stopFields, keysInTempObj);

			if (keysNotMatched.length === 0) {
				endpointReached = true;
			}

			// if we don't find a key named 'default' inside tempValue, then tempValue is nested
			if (keysInTempObj.length && keysNotMatched.length > 0) {
				//  append parentKeyName to childKey
				keysInTempObj = keysInTempObj.map((childKey) => key + '.' + childKey);

				// concat all parentKey.childKeys to keys for analysing later
				keys = keys.concat(keysInTempObj);
			}
		}

		// push the analysed key to allKeys
		if (endpointReached) {
			allKeys[key] = tempValue;
		} else {
			allKeys[key] = 0;
		}

		// dequeue one element from keys
		keys.splice(0, 1);
	}
	return allKeys;
};

const getPartialSchema = (schema = {}, payload = {}) => {
	var schemaKeysWithEndpoints = getKeysWithEndpoints(schema, [ 'keyType' ]);

	// get all the keys at the parent level, use keys like a queue
	let keys = Object.keys(payload);

	//  initialise a final array that will contain all the parent and nested keys
	let allKeys = {};

	//  loop till we finish analysing any key(parent+nested) whose value is also an object
	while (keys.length) {
		//  take the first element of queue
		let key = keys[0];

		if (_.has(schemaKeysWithEndpoints, key) && schemaKeysWithEndpoints[key] === 0) {
			//  For key = 'key1' keyTree will contain ['key1']
			//  For key = 'key1.key2' keyTree will contain ['key1', 'key2']
			let keyTree = key.split('.');

			//  we now move from parent to child keys, storing the value in tempValue
			let tempValue = payload[keyTree[0]];
			for (let i = 1; i < keyTree.length; i += 1) {
				let nestedKey = keyTree[i];
				tempValue = tempValue[nestedKey];
			}

			let keysInTempObj = Object.keys(tempValue);
			keysInTempObj = keysInTempObj.map((childKey) => key + '.' + childKey);
			keys = keys.concat(keysInTempObj);

			keys.splice(0, 1);
		} else {
			allKeys[key] = schemaKeysWithEndpoints[key];
			keys.splice(0, 1);
		}
	}
	if (_.size(allKeys) > 0) {
		return {
			err: null,
			result: flatten.unflatten(allKeys)
		};
	}
	return {
		err: new Error('No valid fields in passed params, could not create partial schema'),
		result: null
	};
};

module.exports = { getKeysWithEndpoints, getPartialSchema };
