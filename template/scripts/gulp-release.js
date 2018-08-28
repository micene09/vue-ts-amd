var G = require("../GulpConfig"),
	del = require("del");

G.gulp.task("release:clean", () => del([G.releaseFolder], { force: true }));
G.gulp.task("release", G.gulp.series(["release:clean", "ts-compile-min", "copy:release", "requirejs:module-map:release", "sass-min", "sass-bundles-min"]));
G.gulp.task("release-preview", G.gulp.series(["release", "preview-server"]));

console.log("DONE - gulp-release.js");
module.exports = "gulp-release";