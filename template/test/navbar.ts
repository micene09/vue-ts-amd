import { expect as ChaiExpect } from "chai";
import { mount as AvoriazMount } from "avoriaz";

define(["chai", "avoriaz", "../src/components/navbar/navbar"],
(Chai: any, Avoriaz: any, Navbar: any) => {

	let mount: typeof AvoriazMount = Avoriaz.mount,
		expect: typeof ChaiExpect = Chai.expect;

	describe('Navbar component', () => {
		let wrapper = mount(Navbar);
		it('renders 2 links', () => {
			expect(wrapper.find('.navbar-nav > li')).to.have.lengthOf(2);
		});
	});
});