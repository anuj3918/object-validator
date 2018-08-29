const err = new Error('Error occurred');
const date = new Date();

module.exports = [
	{
		description: 'Checking type error by passing empty keyType array',
		schema: {
			amount: { keyType: [] }
		},
		payload: {
			amount: '123.45'
		},
		expectedError: 'KeyType is a mandatory flag and should a non-empty array for key: amount',
		expectedMessage: 'Invalid input error',
		expectedResult: null
	},
	{
		description: 'Checking number type mismatch by passing string',
		schema: {
			amount: { keyType: [ 'number' ] }
		},
		payload: {
			amount: '123.45'
		},
		expectedError: 'KeyType not in ["number"] for key: amount',
		expectedMessage: 'Type mismatch occurred',
		expectedResult: null
	},
	{
		description: 'Checking array type mismatch by passing string',
		schema: {
			cities: { keyType: [ 'array' ] }
		},
		payload: {
			cities: 'India'
		},
		expectedError: 'KeyType not in ["array"] for key: cities',
		expectedMessage: 'Type mismatch occurred',
		expectedResult: null
	},
	{
		description: 'Checking boolean type mismatch by passing string',
		schema: {
			card: { keyType: [ 'boolean' ] }
		},
		payload: {
			card: '4444555566667777'
		},
		expectedError: 'KeyType not in ["boolean"] for key: card',
		expectedMessage: 'Type mismatch occurred',
		expectedResult: null
	},
	{
		description: 'Checking type success case by passing null',
		schema: {
			card: { keyType: [ 'null' ] }
		},
		payload: {
			card: null
		},
		expectedError: '',
		expectedMessage: 'Validations successful',
		expectedResult: {
			card: null
		}
	},
	{
		description: 'Checking string type mismatch by passing array',
		schema: {
			card: { keyType: [ 'string' ] }
		},
		payload: {
			card: [ '4444555566667777' ]
		},
		expectedError: 'KeyType not in ["string"] for key: card',
		expectedMessage: 'Type mismatch occurred',
		expectedResult: null
	},
	{
		description: 'Checking string type mismatch by passing date',
		schema: {
			card: { keyType: [ 'string' ] }
		},
		payload: {
			card: date
		},
		expectedError: 'KeyType not in ["string"] for key: card',
		expectedMessage: 'Type mismatch occurred',
		expectedResult: null
	},
	{
		description: 'Checking date type mismatch by passing object',
		schema: {
			card: { keyType: [ 'date' ] }
		},
		payload: {
			card: { date: 'today' }
		},
		expectedError: 'KeyType not in ["date"] for key: card',
		expectedMessage: 'Type mismatch occurred',
		expectedResult: null
	},
	{
		description: 'Checking error type mismatch by passing object',
		schema: {
			card: { keyType: [ 'error' ] }
		},
		payload: {
			card: {}
		},
		expectedError: 'KeyType not in ["error"] for key: card',
		expectedMessage: 'Type mismatch occurred',
		expectedResult: null
	},
	{
		description: 'Checking object type mismatch by passing err, strictObject: false',
		schema: {
			card: { keyType: [ 'object' ], strictObject: false }
		},
		payload: {
			card: err
		},
		expectedError: '',
		expectedMessage: 'Validations successful',
		expectedResult: {
			card: err
		}
	},
	{
		description: 'Checking valitdation of mulitple keyType',
		schema: {
			card: { keyType: [ 'string', 'error' ] }
		},
		payload: {
			card: '4444555566667777'
		},
		expectedError: '',
		expectedMessage: 'Validations successful',
		expectedResult: {
			card: '4444555566667777'
		}
	},
	{
		description: 'Checking strict object keyType',
		schema: {
			card: { keyType: [ 'object' ] }
		},
		payload: {
			card: new Error('4444555566667777')
		},
		expectedError: 'KeyType not in ["object"] for key: card',
		expectedMessage: 'Type mismatch occurred',
		expectedResult: null
	},
	{
		description: 'Checking any kind of object keyType against array',
		schema: {
			card: { keyType: [ 'object' ], strictObject: false }
		},
		payload: {
			card: [ '4444555566667777' ]
		},
		expectedError: '',
		expectedMessage: 'Validations successful',
		expectedResult: {
			card: [ '4444555566667777' ]
		}
	},
	{
		description: 'Checking any kind of object keyType against null',
		schema: {
			card: { keyType: [ 'object' ], strictObject: false }
		},
		payload: {
			card: null
		},
		expectedError: 'KeyType not in ["object"] for key: card',
		expectedMessage: 'Type mismatch occurred',
		expectedResult: null
	},
	{
		description: 'Checking successful validation with multiple keyType',
		schema: {
			card: { keyType: [ 'object', 'number' ] }
		},
		payload: {
			card: 12
		},
		expectedError: '',
		expectedMessage: 'Validations successful',
		expectedResult: {
			card: 12
		}
	},
	{
		description: 'Checking successful validation with error keyType',
		schema: {
			card: { keyType: [ 'object', 'error' ] }
		},
		payload: {
			card: err
		},
		expectedError: '',
		expectedMessage: 'Validations successful',
		expectedResult: {
			card: err
		}
	},
	{
		description: 'Checking unsuccessful validation with multiple keyType',
		schema: {
			card: { keyType: [ 'object', 'number' ] }
		},
		payload: {
			card: '12'
		},
		expectedError: 'KeyType not in ["object","number"] for key: card',
		expectedMessage: 'Type mismatch occurred',
		expectedResult: null
	}
];
