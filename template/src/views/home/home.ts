import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import "text!./home.html";
import "css!./home.css";

let downloaded = false;

@Component({
	template: require("text!./home.html")
})
export default class HomeComponent extends Vue {

	@Prop({ default: "Design Pattern" }) homeName: String;

	helloMsg = "Entirely done using AMD " + this.homeName + "!";

	mounted() {
		if (!downloaded) {
			downloaded = true;
			console.info("Home view (and dependencies) downloaded");
		}
	}
}