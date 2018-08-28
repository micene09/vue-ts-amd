var G = require("../GulpConfig"),
	del = require("del"),
	path = require("path"),
	flatten = require('gulp-flatten'),
	pump = require("pump"),
	rename = require("gulp-rename"),
	copyTasksDevelop = {
		statics_clean: () => del([G.globPaths.static_build], { cwd: G.developFolder, force: true }),
		statics: function(done) {
			pump([
				G.gulp.src(G.globPaths.static_src, { cwd: G.srcFolder, allowEmpty: true }),
				G.gulp.dest(G.developFolder)
			], function(err) {
				if (err) throw err;
				done();
			});
		},
		nodeModulesToVendor: function() {
			var rjsConfig = require("../modules.json"),
				dest = G.gulp.dest(G.developVendorFolder),
				scripts = [],
				refs = {};
			for (var moduleName in rjsConfig) {
				var m = rjsConfig[moduleName],
					script = m.max || m.min,
					baseName = path.basename(script);
				scripts.push(path.join(G.root, script));
				refs[baseName] = moduleName;
			}
			return pump([
				G.gulp.src(scripts, { base: G.root, allowEmpty: true }),
				flatten(),
				rename(function (p) {
					p.basename = refs[p.basename + p.extname]; // << moduleName reference
				}),
				dest
			], function(err) {
				if (err) throw err;
			});
		}
	},
	copyTasksRelease = {
		statics: function() {
			return pump([
				G.gulp.src(G.globPaths.static_src, { cwd: G.srcFolder, allowEmpty: true }),
				G.gulp.dest(G.releaseFolder)
			], function(err) {
				if (err) throw err;
			});
		},
		nodeModulesToVendor: function() {
			var rjsConfig = require("../modules.json"),
				dest = G.gulp.dest(G.releaseVendorFolder),
				scripts = [],
				refs = {};
			for (var moduleName in rjsConfig) {
				var m = rjsConfig[moduleName],
					script = m.min || m.max,
					baseName = path.basename(script);
				scripts.push(path.join(G.root, script))
				refs[baseName] = moduleName;
			}
			return pump([
				G.gulp.src(scripts, { base: G.root, allowEmpty: true }),
				flatten(),
				rename(function (p) {
					p.basename = refs[p.basename + p.extname]; // << moduleName reference
				}),
				dest
			], (err) => {
				if (err) throw err;
			});
		}
	};

G.gulp.task("copy:node-modules-vendor", copyTasksDevelop.nodeModulesToVendor);
G.gulp.task("copy:node-modules-vendor:release", copyTasksRelease.nodeModulesToVendor);

G.gulp.task("copy:statics:develop:clean", copyTasksDevelop.statics_clean);
G.gulp.task("copy:statics:develop:copy", copyTasksDevelop.statics);
G.gulp.task("copy:statics:develop", G.gulp.series(["copy:statics:develop:clean", "copy:statics:develop:copy"]));
G.gulp.task("copy:statics:release", copyTasksRelease.statics);

G.gulp.task("copy", G.gulp.series(["copy:statics:develop", "copy:node-modules-vendor"]));
G.gulp.task("copy:release", G.gulp.series(["copy:statics:release", "copy:node-modules-vendor:release"]));

console.log("DONE - gulp-copy.js");

module.exports = copyTasksDevelop;