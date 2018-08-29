module.exports = [
	{
		description: 'Checking initial validation by passing schema as undefined',
		schema: undefined,
		payload: {
			name: 'anuj'
		},
		expectedError: 'Schema passed for validation is not an object',
		expectedMessage: 'Invalid input error',
		expectedResult: null
	},
	{
		description: 'Checking initial validation by passing payload as undefined',
		schema: {
			name: { keyType: [ 'string' ] }
		},
		payload: undefined,
		expectedError: 'Payload passed for validation is not an object',
		expectedMessage: 'Invalid input error',
		expectedResult: null
	}
];
