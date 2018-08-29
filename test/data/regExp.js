module.exports = [
	{
		description: 'Checking regExp flag by passing invalid regExp',
		schema: {
			name: { keyType: [ 'string' ], regExp: 'hello' }
		},
		payload: {
			name: 'anuj'
		},
		expectedError: 'Value of flag -> regExp not a valid regular expression for key: name',
		expectedMessage: 'Invalid input error',
		expectedResult: null
	},
	{
		description: 'Checking regExp flag by passing invalid keyType',
		schema: {
			name: { keyType: [ 'number' ], regExp: new RegExp(/Hello/g) }
		},
		payload: {
			name: 10
		},
		expectedError: 'Invalid keyType for flag -> matchRegExp for key: name',
		expectedMessage: 'Invalid input error',
		expectedResult: null
	},
	{
		description: 'Checking regExp flag by passing valid regExp and unmatching string',
		schema: {
			greet: { keyType: [ 'string' ], regExp: new RegExp(/Hello/g) }
		},
		payload: {
			greet: 'Good Morning'
		},
		expectedError: 'Value does not match regExp -> /Hello/g of key: greet',
		expectedMessage: 'RegExp mismatch error',
		expectedResult: null
	},
	{
		description: 'Checking regExp flag by passing valid regExp and matching string',
		schema: {
			greet: { keyType: [ 'string' ], regExp: new RegExp(/Hello/g) }
		},
		payload: {
			greet: 'Hello anuj'
		},
		expectedError: '',
		expectedMessage: 'Validations successful',
		expectedResult: {
			greet: 'Hello anuj'
		}
	},
	{
		description: 'Checking regExp flag by passing valid regExp and not a string',
		schema: {
			greet: { keyType: [ 'number', 'string' ], regExp: new RegExp(/Hello/g) }
		},
		payload: {
			greet: 1
		},
		expectedError: '',
		expectedMessage: 'Validations successful',
		expectedResult: {
			greet: 1
		}
	}
];
