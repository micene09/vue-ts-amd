import * as Vue from "vue";
import Component from "vue-class-component";
import "text!./about.html";
import "require-vuejs!/components/about-widget";

@Component({
	template: require("text!./about.html")
})
export default class AboutComponent extends Vue {
	mounted() {
		console.log("about is mounted!");
	}
}