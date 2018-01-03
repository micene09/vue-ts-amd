import { Component, Prop, Vue } from "vue-property-decorator";
import "text!./navbar.html";

interface LinkClass {
	name: string;
	path: string;
}

@Component({
	name: "navbar",
	template: require("text!./navbar.html")
})
export default class Navbar extends Vue {

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