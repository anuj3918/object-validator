const expect = require('chai').expect;
const ov = require('../index');

const printer = (counter, response) => {
	console.log('\nTest case: ', counter);
	if (response.err) {
		console.log('err: ', response.err.message);
	} else {
		console.log('err: ', '');
	}

	console.log('msg: ', response.message);
	console.log('result: ', response.result);
};

describe('- Testing initial validation', () => {
	const initialData = require('./data/initial');
	let i = 1;
	initialData.forEach((tc) => {
		const { description, schema, payload, expectedError, expectedMessage, expectedResult } = tc;
		const response = ov.validate(schema, payload, {});
		// printer(i++, response);
		it(description, function(done) {
			if (response.err) {
				expect(expectedError).to.be.equal(response.err.message);
			}
			expect(expectedMessage).to.be.equal(response.message);
			expect(expectedResult).to.deep.equal(response.result);

			done();
		});
	});
});

describe('- Testing keyType mandatory flag', () => {
	const typeData = require('./data/type');
	let i = 1;
	typeData.forEach((tc) => {
		const { description, schema, payload, expectedError, expectedMessage, expectedResult } = tc;
		const response = ov.validate(schema, payload, {});
		// printer(i++, response);
		it(description, function(done) {
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
		const response = ov.validate(schema, payload, {});
		// printer(i++, response);

		it(description, function(done) {
			if (response.err) {
				expect(expectedError).to.be.equal(response.err.message);
			}
			expect(expectedMessage).to.be.equal(response.message);
			expect(expectedResult).to.deep.equal(response.result);

			done();
		});
	});
});

describe('- Testing strictMatch flag', () => {
	const strictMatchData = require('./data/strictMatch');
	let i = 1;
	strictMatchData.forEach((tc) => {
		const { description, schema, payload, expectedError, expectedMessage, expectedResult } = tc;
		const response = ov.validate(schema, payload, { strictMatch: true });
		// printer(i++, response);

		it(description, function(done) {
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
		const response = ov.validate(schema, payload, {});
		// printer(i++, response);

		it(description, function(done) {
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
		const response = ov.validate(schema, payload, {});
		// printer(i++, response);

		it(description, function(done) {
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
		const response = ov.validate(schema, payload, {});
		// printer(i++, response);

		it(description, function(done) {
			if (response.err) {
				expect(expectedError).to.be.equal(response.err.message);
			}
			expect(expectedMessage).to.be.equal(response.message);
			expect(expectedResult).to.deep.equal(response.result);

			done();
		});
	});
});

describe('- Testing max flag', () => {
	const maxData = require('./data/max');
	let i = 1;
	maxData.forEach((tc) => {
		const { description, schema, payload, expectedError, expectedMessage, expectedResult } = tc;
		const response = ov.validate(schema, payload, {});
		// printer(i++, response);

		it(description, function(done) {
			if (response.err) {
				expect(expectedError).to.be.equal(response.err.message);
			}
			expect(expectedMessage).to.be.equal(response.message);
			expect(expectedResult).to.deep.equal(response.result);

			done();
		});
	});
});

describe('- Testing min flag', () => {
	const minData = require('./data/min');
	let i = 1;
	minData.forEach((tc) => {
		const { description, schema, payload, expectedError, expectedMessage, expectedResult } = tc;
		const response = ov.validate(schema, payload, {});
		// printer(i++, response);

		it(description, function(done) {
			if (response.err) {
				expect(expectedError).to.be.equal(response.err.message);
			}
			expect(expectedMessage).to.be.equal(response.message);
			expect(expectedResult).to.deep.equal(response.result);

			done();
		});
	});
});

describe('- Testing range flag', () => {
	const rangeData = require('./data/range');
	let i = 1;
	rangeData.forEach((tc) => {
		const { description, schema, payload, expectedError, expectedMessage, expectedResult } = tc;
		const response = ov.validate(schema, payload, {});
		// printer(i++, response);

		it(description, function(done) {
			if (response.err) {
				expect(expectedError).to.be.equal(response.err.message);
			}
			expect(expectedMessage).to.be.equal(response.message);
			expect(expectedResult).to.deep.equal(response.result);

			done();
		});
	});
});

describe('- Testing regExp flag', () => {
	const regExpData = require('./data/regExp');
	let i = 1;
	regExpData.forEach((tc) => {
		const { description, schema, payload, expectedError, expectedMessage, expectedResult } = tc;
		const response = ov.validate(schema, payload, {});
		// printer(i++, response);
		it(description, function(done) {
			if (response.err) {
				expect(expectedError).to.be.equal(response.err.message);
			}
			expect(expectedMessage).to.be.equal(response.message);
			expect(expectedResult).to.deep.equal(response.result);

			done();
		});
	});
});

describe('- Testing default flag', () => {
	const defaultData = require('./data/default');
	let i = 1;
	defaultData.forEach((tc) => {
		const { description, schema, payload, expectedError, expectedMessage, expectedResult } = tc;
		const response = ov.validate(schema, payload, {});
		// printer(i++, response);
		it(description, function(done) {
			if (response.err) {
				expect(expectedError).to.be.equal(response.err.message);
			}
			expect(expectedMessage).to.be.equal(response.message);
			expect(expectedResult).to.deep.equal(response.result);

			done();
		});
	});
});

describe('- Testing matchPartialSchema option', () => {
	const partialSchemaData = require('./data/partialSchema');
	let i = 1;
	partialSchemaData.forEach((tc) => {
		const { description, schema, payload, expectedError, expectedMessage, expectedResult } = tc;
		const response = ov.validate(schema, payload, { matchPartialSchema: true });
		// printer(i++, response);
		it(description, function(done) {
			if (response.err) {
				expect(expectedError).to.be.equal(response.err.message);
			}
			expect(expectedMessage).to.be.equal(response.message);
			expect(expectedResult).to.deep.equal(response.result);

			done();
		});
	});
});

describe('- Testing success cases', () => {
	const successData = require('./data/success');
	let i = 1;
	successData.forEach((tc) => {
		const { description, schema, payload, expectedError, expectedMessage, expectedResult } = tc;
		const response = ov.validate(schema, payload, {});
		// printer(i++, response);
		it(description, function(done) {
			if (response.err) {
				expect(expectedError).to.be.equal(response.err.message);
			}
			expect(expectedMessage).to.be.equal(response.message);
			expect(expectedResult).to.deep.equal(response.result);

			done();
		});
	});
});
