module.exports = [
	{
		description: 'Checking default flag on key not exists error',
		schema: {
			name: { keyType: [ 'string' ], default: 'anuj' }
		},
		payload: {
			lastname: 'gupta'
		},
		expectedError: '',
		expectedMessage: 'Validations successful',
		expectedResult: {
			name: 'anuj',
			lastname: 'gupta'
		}
	},
	{
		description: 'Checking default flag on keyType error',
		schema: {
			name: { keyType: [ 'string' ], default: 'anuj' }
		},
		payload: {
			name: 10
		},
		expectedError: '',
		expectedMessage: 'Validations successful',
		expectedResult: {
			name: 'anuj'
		}
	},
	{
		description: 'Checking default flag on size error',
		schema: {
			name: { keyType: [ 'string' ], default: 'anuj', size: [ 4 ] }
		},
		payload: {
			name: 'gupta'
		},
		expectedError: '',
		expectedMessage: 'Validations successful',
		expectedResult: {
			name: 'anuj'
		}
	},
	{
		description: 'Checking default flag on allowed error',
		schema: {
			name: { keyType: [ 'string' ], default: 'anuj', allowed: [ 'anuj', 'gupta' ] }
		},
		payload: {
			name: 'kumar'
		},
		expectedError: '',
		expectedMessage: 'Validations successful',
		expectedResult: {
			name: 'anuj'
		}
	},
	{
		description: 'Checking default flag on notAllowed error',
		schema: {
			name: { keyType: [ 'string' ], default: 'anuj', notAllowed: [ 'kumar', 'gupta' ] }
		},
		payload: {
			name: 'kumar'
		},
		expectedError: '',
		expectedMessage: 'Validations successful',
		expectedResult: {
			name: 'anuj'
		}
	},
	{
		description: 'Checking default flag on regExp error',
		schema: {
			name: { keyType: [ 'string' ], default: 'anuj', regExp: new RegExp(/hello/g) }
		},
		payload: {
			name: 'kumar'
		},
		expectedError: '',
		expectedMessage: 'Validations successful',
		expectedResult: {
			name: 'anuj'
		}
	},
	{
		description: 'Checking default flag on range error',
		schema: {
			age: { keyType: [ 'number' ], default: 0, range: [ 0, 10 ] }
		},
		payload: {
			age: 50
		},
		expectedError: '',
		expectedMessage: 'Validations successful',
		expectedResult: {
			age: 0
		}
	},
	{
		description: 'Checking default flag on max error',
		schema: {
			age: { keyType: [ 'number' ], default: 0, max: 10 }
		},
		payload: {
			age: 50
		},
		expectedError: '',
		expectedMessage: 'Validations successful',
		expectedResult: {
			age: 0
		}
	},
	{
		description: 'Checking default flag on min error',
		schema: {
			age: { keyType: [ 'number' ], default: 0, min: 0 }
		},
		payload: {
			age: -10
		},
		expectedError: '',
		expectedMessage: 'Validations successful',
		expectedResult: {
			age: 0
		}
	},
	{
		description: 'Checking default flag on isInteger error',
		schema: {
			age: { keyType: [ 'number' ], default: 0, isInteger: true }
		},
		payload: {
			age: 1.23
		},
		expectedError: '',
		expectedMessage: 'Validations successful',
		expectedResult: {
			age: 0
		}
	},
	{
		description: 'Checking default flag on nested objects',
		schema: {
			name: {
				firstname: { keyType: [ 'string' ], size: [ 4 ], default: 'anuj' }
			},
			age: { keyType: [ 'number' ] },
			balance: { keyType: [ 'number' ], min: 123456, default: 123456 }
		},
		payload: {
			name: {
				firstname: 'gupta'
			},
			age: 25
		},
		expectedError: '',
		expectedMessage: 'Validations successful',
		expectedResult: {
			name: {
				firstname: 'anuj'
			},
			age: 25,
			balance: 123456
		}
	}
];
