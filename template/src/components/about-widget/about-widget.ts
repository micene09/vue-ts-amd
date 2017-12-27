import { VueConstructor } from "vue";
import { Component as DComponent } from "vue-property-decorator";

define(["vue", "text!./about-widget.html", "vue-property-decorator", "css!./about-widget.css"],
		(Vue: VueConstructor, template: string, VueDecorators: any) => {

	let Component: typeof DComponent = VueDecorators.Component;

	@Component({
		name: "about-widget",
		template: template
	})
	class AboutWidget extends Vue {
		widgetText: string = "Content by your about-widget.ts";
	}
	return AboutWidget;
});