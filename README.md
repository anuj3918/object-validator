# object-validator
This javascript package validates an object against a specified schema.

## Status
Still under development

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
  id: { keyType: "string", notAllowed: ["", "abc001"] },
  mode: { keyType: "string", allowed: ["card"] },
  amount: { keyType: "number" },
  currency: { keyType: "string", setDefault: true, default: "usd", allowed: ["inr", "usd"] },
  err: { keyType: "error" },
  cardDetails: {
    number: { keyType: "string", size: [12, 16, 20] },
    cvc: { keyType: "string", size: [3] }
  },
  metadata: {
    merchantName: { keyType: "string", setDefault: true, default: "bookmyshow" }
  }
};

const payload_object = {
  id: "abc1234",
  mode: "card",
  amount: 123.45,
  currency: "inr",
  err: new Error("Hello"),
  cardDetails: {
    number: "4444555566667777",
    cvc: '987'
  },
  metadata: {
    merchantName: ''
  }
};

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
     metadata: { merchantName: '' } } }
```

## Details of 'schema' to be passed
Below are the flags to include in the schema
```

```

## Sample CSV file
```
first_name,email
anuj,anuj3918@gmail.com
gupta,anuj.gupta@bookmyshow.com
```
## To do
1. Support for Aerospike.
2. Adding more flexibility while creating connections to cache.
3. Log any failures while inserting.
4. Retry for only the failures keys encountered previously.
5. Load testing metrics to be added in Readme.md
6. Pausing and resuming stream while reconnecting to cache.


## Contributions
You can add any of the above features into this package and create a pull request.
For any further queries, write to anuj3918@gmail.com
