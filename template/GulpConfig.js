const config = require('minimist')(process.argv.slice(2));
const path = require("path");
const EventEmitter = require('events');

class GulpConfig extends EventEmitter {
	constructor() {
		super();
		this.gulp = require("gulp");
		this.root = __dirname;

		this.baseUrl = config.baseUrl || ".";
		this.vendorUrl = config.vendorUrl || "/vendor/";

		this.srcFolder = path.resolve(config.srcFolder || "./src");
		this.developFolder = path.resolve(config.developFolder || "./debug");
		this.releaseFolder = path.resolve(config.releaseFolder || "./release");

		this.proxyDev = null//config.proxyDev || "https://localhost:5000";

		this.browserSync =  require('browser-sync').create();
		this.developVendorFolder = path.join( this.developFolder, this.vendorUrl );
		this.releaseVendorFolder = path.join( this.releaseFolder, this.vendorUrl );

		this.sassConfig = require(config.sassConfig || "./sass.json");
		this.sass_bundles = this.sassConfig.bundles.map((bundle) => {
			bundle.entry = path.resolve(bundle.entry);
			bundle.watch = bundle.watch.map(pattern => path.resolve(pattern));
			return bundle;
		});

		this.globPaths = {
			js: "**/*.js",
			css_build: "**/*.css",

			ts: "**/*.ts",
			sass: this.sassConfig.global_watch,

			static_src: path.join( this.srcFolder, "**/*.{html,htm,tpl,hbs,css,vue,png,jpg,ico,json,eot,svg,ttf,woff,woff2,otf}" ),
			static_build: path.join( this.developFolder, "**/*.{html,htm,tpl,hbs,css,vue,png,jpg,ico,json,eot,svg,ttf,woff,woff2,otf}" )
		};
	}
}
module.exports = new GulpConfig();