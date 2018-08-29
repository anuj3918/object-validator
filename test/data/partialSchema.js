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
		expectedMessage: 'Validations successful',
		expectedResult: {}
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
	},
	{
		description: 'Checking object validation of partial schema when schema is small',
		schema: {
			name: { keyType: [ 'string' ] },
			age: { keyType: [ 'number' ] }
		},
		payload: {
			name: 'anuj',
			gender: 'male'
		},
		expectedError: '',
		expectedMessage: 'Validations successful',
		expectedResult: {
			name: 'anuj',
			gender: 'male'
		}
	}
];
