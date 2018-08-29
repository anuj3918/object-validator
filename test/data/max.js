module.exports = [
	{
		description: 'Checking max flag on invalid keyType',
		schema: {
			amount: { keyType: [ 'string', 'boolean' ], max: 50 }
		},
		payload: {
			amount: '10'
		},
		expectedError: 'Max flag is valid only on number datatype for key: amount',
		expectedMessage: 'Invalid input error',
		expectedResult: null
	},
	{
		description: 'Checking max flag by passing invalid key',
		schema: {
			amount: { keyType: [ 'number' ], max: 50 }
		},
		payload: {
			amount: 'anuj'
		},
		expectedError: 'KeyType not in ["number"] for key: amount',
		expectedMessage: 'Type mismatch occurred',
		expectedResult: null
	},
	{
		description: 'Checking max flag by passing greater value',
		schema: {
			amount: { keyType: [ 'number' ], max: 50 }
		},
		payload: {
			amount: 50.0000001
		},
		expectedError: 'Value passed is greater than max -> 50 of key: amount',
		expectedMessage: 'Value greater than max',
		expectedResult: null
	},
	{
		description: 'Checking max flag by passing wrong datatype of max',
		schema: {
			amount: { keyType: [ 'number' ], max: '50' }
		},
		payload: {
			amount: 50.0000001
		},
		expectedError: 'Max flag can only have number value for key: amount',
		expectedMessage: 'Invalid input error',
		expectedResult: null
	},
	{
		description: 'Checking max flag by passing wrong keytype of max',
		schema: {
			amount: { keyType: [ 'string', 'boolean' ], max: 50 }
		},
		payload: {
			amount: 49
		},
		expectedError: 'KeyType not in ["string","boolean"] for key: amount',
		expectedMessage: 'Type mismatch occurred',
		expectedResult: null
	},
	{
		description: 'Checking max flag success case by passing different type of value',
		schema: {
			amount: { keyType: [ 'string', 'number' ], max: 50 }
		},
		payload: {
			amount: 40
		},
		expectedError: '',
		expectedMessage: 'Validations successful',
		expectedResult: {
			amount: 40
		}
	},
	{
		description: 'Checking max flag success case by passing different datatype of value',
		schema: {
			amount: { keyType: [ 'string', 'number' ], max: 50 }
		},
		payload: {
			amount: '40'
		},
		expectedError: '',
		expectedMessage: 'Validations successful',
		expectedResult: {
			amount: '40'
		}
	}
];
