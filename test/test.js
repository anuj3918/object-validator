const expect = require('chai').expect;
const ov = require('../index');

const printer = (counter, response) => {
	console.log("\nTest case: ", counter);
	if (response.err) {
		console.log("err: ", response.err.message);
	} else {
		console.log("err: ", '');
	}

	console.log("msg: ", response.message);
	console.log("result: ", response.result);
}

describe('- Testing keyType mandatory flag', () => {
	const typeData = require('./data/type');
	let i = 1;
	typeData.forEach((tc) => {
		const { description, schema, payload, expectedError, expectedMessage, expectedResult } = tc;
		const response = ov.validate(schema, payload, false);
		// printer(i++, response);
		it(description, function (done) {
			if (response.err) {
				expect(expectedError).to.be.equal(response.err.message);
			}
			expect(expectedMessage).to.be.equal(response.message);
			expect(expectedResult).to.deep.equal(response.result);

			done();
		});
	});
});

describe('- Testing key not exists', () => {
	const notExistsData = require('./data/notExists');
	let i = 1;
	notExistsData.forEach((tc) => {
		const { description, schema, payload, expectedError, expectedMessage, expectedResult } = tc;
		const response = ov.validate(schema, payload, false);
		// printer(i++, response);

		it(description, function (done) {
			if (response.err) {
				expect(expectedError).to.be.equal(response.err.message);
			}
			expect(expectedMessage).to.be.equal(response.message);
			expect(expectedResult).to.deep.equal(response.result);

			done();
		});
	});
});

describe('- Testing noExtraKeys option', () => {
	const noExtraKeysData = require('./data/noExtraKeys');
	let i = 1;
	noExtraKeysData.forEach((tc) => {
		const { description, schema, payload, expectedError, expectedMessage, expectedResult } = tc;
		const response = ov.validate(schema, payload, true);
		// printer(i++, response);

		it(description, function (done) {
			if (response.err) {
				expect(expectedError).to.be.equal(response.err.message);
			}
			expect(expectedMessage).to.be.equal(response.message);
			expect(expectedResult).to.deep.equal(response.result);

			done();
		});
	});
});

describe('- Testing size flag', () => {
	const sizeData = require('./data/size');
	let i = 1;
	sizeData.forEach((tc) => {
		const { description, schema, payload, expectedError, expectedMessage, expectedResult } = tc;
		const response = ov.validate(schema, payload, true);
		// printer(i++, response);

		it(description, function (done) {
			if (response.err) {
				expect(expectedError).to.be.equal(response.err.message);
			}
			expect(expectedMessage).to.be.equal(response.message);
			expect(expectedResult).to.deep.equal(response.result);

			done();
		});
	});
});

describe('- Testing allowed flag', () => {
	const allowedData = require('./data/allowed');
	let i = 1;
	allowedData.forEach((tc) => {
		const { description, schema, payload, expectedError, expectedMessage, expectedResult } = tc;
		const response = ov.validate(schema, payload, true);
		// printer(i++, response);

		it(description, function (done) {
			if (response.err) {
				expect(expectedError).to.be.equal(response.err.message);
			}
			expect(expectedMessage).to.be.equal(response.message);
			expect(expectedResult).to.deep.equal(response.result);

			done();
		});
	});
});

describe('- Testing notAllowed flag', () => {
	const notAllowedData = require('./data/notAllowed');
	let i = 1;
	notAllowedData.forEach((tc) => {
		const { description, schema, payload, expectedError, expectedMessage, expectedResult } = tc;
		const response = ov.validate(schema, payload, true);
		// printer(i++, response);

		it(description, function (done) {
			if (response.err) {
				expect(expectedError).to.be.equal(response.err.message);
			}
			expect(expectedMessage).to.be.equal(response.message);
			expect(expectedResult).to.deep.equal(response.result);

			done();
		});
	});
});