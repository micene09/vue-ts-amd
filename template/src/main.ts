import { Vue } from "vue-property-decorator";
import * as VueRouter from "vue-router";
import "css!./main.css";
import "./require.config";
import Navbar from "./components/navbar/navbar";

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
	}),
	components: {
		navbar: Navbar
	}
});


