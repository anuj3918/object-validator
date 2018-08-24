# object-validator
This javascript package validates an object against a specified schema.

## Application
This package is very useful in validations for cases like:
1. In applications where interaction with external services is present and IO is in form of objects.
2. In functions where object needs to be validated before inserting it in database.

## Why ?
1. In a critical system where we want to prevent null/undefined/invalid entries against columns in our database, we can validate our object before insertion.
2. If a function takes an object as argument, it is good to validate the object before running the code to avoid runtime errors later on.
3. External services might change the data contract (input/output) and this might lead to runtime code failures.

## Installation
```
npm install --save object-validator
```

## Github repository
https://github.com/anuj3918/object-validator.git

## Code example
```
const ov = require("./index");

const schema = {
  id: { keyType: "string", checkBlank: true, notAllowed: ["abc001"] },
  mode: { keyType: "string", allowed: ["card"] },
  amount: { keyType: "number" },
  currency: { keyType: "string", setDefault: true, default: "usd", allowed: ["inr", "usd"] },
  cardDetails: {
    number: { keyType: "string", size: [12, 16, 20] },
    cvc: { keyType: "string", size: [3] }
  },
  metadata: {
    merchantName: { keyType: "string", checkBlank: true, setDefault: true, default: "bookmyshow" }
  }
};

const payload_object = {
  id: "abc1234",
  mode: "card",
  amount: 123.45,
  currency: "inr",
  cardDetails: {
    number: "4444555566667777",
    cvc: '987'
  },
  metadata: {
    merchantName: ''
  }
};

// The third argument is 'noExtraKeys'. If false, validator will ignore any extra keys present in payload which are not present in schema. If true, validator will throw error if any extra keys in payload.
const response = ov.validate(schema, payload, false);
console.log(response);

Output =>
{ err: null,
  result:
   { id: 'abc1234',
     mode: 'card',
     amount: 123.45,
     currency: 'inr',
     cardDetails: { number: '4444555566667777', cvc: '987' },
     metadata: { merchantName: 'bookmyshow' } } }
```

## `Schema flags` with decsription
| Flag  | Value   | Description |
|-----------|-----------|-------------|
| keyType   | **mandatory** 'number', 'string', 'object', 'array', 'null' | Specify the datatype of key |
| allowed   | ['india', 'us', 'china'] (Array of values) | Checks if value of key is among these values |
| notAllowed   | ['delhi', 'mumbai' ] (Array of values) | Checks if value of key is not among these values |
| size   | [1,3,5] (Array of integers) | Checks if length of string/array is in one of the given sizes. To be used only with string/array else error |
| checkBlank   | true/false | Checks if string/array is empty. To be used only with string/array else error |
| setDefault   | true/false | Whether to set a default value to key if error encountered while validating this key |
| default   | "Narendra Modi" (any type of value) | Sets a default value to key if error encountered while validating this key |

Note: Try to use default flag only when setDefault is set to true for the key. It will not throw an error but just a good practice.

## To do
1. More but simple features for numbers.
2. Test cases.
3. Aggregate all errors and return error as an array.


## Contributions
You can add any of the above features into this package and create a pull request.
For any further queries, write to anuj3918@gmail.com

## Keywords
object validation schema model external nodejs javascript typescript flow datatype type-validation
