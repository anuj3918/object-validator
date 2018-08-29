module.exports = [
	{
		description: 'Checking min flag on invalid keyType',
		schema: {
			amount: { keyType: [ 'string', 'boolean' ], min: 50 }
		},
		payload: {
			amount: '100'
		},
		expectedError: 'Min flag is valid only on number datatype for key: amount',
		expectedMessage: 'Invalid input error',
		expectedResult: null
	},
	{
		description: 'Checking min flag by passing invalid key',
		schema: {
			amount: { keyType: [ 'number' ], min: 50 }
		},
		payload: {
			amount: 'anuj'
		},
		expectedError: 'KeyType not in ["number"] for key: amount',
		expectedMessage: 'Type mismatch occurred',
		expectedResult: null
	},
	{
		description: 'Checking min flag by passing lower value',
		schema: {
			amount: { keyType: [ 'number' ], min: 50 }
		},
		payload: {
			amount: 49.999999
		},
		expectedError: 'Value passed is less than min -> 50 of key: amount',
		expectedMessage: 'Value less than min',
		expectedResult: null
	},
	{
		description: 'Checking min flag by passing wrong datatype of min',
		schema: {
			amount: { keyType: [ 'number' ], min: '50' }
		},
		payload: {
			amount: 50.0000001
		},
		expectedError: 'Min flag can only have number value for key: amount',
		expectedMessage: 'Invalid input error',
		expectedResult: null
	},
	{
		description: 'Checking min flag by passing wrong keytype of min',
		schema: {
			amount: { keyType: [ 'string', 'boolean' ], min: 50 }
		},
		payload: {
			amount: 49
		},
		expectedError: 'KeyType not in ["string","boolean"] for key: amount',
		expectedMessage: 'Type mismatch occurred',
		expectedResult: null
	},
	{
		description: 'Checking min flag success case by passing different type of value',
		schema: {
			amount: { keyType: [ 'string', 'number' ], min: 50 }
		},
		payload: {
			amount: 60
		},
		expectedError: '',
		expectedMessage: 'Validations successful',
		expectedResult: {
			amount: 60
		}
	}
];
