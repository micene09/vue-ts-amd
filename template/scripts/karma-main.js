(function () {
	var testFiles = null,
		baseUrl = '',
		requirejsCallback = null;

	// if invoked in karma-runner environment
	if ( typeof window != 'undefined' && window.__karma__ != undefined ) {
		var testFiles = [],
			TEST_REGEXP = /(spec|test)\.js$/i;

			// Karma serves files from '/base', here a fix for requirejs!
		baseUrl = 'http://localhost:9876/base/';
		requirejsCallback = window.__karma__.start;

		// Get a list of all the test files to include
		Object.keys(window.__karma__.files).forEach(function (file) {
			// Filter for all tests files
			if (file.indexOf("/base/test/") === 0) {
				var fixedPath = file.replace(".js", "").replace(/^\/base\//, baseUrl);
				testFiles.push(fixedPath);
			}
		});
	}
	// Entry point first config
	requirejs.config({
		baseUrl: baseUrl,
		// Extend configuration using some test libraries
		paths: {
			'vue': '/base/node_modules/vue/dist/vue.min', // << just to avoid the warns...
			'chai': '/base/node_modules/chai/chai',
			'avoriaz': '/base/node_modules/avoriaz/dist/avoriaz.umd'
		},
		deps: testFiles,
		callback: requirejsCallback
	});
})();