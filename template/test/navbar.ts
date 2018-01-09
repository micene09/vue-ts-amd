import { expect } from "chai";
import { mount } from "avoriaz";
import Navbar from "../src/components/navbar/navbar";

describe('Navbar component', function() {
	let wrapper = mount(Navbar);
	it('renders 2 links', function() {
		expect(wrapper.find('.navbar-nav > li')).to.have.lengthOf(2);
	});
});