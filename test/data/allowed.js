module.exports = [
	{
		description: 'Checking allowed flag error by passing allowed as object',
		schema: {
			name: { keyType: [ 'string' ], allowed: {} }
		},
		payload: {
			name: 'anuj'
		},
		expectedError: 'Invalid value of flag -> allowed for key: name',
		expectedMessage: 'Invalid input error',
		expectedResult: null
	},
	{
		description: 'Checking allowed flag with string values',
		schema: {
			name: { keyType: [ 'string' ], allowed: [ 'india' ] }
		},
		payload: {
			name: 'anuj'
		},
		expectedError: 'Value passed not among allowed values of key: name',
		expectedMessage: 'Invalid value error',
		expectedResult: null
	},
	{
		description: 'Checking allowed flag with boolean values',
		schema: {
			name: { keyType: [ 'boolean' ], allowed: [ false ] }
		},
		payload: {
			name: true
		},
		expectedError: 'KeyType not in ["boolean"] for key: name',
		expectedMessage: 'Type mismatch occurred',
		expectedResult: null
	},
	{
		description: 'Checking allowed flag with object values',
		schema: {
			name: { keyType: [ 'object' ], allowed: [ { a: 1 } ] }
		},
		payload: {
			name: {}
		},
		expectedError: 'Value passed not among allowed values of key: name',
		expectedMessage: 'Invalid value error',
		expectedResult: null
	},
	{
		description: 'Checking allowed flag with number values',
		schema: {
			name: { keyType: [ 'number' ], allowed: [ 124, 456 ] }
		},
		payload: {
			name: 123
		},
		expectedError: 'Value passed not among allowed values of key: name',
		expectedMessage: 'Invalid value error',
		expectedResult: null
	},
	{
		description: 'Checking allowed flagccess case with object values',
		schema: {
			name: { keyType: [ 'object' ], allowed: [ { country: 'india' } ] }
		},
		payload: {
			name: { country: 'india' }
		},
		expectedError: '',
		expectedMessage: 'Validations successful',
		expectedResult: {
			name: { country: 'india' }
		}
	},
	{
		description: 'Checking allowed flag success case with number values',
		schema: {
			amount: { keyType: [ 'number' ], allowed: [ 1, 2, 3 ] }
		},
		payload: {
			amount: 2
		},
		expectedError: '',
		expectedMessage: 'Validations successful',
		expectedResult: {
			amount: 2
		}
	},
	{
		description: 'Checking allowed flag success case with array values',
		schema: {
			name: { keyType: [ 'array' ], allowed: [ [ 'india' ] ] }
		},
		payload: {
			name: [ 'india' ]
		},
		expectedError: '',
		expectedMessage: 'Validations successful',
		expectedResult: {
			name: [ 'india' ]
		}
	},
	{
		description: 'Checking allowed flag failure case with array values',
		schema: {
			name: { keyType: [ 'array' ], allowed: [ [ 'china' ] ] }
		},
		payload: {
			name: [ 'india' ]
		},
		expectedError: 'Value passed not among allowed values of key: name',
		expectedMessage: 'Invalid value error',
		expectedResult: null
	}
];
