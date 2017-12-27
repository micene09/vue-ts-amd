import { VueConstructor } from "vue";
import { Component as DComponent, Prop as DProp } from "vue-property-decorator";

define(["vue", "text!./home.html", "vue-property-decorator", "css!./home.css"],
		(Vue: VueConstructor, template: string, VueDecorators: any) => {

	let Component: typeof DComponent = VueDecorators.Component,
		Prop: typeof DProp = VueDecorators.Prop;

	@Component({
		template: template
	})
	class HomeComponent extends Vue {

		@Prop({ default: "Design Pattern" })
		homeName: String;

		helloMsg = "Entirely done using AMD "
			+ this.homeName + "!";

		mounted() {
			console.log("home is mounted!");
		}
	}
	return HomeComponent;
});