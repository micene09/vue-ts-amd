import { VueConstructor } from "vue";
import { RouterOptions } from "vue-router";
import { INavbar } from "./components/navbar/navbar.interfaces";

define(["./require.config", "vue", "vue-router", "./components/navbar/navbar", "css!./main.css"],
	(config: any, Vue: VueConstructor, VueRouter: any, Navbar: INavbar) => {

	Vue.use(VueRouter);

	new Vue({
		el: "#app-main",
		router: new VueRouter({
			linkActiveClass: "active",
			routes: [
				{
					path: "/",
					component: function(resolve: any) {
						require(["./views/home/home"], resolve);
					}
				},
				{
					path: "/about",
					component: function(resolve: any) {
						require(["./views/about/about"], resolve);
					}
				}
			]
		} as RouterOptions),
		components: {
			navbar: Navbar as any
		}
	});
});


