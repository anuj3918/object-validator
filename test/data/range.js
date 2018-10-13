module.exports = [
	{
		description: 'Checking max flag on invalid keyType',
		schema: {
			amount: { keyType: [ 'string', 'boolean' ], range: [ 50, 100 ] }
		},
		payload: {
			amount: '70'
		},
		expectedError: 'Range flag is valid only on number or date datatype for key: amount',
		expectedMessage: 'Invalid input error',
		expectedResult: null
	},
	{
		description: 'Checking max flag with different keyType',
		schema: {
			amount: { keyType: [ 'string', 'number' ], range: [ 50, 100 ] }
		},
		payload: {
			amount: '70'
		},
		expectedError: '',
		expectedMessage: 'Validations successful',
		expectedResult: {
			amount: '70'
		}
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
	},
	{
		description: 'Date: KeyType cannot be string for range',
		schema: {
			birthday: { keyType: [ 'string' ], range: [ '01/01/1995 00:00:00', '01/01/2020 00:00:00'] }
		},
		payload: {
			birthday: new Date() 
		},
		expectedError: 'KeyType not in ["string"] for key: birthday',
		expectedMessage: 'Type mismatch occurred',
		expectedResult: null
	},
	{
		description: 'Date: KeyValue datatype invalid',
		schema: {
			birthday: { keyType: [ 'date' ], range: [ '01/01/1995 00:00:00', '01/01/2020 00:00:00'] }
		},
		payload: {
			birthday: 'Hello' 
		},
		expectedError: 'KeyType not in ["date"] for key: birthday',
		expectedMessage: 'Type mismatch occurred',
		expectedResult: null
	},
	{
		description: 'Date: Minimum in range datatype i.e. range[0] is invalid',
		schema: {
			birthday: { keyType: [ 'date' ], range: [5, '01/01/2050 00:00:00'] }
		},
		payload: {
			birthday: new Date()
		},
		expectedError: 'Range flag can only have date of format DD/MM/YYYY HH:mm:ss for key: birthday',
		expectedMessage: 'Invalid input error',
		expectedResult: null
	},
	{
		description: 'Date: Maximum in range datatype i.e. range[1] is invalid',
		schema: {
			birthday: { keyType: [ 'date' ], range: ['01/01/1995 00:00:00', 'Hello'] }
		},
		payload: {
			birthday: new Date()
		},
		expectedError: 'Range flag can only have date of format DD/MM/YYYY HH:mm:ss for key: birthday',
		expectedMessage: 'Invalid input error',
		expectedResult: null
	},
	{
		description: 'Date: Date specified is not in the range',
		schema: {
			birthday: { keyType: [ 'date' ], range: ['01/01/2045 00:00:00', '01/01/2050 00:00:00'] }
		},
		payload: {
			birthday: new Date()
		},
		expectedError: 'Value passed not in range ["01/01/2045 00:00:00","01/01/2050 00:00:00"] of key: birthday',
		expectedMessage: 'Value not in range error',
		expectedResult: null
	},
	{
		description: 'Date: Date specified is in the range',
		schema: {
			birthday: { keyType: [ 'date' ], range: ['01/01/1995 00:00:00', '01/01/2050 00:00:00'] }
		},
		payload: {
			birthday: new Date()
		},
		expectedError: '',
		expectedMessage: 'Validations successful',
		expectedResult: {
			birthday: new Date(),
		}
	}
];
