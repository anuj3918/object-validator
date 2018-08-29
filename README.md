kasper - a very simple object schema validator
===========================
[![Build Status](https://travis-ci.org/anuj3918/object-validator.svg?branch=master)](https://travis-ci.org/anuj3918/object-validator)
[![Coverage Status](https://coveralls.io/repos/github/anuj3918/object-validator/badge.svg?branch=master)](https://coveralls.io/github/anuj3918/object-validator?branch=master)

A javascript package which helps you validate your objects against a specified schema.


## Application
This package is useful in validations for cases like:
1. In applications where interaction with external services is present and I/O is in form of objects.
2. In functions where object needs to be validated before executing main function logic.
3. In places where you need to set default values if something mismatches from schema.
4. In places where you mention a big schema for the facade and partially validate your object as it gets filled with keys.

## Installation
```
npm install --save object-validator
```

## Github repository
https://github.com/anuj3918/object-validator.git

## Code example
```
const kasper = require('kasper');

const schema = {
	id: { keyType: [ 'string' ], notAllowed: [ 'abc001' ], regExp: /abc/g },
	mode: { keyType: [ 'string' ], allowed: [ 'card' ] },
	amount: { keyType: [ 'number' ], min: 0, default: 0 },
	currency: { keyType: [ 'string' ], default: 'usd', allowed: [ 'inr', 'usd' ], notAllowed: [ '' ] },
	cardDetails: {
		number: { keyType: [ 'string' ], size: [ 12, 16, 20 ] },
		cvc: { keyType: [ 'string' ], size: [ 3 ] },
		month: { keyType: [ 'number' ], range: [ 1, 12 ] },
		year: { keyType: [ 'number' ], range: [ 2018, 2050 ] }
	},
	errors: { keyType: [ 'error', 'null' ], default: null },
	datetime: { keyType: [ 'date', 'string' ], default: new Date() },
	countries: { keyType: [ 'array' ], allowed: [ [ 'india', 'nepal' ], [ 'england', 'iceland' ] ], notAllowed: [ [] ] }
};

const payload = {
	id: 'abc1234',
	mode: 'card',
	amount: 123.45,
	currency: '',
	cardDetails: {
		number: '4444555566667777',
		cvc: '987'
	},
	errors: undefined
};

const options = {
	matchPartialSchema: true,
	strictMatch: false,
	setDefaultValues: true
};

// You can omit the last parameter i.e. options if you want to use default options only
const response = kasper.validate(schema, payload, options);
console.log(response);

// Output
let output = {
	err: null,
	message: 'Validations successful',
	result: {
		id: 'abc1234',
		mode: 'card',
		amount: 123.45,
		currency: 'usd',
		cardDetails: { number: '4444555566667777', cvc: '987' },
		errors: null
	}
};
```

## `Schema flags` with decsription
| Flag  | Value   | Description |
|-----------|-----------|-------------|
| **keyType**   | `['number', 'boolean', 'string', 'object', 'array', 'null', 'date', 'error']` | **mandatory** Specify the types for key as an array |
| allowed   | `['india', 'us', 'china']` (array of values) | Checks if value of key is among these values |
| notAllowed   | `['', 'delhi', 'mumbai' ]` (array of values) | Checks if value of key is not among these values |
| size   | `[1,3,5]` (Array of integers) | Checks if length of string/array is in one of the given sizes. Use only with string/array |
| regExp   | `/hello/g` (a valid regular exp) | Checks if string matches a regular expression |
| max   | `100` (any numerical value) | Checks if number value is not greater than max |
| min   | `1` (any numerical value) | Checks if number value is not less than min |
| range   | `[1, 10]` (array of min, max) | Checks if number lies in the specified range (both limits inclusive) |
| default   | `"Narendra Modi"` (any type of value) | Sets a default value to key if error encountered while validating this key |
| strictObject   | `false` (boolean) | If false, treats date/error/null/array as type 'object' (javascript native behaviour) |

## `Options` with decsription
| Flag  | Default Value   | Description |
|-----------|-----------|-------------|
| matchPartialSchema   | false | If true, checks only the keys present in object with that in schema |
| strictMatch   | false | If true, checks if object does not contain any extra keys than those mentioned in schema |
| setDefaultValues   | true | If false, does not set default value to a key even if default value is specified |

## Contributions
You can add any of the above features into this package and create a pull request.
For any further queries, write to anuj3918@gmail.com

## Keywords
object validation schema model external nodejs javascript typescript flow datatype type-validation kasper casper
