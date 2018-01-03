import { Vue, Component } from "vue-property-decorator";
import "text!./about.html";
import AboutWidget from "../../components/about-widget/about-widget";

@Component({
	template: require("text!./about.html"),
	components: {
		AboutWidget: AboutWidget
	}
})
export default class AboutComponent extends Vue {
	mounted() {
		console.log("about is mounted!");
	}
}
