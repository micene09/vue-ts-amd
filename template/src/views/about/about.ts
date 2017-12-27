import { VueConstructor } from "vue";
import { Vue } from "vue/types/vue";
import { Component as DComponent } from "vue-property-decorator";

define(["vue", "text!./about.html", "vue-property-decorator", "../../components/about-widget/about-widget"],
		(Vue: VueConstructor, template: string, VueDecorators: any, AboutWidget: VueConstructor) => {

	let Component: typeof DComponent = VueDecorators.Component;

	@Component({
		template: template,
		components: {
			AboutWidget: AboutWidget
		}
	})
	class AboutComponent extends Vue {
		mounted() {
			console.log("about is mounted!");
		}
	}

	return AboutComponent;
});

