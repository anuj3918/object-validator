module.exports = [
	{
		description: 'Checking isInteger flag on invalid keyType',
		schema: {
			amount: { keyType: [ 'string', 'boolean' ], isInteger: true }
		},
		payload: {
			amount: '100'
		},
		expectedError: 'IsInteger flag is valid only on number datatype for key: amount',
		expectedMessage: 'Invalid input error',
		expectedResult: null
	},
	{
		description: 'Checking isInteger flag by passing invalid key',
		schema: {
			amount: { keyType: [ 'number' ], isInteger: true }
		},
		payload: {
			amount: 'anuj'
		},
		expectedError: 'KeyType not in ["number"] for key: amount',
		expectedMessage: 'Type mismatch occurred',
		expectedResult: null
	},
	{
		description: 'Checking isInteger flag by passing float value',
		schema: {
			amount: { keyType: [ 'number' ], isInteger: true }
		},
		payload: {
			amount: 49.999999
		},
		expectedError: 'Value passed -> 49.999999 is not an integer of key: amount',
		expectedMessage: 'Value not integer error',
		expectedResult: null
	},
	{
		description: 'Checking isInteger flag by passing wrong datatype of isInteger',
		schema: {
			amount: { keyType: [ 'number' ], isInteger: 'true' }
		},
		payload: {
			amount: 50.0000001
		},
		expectedError: 'IsInteger flag can only have boolean value for key: amount',
		expectedMessage: 'Invalid input error',
		expectedResult: null
	},
	{
		description: 'Checking isInteger flag success case by passing multiple keyTypes',
		schema: {
			amount: { keyType: [ 'string', 'number' ], isInteger: true }
		},
		payload: {
			amount: 60
		},
		expectedError: '',
		expectedMessage: 'Validations successful',
		expectedResult: {
			amount: 60
		}
	},
	{
		description: 'Checking isInteger flag success case by passing multiple keyTypes and not number value',
		schema: {
			amount: { keyType: [ 'string', 'number' ], isInteger: true }
		},
		payload: {
			amount: '60'
		},
		expectedError: '',
		expectedMessage: 'Validations successful',
		expectedResult: {
			amount: '60'
		}
	}
];
