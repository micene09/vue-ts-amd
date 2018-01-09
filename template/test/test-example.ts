import { expect } from "chai";

describe('Some fake tests', () => {

	it('a fake test that should pass...', () => {
		expect("1").to.be.equal("1");
	});
	it('a fake test that will fail...', () => {
		expect(true).to.be.false;
	});
});