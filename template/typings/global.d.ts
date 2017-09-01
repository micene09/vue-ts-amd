declare module "*.html" {
	const content: string;
	export default content;
}
declare module "text!*" {
	var html: string;
	export default html;
}