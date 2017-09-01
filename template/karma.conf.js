module.exports = function (config) {
	config.set({
		basePath: '',
		frameworks: [ 'mocha','requirejs', 'chai', 'karma-typescript'],
		beforeMiddleware: ['src-resource', 'node-modules-map'],
		plugins: [
			'karma-*',
			{ 'middleware:src-resource': ['factory', require('./scripts/karma-mw-src')] },
			{ 'middleware:node-modules-map': ['factory', require('./scripts/karma-mw-nmod')] }
		],
		files: [
			'scripts/karma-main.js',
			{ pattern: 'node_modules/**/!(commonjs).js', included: false },
			{ pattern: 'src/**/*.ts', included: false },
			{ pattern: 'test/**/*.ts', included: false }
		],
		preprocessors: {
			"**/*.ts": ["karma-typescript"]
		},
		karmaTypescriptConfig: {
			compilerOptions: (function(compilerOptions) {
				compilerOptions.target = "ES5";
				return compilerOptions;
			})(require("./tsconfig.json").compilerOptions)
		},
		reporters: ['mocha', 'karma-typescript'],
		port: 9876,
		colors: true,
		logLevel: config.LOG_INFO,
		autoWatch: true,
		browsers: ['PhantomJS'],
		singleRun: false,
		concurrency: Infinity
	});
};