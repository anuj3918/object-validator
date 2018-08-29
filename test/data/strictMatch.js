module.exports = [
	{
		description: 'Checking strictObject flag by passing extra keys',
		schema: {
			amount: { keyType: [ 'number' ] }
		},
		payload: {
			amount: 123.45,
			name: 'Anuj'
		},
		expectedError: 'Number of keys in object and schema are not equal',
		expectedMessage: 'Strictmatch object error',
		expectedResult: null
	},
	{
		description: 'Checking strictObject flag by passing extra key as undefined',
		schema: {
			amount: { keyType: [ 'number' ] }
		},
		payload: {
			amount: 123.45,
			name: undefined
		},
		expectedError: 'Number of keys in object and schema are not equal',
		expectedMessage: 'Strictmatch object error',
		expectedResult: null
	},
	{
		description: 'Checking strictObject flag by passing extra key but with same name in nested object',
		schema: {
			amount: { keyType: [ 'number' ] },
			tax: {
				amount: { keyType: [ 'number' ] }
			}
		},
		payload: {
			amount: 123.45,
			tax: {
				amount: 123.45,
				currency: 'inr'
			}
		},
		expectedError: 'Number of keys in object and schema are not equal',
		expectedMessage: 'Strictmatch object error',
		expectedResult: null
	},
	{
		description: 'Checking strictObject flag by passing an extra key as undefined in nested object',
		schema: {
			amount: { keyType: [ 'number' ] },
			name: {
				firstname: { keyType: [ 'string' ] }
			}
		},
		payload: {
			amount: 123.45,
			name: {
				firstname: 'Anuj',
				lastname: undefined
			}
		},
		expectedError: 'Number of keys in object and schema are not equal',
		expectedMessage: 'Strictmatch object error',
		expectedResult: null
	},
	{
		description: 'Checking strictObject flag by passing an extra key in nested object',
		schema: {
			amount: { keyType: [ 'number' ] },
			name: {
				firstname: { keyType: [ 'string' ] }
			}
		},
		payload: {
			amount: 123.45,
			name: {
				firstname: 'Anuj',
				lastname: 'Gupta'
			}
		},
		expectedError: 'Number of keys in object and schema are not equal',
		expectedMessage: 'Strictmatch object error',
		expectedResult: null
	},
	{
		description: 'Checking object validation of partial schema when schema is small but with strictMatch',
		schema: {
			name: { keyType: [ 'string' ] }
		},
		payload: {
			name: 'anuj',
			gender: 'male'
		},
		expectedError: 'Number of keys in object and schema are not equal',
		expectedMessage: 'Strictmatch object error',
		expectedResult: null
	}
];
