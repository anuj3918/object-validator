module.exports = [
	{
		description: 'Checking key not exists mismatch by not passing wrong key name',
		schema: {
			amount: { keyType: [ 'number' ] }
		},
		payload: {
			amounts: '123.45'
		},
		expectedError: 'Required key does not exist in object: amount',
		expectedMessage: 'Key not exists error',
		expectedResult: null
	},
	{
		description: 'Checking key not exists mismatch by passing undefined',
		schema: {
			amount: { keyType: [ 'number' ] }
		},
		payload: {
			amount: undefined
		},
		expectedError: 'Required key does not exist in object: amount',
		expectedMessage: 'Key not exists error',
		expectedResult: null
	},
	{
		description: 'Checking success validation by passing key as null',
		schema: {
			amount: { keyType: [ 'null' ] }
		},
		payload: {
			amount: null
		},
		expectedError: '',
		expectedMessage: 'Validations successful',
		expectedResult: {
			amount: null
		}
	}
];
