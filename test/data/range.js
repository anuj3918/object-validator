module.exports = [
	{
		description: 'Checking max flag on invalid keyType',
		schema: {
			amount: { keyType: [ 'string', 'boolean' ], range: [ 50, 100 ] }
		},
		payload: {
			amount: '70'
		},
		expectedError: 'Range flag is valid only on number datatype for key: amount',
		expectedMessage: 'Invalid input error',
		expectedResult: null
	},
	{
		description: 'Checking range flag by passing invalid value of flag',
		schema: {
			amount: { keyType: [ 'number' ], range: 50 }
		},
		payload: {
			amount: 55
		},
		expectedError: 'Range flag can only have [min, max] format for key: amount',
		expectedMessage: 'Invalid input error',
		expectedResult: null
	},
	{
		description: 'Checking range flag by passing invalid structure of range',
		schema: {
			amount: { keyType: [ 'string', 'number' ], range: [ 50 ] }
		},
		payload: {
			amount: 55
		},
		expectedError: 'Range flag can only have [min, max] format for key: amount',
		expectedMessage: 'Invalid input error',
		expectedResult: null
	},
	{
		description: 'Checking range flag failure case',
		schema: {
			amount: { keyType: [ 'string', 'number' ], range: [ 50, 60 ] }
		},
		payload: {
			amount: 100
		},
		expectedError: 'Value passed not in range [50,60] of key: amount',
		expectedMessage: 'Value not in range error',
		expectedResult: null
	},
	{
		description: 'Checking range flag success case',
		schema: {
			amount: { keyType: [ 'string', 'number' ], range: [ 50, 60 ] }
		},
		payload: {
			amount: 55
		},
		expectedError: '',
		expectedMessage: 'Validations successful',
		expectedResult: {
			amount: 55
		}
	}
];
