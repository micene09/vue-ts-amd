import * as Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import "text!./navbar.html";

// This is overkill but typescript is great! :)
class LinkClass {
	name: string;
	path: string;

	constructor(name: string, path: string){
		this.name = name;
		this.path = path;
	}
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

	object: { default: string } = { default: "The default string man!" };

	links: LinkClass[] = [
		new LinkClass("Home", "/"),
		new LinkClass("About", "/about")
	];

	ready(){
		console.log( this.object.default );
	}
}