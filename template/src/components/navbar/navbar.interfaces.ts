import { Vue } from "vue/types/vue";

export interface LinkClass {
	name: string;
	path: string;
}
export interface INavbar extends Vue {
	inverted: boolean;
	object: { default: string };
	links: LinkClass[];
}