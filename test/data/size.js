module.exports = [
    {
        description: "Checking size flag by passing wrong length of string",
        schema: {
            name: { keyType: ["string"], size: [10] }
        },
        payload: {
            name: "anuj"
        },
        expectedError: 'Size not in given sizes [10] of key: name',
        expectedMessage: 'Size mismatch error',
        expectedResult: null
    },
    {
        description: "Checking size flag by passing wrong datatype of size",
        schema: {
            name: { keyType: ["string"], size: {} }
        },
        payload: {
            name: "anuj"
        },
        expectedError: 'Invalid value of flag -> size for key: name',
        expectedMessage: 'Invalid input error',
        expectedResult: null
    },
    {
        description: "Checking size flag by passing wrong datatype of key",
        schema: {
            name: { keyType: ["object"], size: [10] }
        },
        payload: {
            name: {}
        },
        expectedError: 'Invalid datatype of key for size check: name',
        expectedMessage: 'Invalid input error',
        expectedResult: null
    },
    {
        description: "Checking size flag array wrong length of string",
        schema: {
            name: { keyType: ["string"], size: [10, 20] }
        },
        payload: {
            name: "anuj"
        },
        expectedError: 'Size not in given sizes [10,20] of key: name',
        expectedMessage: 'Size mismatch error',
        expectedResult: null
    },
    {
        description: "Checking size flag success case",
        schema: {
            name: { keyType: ["string"], size: [4] }
        },
        payload: {
            name: "anuj"
        },
        expectedError: null,
        expectedMessage: 'Validations successful',
        expectedResult: { name: 'anuj' }
    },
]