import Vue from "vue";
import VueRouter from "vue-router";
import "css!./main.css";
import "./require.config";

Vue.use(VueRouter);

new Vue({
	el: "#app-main",
	router: new VueRouter({
		linkActiveClass: "active",
		mode: "history",
		base: "/",
		routes: [
			{
				path: "/",
				component: () => import("./views/home/home")
			},
			{
				path: "/about",
				component: () => import("./views/about/about")
			}
		]
	}),
	components: {
		navbar: () => import("./components/navbar/navbar")
	}
});


