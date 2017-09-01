const path = require("path");
const EventEmitter = require('events');

class GulpConfig extends EventEmitter {
	constructor() {
		super();
		this.gulp = require("gulp");
		this.root = __dirname;
		this.baseUrl = "/";
		this.vendorUrl = "/vendor/";
		this.browserSync =  require('browser-sync').create();
		this.buildFolder = path.resolve("./build");
		this.releaseFolder = path.resolve("./release");
		this.buildVendorFolder = path.join( this.buildFolder, "/vendor/" );
		this.releaseVendorFolder = path.join( this.releaseFolder, "/vendor/" );
		this.srcFolder = path.resolve("./src");
		this.globPaths = {
			js: path.join( this.srcFolder, "**/*.js" ),
			ts: path.join( this.srcFolder, "**/*.ts" ),
			css_build: path.join( this.buildFolder, "**/*.css" ),
			html_build: path.join( this.buildFolder, "**/*.{html,htm,tpl,hbs}" ),
			html_src: path.join( this.srcFolder, "**/*.{html,htm,tpl,hbs}" ),
			vue_comp_src: path.join( this.srcFolder, "**/*.vue" ),
			scss: path.join( this.srcFolder, "**/*.scss" )
		};
	}
}
let G = module.exports = new GulpConfig();

// Init tasks
if (!process.env.tasksDefined) {
	process.env.tasksDefined = true;
	console.log("Gulpfile.js is defining tasks...");
	console.log();
	require("./scripts/gulp-copy");
	require("./scripts/gulp-ts");
	require("./scripts/gulp-modules-map");
	require("./scripts/gulp-sass");
	require("./scripts/gulp-bs");
	require("./scripts/gulp-release");
	console.log();
}

// Fired from gulp-bs.js
G.on("task-dev-server-ready", function() {

	G.gulp.watch(G.globPaths.scss).on('change', function(file) {
		let sassTasks = require("./scripts/gulp-sass");
		sassTasks.compileSingle(file.path);
	});
	G.browserSync.watch(G.globPaths.css_build, function(event, file) {
		if (event === "change") {
			G.browserSync.reload(file);
		}
	});

	G.gulp.watch(G.globPaths.html_src).on('change', function(file) {
		let copyTasks = require("./scripts/gulp-copy");
		copyTasks.html(function() {
			G.browserSync.reload.call(this);
		});
	});

	G.gulp.watch( G.globPaths.ts ).on('change', function(file) {
		let tsTasks = require("./scripts/gulp-ts");
		tsTasks.compile(function() {});
	});
	G.gulp.watch( G.globPaths.vue_comp_src ).on('change', function(file) {
		let copyTasks = require("./scripts/gulp-copy");
		copyTasks.vueComponents(function() {
			G.browserSync.reload.call(this);
		});
	});

	// Fired from gulp-sass.js
	G.on("task-sass-error", function(err) {
		console.error(err.message);
		G.browserSync.notify(err.message, 10000);
	});
	// Fired from gulp-ts.js
	G.on("task-ts-compiled", function(task) {
		G.browserSync.reload();
	});
});