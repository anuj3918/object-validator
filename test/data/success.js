module.exports = [
	{
		description: 'Checking first level object validation success case',
		schema: {
			name: {
				keyType: [ 'string' ],
				size: [ 4, 5 ],
				allowed: [ 'anuj' ],
				notAllowed: [ '' ]
			}
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
		description: 'Checking nested level object validation success case',
		schema: {
			name: {
				firstname: {
					keyType: [ 'string' ],
					size: [ 4, 5 ],
					allowed: [ 'anuj' ],
					notAllowed: [ '' ]
				}
			},
			age: {
				keyType: [ 'number' ],
				range: [ 1, 100 ],
				max: 110,
				min: 1
			}
		},
		payload: {
			name: {
				firstname: 'anuj'
			},
			age: 25
		},
		expectedError: '',
		expectedMessage: 'Validations successful',
		expectedResult: {
			name: {
				firstname: 'anuj'
			},
			age: 25
		}
	}
];
