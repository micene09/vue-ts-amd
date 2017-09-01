var G = require("../Gulpfile"),
	del = require("del"),
	seq = require("gulp-sequence");

G.gulp.task("dev-server:clean", function(done) {
	del([G.buildFolder]).then(function() {
		done();
	});
});
G.gulp.task("dev-prepare", function(done) {
	seq("dev-server:clean", "copy", "requirejs:module-map", "sass", "ts-compile", done);
});
G.gulp.task("dev-server", ["dev-prepare"], function(done) {
	G.browserSync.init({
		server: {
			baseDir: G.buildFolder
		}
	}, function() {
		done();
		G.emit("task-dev-server-ready");
	});
});
G.gulp.task("preview-server", function(done) {
	G.browserSync.init({
		server: {
			baseDir: G.releaseFolder
		}
	}, function() {
		done();
		G.emit("task-preview-server-ready");
	});
});
console.log("DONE - gulp-bs.js");
module.exports = "browser-sync-task";