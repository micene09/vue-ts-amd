import Vue from "vue";
import { Component } from "vue-property-decorator";
import "text!./about.html";
import AboutWidget from "../../components/about-widget/about-widget";

let downloaded = false;

@Component({
	template: require("text!./about.html"),
	components: {
		AboutWidget: AboutWidget
	}
})
export default class AboutComponent extends Vue {
	mounted() {
		if (!downloaded) {
			downloaded = true;
			console.info("About view (and dependencies) downloaded");
		}
	}
}
