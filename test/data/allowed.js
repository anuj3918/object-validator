module.exports = [
    {
        description: "Checking allowed flag with string values",
        schema: {
            name: { keyType: ["string"], allowed: ["india"] }
        },
        payload: {
            name: "anuj"
        },
        expectedError: 'Value passed not among allowed values of key: name',
        expectedMessage: 'Invalid value error',
        expectedResult: null
    },
    {
        description: "Checking allowed flag with boolean values",
        schema: {
            name: { keyType: ["boolean"], allowed: [false] }
        },
        payload: {
            name: true
        },
        expectedError: 'Value passed not among allowed values of key: name',
        expectedMessage: 'Invalid value error',
        expectedResult: null
    },
    {
        description: "Checking allowed flag with object values",
        schema: {
            name: { keyType: ["object"], allowed: [{ a: 1 }] }
        },
        payload: {
            name: {}
        },
        expectedError: 'Value passed not among allowed values of key: name',
        expectedMessage: 'Invalid value error',
        expectedResult: null
    },
    {
        description: "Checking allowed flag with number values",
        schema: {
            name: { keyType: ["number"], allowed: [124, 456] }
        },
        payload: {
            name: 123
        },
        expectedError: 'Value passed not among allowed values of key: name',
        expectedMessage: 'Invalid value error',
        expectedResult: null
    },
    {
        description: "Checking allowed flagccess case with object values",
        schema: {
            name: { keyType: ["object"], allowed: [{ country: "india" }] }
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