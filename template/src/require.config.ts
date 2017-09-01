define([], function() {
	// Extend the default mapping here
	let config = {
		baseUrl: "/",
		paths: {}
	};
	return require.config(config);
});