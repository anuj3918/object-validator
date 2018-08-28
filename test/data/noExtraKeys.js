module.exports = [
    {
        description: "Checking noExtraKeys option by passing extra keys",
        schema: {
            amount: { keyType: ["number"] }
        },
        payload: {
            amount: 123.45,
            name: "Anuj"
        },
        expectedError: 'Number of keys in object and schema are not equal',
        expectedMessage: 'ExtraKeys present in object error',
        expectedResult: null
    },
    {
        description: "Checking noExtraKeys option by passing extra key as undefined",
        schema: {
            amount: { keyType: ["number"] }
        },
        payload: {
            amount: 123.45,
            name: undefined
        },
        expectedError: 'Number of keys in object and schema are not equal',
        expectedMessage: 'ExtraKeys present in object error',
        expectedResult: null
    },
    {
        description: "Checking noExtraKeys option by passing extra key but with same name in nested object",
        schema: {
            amount: { keyType: ["number"] },
            tax: {
                amount: { keyType: ["number"] }
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
        expectedMessage: 'ExtraKeys present in object error',
        expectedResult: null
    },
    {
        description: "Checking noExtraKeys option by passing an extra key as undefined in nested object",
        schema: {
            amount: { keyType: ["number"] },
            name: {
                firstname: { keyType: ["string"] }
            }
        },
        payload: {
            amount: 123.45,
            name: {
                firstname: "Anuj",
                lastname: undefined,
            }
        },
        expectedError: 'Number of keys in object and schema are not equal',
        expectedMessage: 'ExtraKeys present in object error',
        expectedResult: null
    },
    {
        description: "Checking noExtraKeys option by passing an extra key in nested object",
        schema: {
            amount: { keyType: ["number"] },
            name: {
                firstname: { keyType: ["string"] }
            }
        },
        payload: {
            amount: 123.45,
            name: {
                firstname: "Anuj",
                lastname: "Gupta",
            }
        },
        expectedError: 'Number of keys in object and schema are not equal',
        expectedMessage: 'ExtraKeys present in object error',
        expectedResult: null
    }
]