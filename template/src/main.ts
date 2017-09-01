import "./require.config";
import * as Vue from "vue";
import * as VueRouter from "vue-router";
import Navbar from "./components/navbar/navbar";
import "css!./main.css";

Vue.use(VueRouter);

let AppRouter = new VueRouter({
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
});
export let App: Vue = new Vue({
	router: AppRouter,
	components: {
		navbar: Navbar
	}
});
App.$mount("#app-main");