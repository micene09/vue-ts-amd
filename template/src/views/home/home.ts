import * as Vue from "vue";
import { Prop, Component } from "vue-property-decorator";
import "text!./home.html";
import "css!./home.css";

@Component({
	template: require("text!./home.html")
})
export default class HomeComponent extends Vue {
	@Prop({ default: "Design Pattern" })
	homeName: String;

	helloMsg = "Entirely done using AMD "
		+ this.homeName + "!";

	mounted() {
		console.log("home is mounted!");
	}
}