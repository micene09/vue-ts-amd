var G = require("../Gulpfile"),
	del = require("del"),
	seq = require("gulp-sequence");

G.gulp.task("release:clean", function(done) {
	del([G.releaseFolder]).then(function() {
		done();
	});
});
G.gulp.task("release", function(done) {
	seq("release:clean", "ts-compile-min", "copy:release", "requirejs:module-map:release", "sass-min", function(err) {
		if (err) throw err;
		done();
	});
});
G.gulp.task("release-preview", function(done) {
	seq("release", "preview-server", function(err) {
		if (err) throw err;
		done();
	});
});

console.log("DONE - gulp-release.js");
module.exports = "gulp-release";