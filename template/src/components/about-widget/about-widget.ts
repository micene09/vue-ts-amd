import Vue from "vue";
import { Component } from "vue-property-decorator";
import "text!./about-widget.html";
import "css!./about-widget.css";

@Component({
	name: "about-widget",
	template: require("text!./about-widget.html")
})
export default class AboutWidget extends Vue {
	widgetText: string = "Content by your about-widget.ts";
}