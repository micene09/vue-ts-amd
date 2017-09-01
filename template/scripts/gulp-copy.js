var G = require("../Gulpfile"),
	del = require("del"),
	path = require("path"),
	flatten = require('gulp-flatten'),
	pump = require("pump"),
	copy = require("gulp-copy"),
	seq = require('gulp-sequence'),
	rename = require("gulp-rename"),
	copyTasks = {
		html_clean: function(done) {
			del([G.globPaths.html_build]).then(function() {
				done();
			});
		},
		html: function(done) {
			pump([
				G.gulp.src(G.globPaths.html_src, { base: G.srcFolder }),
				G.gulp.dest(G.buildFolder)
			], function(err) {
				if (err) throw err;
				done();
			});
		},
		vueComponents: function(done) {
			pump([
				G.gulp.src(G.globPaths.vue_comp_src, { base: G.srcFolder }),
				G.gulp.dest(G.buildFolder)
			], function(err) {
				if (err) throw err;
				done();
			});
		},
		nodeModulesToVendor: function(done) {
			var rjsConfig = require("../modules.json"),
				dest = G.gulp.dest(G.buildVendorFolder),
				scripts = [],
				refs = {};
			for (var moduleName in rjsConfig) {
				var m = rjsConfig[moduleName],
					script = m.max || m.min,
					baseName = path.basename(script);
				scripts.push(path.join(G.root, script));
				refs[baseName] = moduleName;
			}
			pump([
				G.gulp.src(scripts, { base: G.root }),
				flatten(),
				rename(function (p) {
					p.basename = refs[p.basename + p.extname]; // << moduleName reference
				}),
				dest
			], function(err) {
				if (err) throw err;
				done();
				G.emit("task-module-map-copy-end", dest);
			});
		}
	},
	copyTasksRelease = {
		html: function(done) {
			pump([
				G.gulp.src(G.globPaths.html_src, { base: G.srcFolder }),
				G.gulp.dest(G.releaseFolder)
			], function(err) {
				if (err) throw err;
				done();
			});
		},
		vueComponents: function(done) {
			pump([
				G.gulp.src(G.globPaths.vue_comp_src, { base: G.srcFolder }),
				G.gulp.dest(G.releaseFolder)
			], function(err) {
				if (err) throw err;
				done();
			});
		},
		nodeModulesToVendor: function(done) {
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
			pump([
				G.gulp.src(scripts, { base: G.root }),
				flatten(),
				rename(function (p) {
					p.basename = refs[p.basename + p.extname]; // << moduleName reference
				}),
				dest
			], function(err) {
				if (err) throw err;
				done();
				G.emit("task-module-map-copy-end", dest);
			});
		}
	};

G.gulp.task("copy:vue-files", copyTasks.vueComponents);
G.gulp.task("copy:vue-files:release", copyTasksRelease.vueComponents);

G.gulp.task("copy:node-modules-vendor", copyTasks.nodeModulesToVendor);
G.gulp.task("copy:node-modules-vendor:release", copyTasksRelease.nodeModulesToVendor);

G.gulp.task("copy:html:clean", copyTasks.html_clean);
G.gulp.task("copy:html", ["copy:html:clean"], copyTasks.html);
G.gulp.task("copy:html:release", copyTasksRelease.html);

G.gulp.task("copy", function(done) {
	seq("copy:html", "copy:node-modules-vendor", "copy:vue-files", function(err) {
		if (err) throw err;
		done();
	});
});
G.gulp.task("copy:release", function(done) {
	seq("copy:html:release", "copy:node-modules-vendor:release", "copy:vue-files:release", function(err) {
		if (err) throw err;
		done();
	});
});

console.log("DONE - gulp-copy.js");

module.exports = copyTasks;