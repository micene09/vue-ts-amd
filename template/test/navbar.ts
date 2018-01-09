import { expect } from "chai";
import { mount } from "avoriaz";
import Navbar from "../src/components/navbar/navbar";

describe('Navbar component', () => {
	let wrapper = mount(Navbar);
	it('renders 2 links', () => {
		expect(wrapper.find('.navbar-nav > li')).to.have.lengthOf(2);
	});
});