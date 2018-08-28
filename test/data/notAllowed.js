module.exports = [
    {
        description: "Checking notAllowed flag with string values",
        schema: {
            name: { keyType: ["string"], notAllowed: ["india"] }
        },
        payload: {
            name: "india"
        },
        expectedError: 'Value passed among notAllowed values of key: name',
        expectedMessage: 'Invalid value error',
        expectedResult: null
    },
    {
        description: "Checking notAllowed flag with boolean values",
        schema: {
            name: { keyType: ["boolean"], notAllowed: [true] }
        },
        payload: {
            name: true
        },
        expectedError: 'Value passed among notAllowed values of key: name',
        expectedMessage: 'Invalid value error',
        expectedResult: null
    },
    {
        description: "Checking notAllowed flag with object values",
        schema: {
            name: { keyType: ["object"], notAllowed: [{}] }
        },
        payload: {
            name: {}
        },
        expectedError: 'Value passed among notAllowed values of key: name',
        expectedMessage: 'Invalid value error',
        expectedResult: null
    },
    {
        description: "Checking notAllowed flag with number values",
        schema: {
            name: { keyType: ["number"], notAllowed: [456, 123] }
        },
        payload: {
            name: 123
        },
        expectedError: 'Value passed among notAllowed values of key: name',
        expectedMessage: 'Invalid value error',
        expectedResult: null
    },
    {
        description: "Checking notAllowed flag with blank string values",
        schema: {
            name: { keyType: ["string"], notAllowed: [''] }
        },
        payload: {
            name: ''
        },
        expectedError: 'Value passed among notAllowed values of key: name',
        expectedMessage: 'Invalid value error',
        expectedResult: null
    },
    {
        description: "Checking notAllowed flag with blank array values",
        schema: {
            name: { keyType: ["array"], notAllowed: [[]] }
        },
        payload: {
            name: []
        },
        expectedError: 'Value passed among notAllowed values of key: name',
        expectedMessage: 'Invalid value error',
        expectedResult: null
    },
    {
        description: "Checking notAllowed flag with array values",
        schema: {
            name: { keyType: ["array"], notAllowed: [[1, 2]] }
        },
        payload: {
            name: [1, 2]
        },
        expectedError: 'Value passed among notAllowed values of key: name',
        expectedMessage: 'Invalid value error',
        expectedResult: null
    },
    {
        description: "Checking notAllowed flag success case with object values",
        schema: {
            name: { keyType: ["object"], notAllowed: [{ country: "bhutan" }] }
        },
        payload: {
            name: { country: "india" }
        },
        expectedError: '',
        expectedMessage: 'Validations successful',
        expectedResult: {
            name: { country: "india" }
        }
    }
]