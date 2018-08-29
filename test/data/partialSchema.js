module.exports = [
	{
		description: 'Checking first level object validation of partial schema',
		schema: {
			name: { keyType: [ 'string' ] },
			age: { keyType: [ 'number' ] },
			date: { keyType: [ 'date' ] }
		},
		payload: {
			name: 'anuj'
		},
		expectedError: '',
		expectedMessage: 'Validations successful',
		expectedResult: {
			name: 'anuj'
		}
	},
	{
		description: 'Checking empty object validation of partial schema',
		schema: {
			name: { keyType: [ 'string' ] },
			age: { keyType: [ 'number' ] },
			date: { keyType: [ 'date' ] }
		},
		payload: {},
		expectedError: 'No valid fields in passed params, could not create partial schema',
		expectedMessage: 'Partial schema creation error',
		expectedResult: null
	},
	{
		description: 'Checking nested level object validation of partial schema',
		schema: {
			name: {
				firstname: { keyType: [ 'string' ] },
				lastname: { keyType: [ 'string' ] },
				secondname: {
					firstname: { keyType: [ 'string' ] },
					lastname: { keyType: [ 'string' ] }
				}
			},
			age: { keyType: [ 'number' ] },
			date: { keyType: [ 'date' ] }
		},
		payload: {
			name: {
				firstname: 'anuj',
				lastname: 'gupta',
				secondname: {
					firstname: 'kalp',
					lastname: 'sampat'
				}
			},
			age: 25
		},
		expectedError: '',
		expectedMessage: 'Validations successful',
		expectedResult: {
			name: {
				firstname: 'anuj',
				lastname: 'gupta',
				secondname: {
					firstname: 'kalp',
					lastname: 'sampat'
				}
			},
			age: 25
		}
	}
];
