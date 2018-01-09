import { expect } from "chai";

describe('Some fake tests', function () {

	it('a fake test that should pass...', function () {
		expect("1").to.be.equal("1");
	});
	it('a fake test that will fail...', function () {
		expect(true).to.be.false;
	});
});