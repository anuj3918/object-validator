let err = new Error('Error occurred');

module.exports = [
    {
        description: "Checking number type mismatch by passing string",
        schema: {
            amount: { keyType: ["number"] }
        },
        payload: {
            amount: "123.45"
        },
        expectedError: 'Type of key amount does not match in ["number"]',
        expectedMessage: 'Type mismatch occurred',
        expectedResult: null
    },
    {
        description: "Checking array type mismatch by passing string",
        schema: {
            cities: { keyType: ["array"] },
        },
        payload: {
            cities: "India",
        },
        expectedError: 'Type of key cities does not match in ["array"]',
        expectedMessage: 'Type mismatch occurred',
        expectedResult: null
    },
    {
        description: "Checking boolean type mismatch by passing string",
        schema: {
            card: { keyType: ["boolean"] }
        },
        payload: {
            card: "4444555566667777"
        },
        expectedError: 'Type of key card does not match in ["boolean"]',
        expectedMessage: 'Type mismatch occurred',
        expectedResult: null
    },
    {
        description: "Checking string type mismatch by passing array",
        schema: {
            card: { keyType: ["string"] }
        },
        payload: {
            card: ["4444555566667777"]
        },
        expectedError: 'Type of key card does not match in ["string"]',
        expectedMessage: 'Type mismatch occurred',
        expectedResult: null
    },
    {
        description: "Checking error type mismatch by passing object",
        schema: {
            card: { keyType: ["error"] }
        },
        payload: {
            card: {}
        },
        expectedError: 'Type of key card does not match in ["error"]',
        expectedMessage: 'Type mismatch occurred',
        expectedResult: null
    },
    {
        description: "Checking object type mismatch by passing err, strictObject: false",
        schema: {
            card: { keyType: ["object"], strictObject: false }
        },
        payload: {
            card: err
        },
        expectedError: '',
        expectedMessage: 'Validations successful',
        expectedResult: {
            card: err
        }
    },
    {
        description: "Checking valitdation of mulitple keyType",
        schema: {
            card: { keyType: ["string", "error"] }
        },
        payload: {
            card: "4444555566667777"
        },
        expectedError: '',
        expectedMessage: 'Validations successful',
        expectedResult: {
            card: "4444555566667777"
        }
    },
    {
        description: "Checking strict object keyType",
        schema: {
            card: { keyType: ["object"] }
        },
        payload: {
            card: new Error("4444555566667777")
        },
        expectedError: 'Type of key card does not match in ["object"]',
        expectedMessage: 'Type mismatch occurred',
        expectedResult: null
    },
    {
        description: "Checking any kind of object keyType against array",
        schema: {
            card: { keyType: ["object"], strictObject: false }
        },
        payload: {
            card: ["4444555566667777"]
        },
        expectedError: '',
        expectedMessage: 'Validations successful',
        expectedResult: {
            card: ["4444555566667777"]
        }
    },
    {
        description: "Checking any kind of object keyType against null",
        schema: {
            card: { keyType: ["object"], strictObject: false }
        },
        payload: {
            card: null
        },
        expectedError: 'Type of key card does not match in ["object"]',
        expectedMessage: 'Type mismatch occurred',
        expectedResult: null
    },
    {
        description: "Checking successful validation with multiple keyType",
        schema: {
            card: { keyType: ["object", "number"] }
        },
        payload: {
            card: 12
        },
        expectedError: '',
        expectedMessage: 'Validations successful',
        expectedResult: {
            card: 12
        }
    },
    {
        description: "Checking unsuccessful validation with multiple keyType",
        schema: {
            card: { keyType: ["object", "number"] }
        },
        payload: {
            card: "12"
        },
        expectedError: 'Type of key card does not match in ["object","number"]',
        expectedMessage: 'Type mismatch occurred',
        expectedResult: null
    }
]