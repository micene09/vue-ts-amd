import { VueConstructor } from "vue";
import { Component as DComponent, Prop as DProp } from "vue-property-decorator";
import { INavbar, LinkClass } from "./navbar.interfaces";

define(["vue", "text!./navbar.html", "vue-property-decorator"],
		(Vue: VueConstructor, template: string, VueDecorators: any) => {

	let Component: typeof DComponent = VueDecorators.Component,
		Prop: typeof DProp = VueDecorators.Prop;

	@Component({
		name: "navbar",
		template: template
	})
	class Navbar extends Vue implements INavbar {

		@Prop({
			default: true
		})
		inverted: boolean;

		object = { default: "The default string man!" };

		links: LinkClass[] = [
			{ name: "Home", path: "/" },
			{ name: "About", path: "/about" }
		];

		ready(){
			console.log( this.object.default );
		}
	}

	return Navbar;
});