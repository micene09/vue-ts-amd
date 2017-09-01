<template>
	<div class="widget-text">
		{{text}}
	</div>
</template>
<style>
	.widget-text {
		color: brown;
		font-weight: bold;
	}
</style>
<script>
	define(["vue"], function(Vue) {
		Vue.component("about-widget", {
			template: template,
			data: function() {
				return {
					text: "An about widget content from a .vue file..."
				};
			}
		});
	});
</script>