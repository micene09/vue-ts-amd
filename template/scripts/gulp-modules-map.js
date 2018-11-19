var G = require("../GulpConfig"),
	path = require("path"),
	fs = require('fs'),
	glob = require('glob'),
	flatten = require('gulp-flatten'),
	pump = require("pump"),
	rename = require("gulp-rename"),
	_ = require('lodash'),
	templateFile = path.join(__dirname, "gulp-modules-map.tpl"),
	template = _.template(fs.readFileSync(templateFile)),
	modulesReference = [],
	copyModules = (mode) => {
		modulesReference = [];
		var rjsConfig = require("../modules.json"),
			dest = G.gulp.dest(mode === "dev" ? G.developVendorFolder : G.releaseVendorFolder),
			scripts = [];
		for (var moduleName in rjsConfig) {
			var m = rjsConfig[moduleName],
				script = mode === "dev" ? (m.max || m.min) : (m.min || m.max),
				filename = path.basename(script);
			scripts.push(path.join(G.root, script));
			modulesReference.push({
				moduleName: moduleName,
				originalPath: script,
				filename: filename
			});
		}

		return pump([
			G.gulp.src(scripts, { base: G.root, allowEmpty: true }),
			flatten(),
			rename(function (p) {
				let mrefs = _.filter(modulesReference, x => x.filename === (p.basename + p.extname)),
					mref = mrefs[0];

				if (!mref) throw new Error("Module not found: '" + mref.moduleName + "'");
				if (mrefs.length > 1) throw new Error("Module basename conflict for module: '" + mref.moduleName + "'");

				p.basename = mref.moduleName.split("/").join("-");
				mref.moduleFile = p.basename;
			}),
			dest
		], function(err) {
			if (err) throw err;
		});
	},
	mapGenerate = (done, mode) => {
		let finalName = "require.vendor.js",
			targetPath = mode === "dev" ? path.join(G.developFolder, finalName) : path.join(G.releaseFolder, finalName),
			mapObject = {};
		modulesReference.forEach(x => {
			mapObject[x.moduleName] = "/vendor/" + x.moduleFile;
		});
		fs.writeFile(targetPath, template({ baseUrl: G.baseUrl, paths: JSON.stringify(mapObject) }
		), done);
	};

G.gulp.task("requirejs:copy-modules", () => copyModules("dev"));
G.gulp.task("requirejs:copy-modules:release", copyModules);

G.gulp.task("requirejs:vendor-file", (done) => mapGenerate(done, "dev"));
G.gulp.task("requirejs:vendor-file:release", mapGenerate);

G.gulp.task("requirejs:module-map", G.gulp.series(["requirejs:copy-modules", "requirejs:vendor-file"]));
G.gulp.task("requirejs:module-map:release", G.gulp.series(["requirejs:copy-modules:release", "requirejs:vendor-file:release"]));

console.log("DONE - gulp-modules-map.js");
module.exports = mapGenerate;