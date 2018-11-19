let G = require("../GulpConfig"),
	del = require("del"),
	path = require("path"),
	pump = require("pump"),
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
		staticSingleCopy: function(fileRelativePath, done) {
			let from = path.join(G.srcFolder, fileRelativePath),
				to = path.join(G.developFolder, fileRelativePath),
				toDest = path.dirname(to);
			return pump([
				G.gulp.src(from, { cwdbase: G.srcFolder, allowEmpty: true }),
				G.gulp.dest(toDest)
			], function(err) {
				if (err) throw err;
				if (typeof done === "function") done();
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
		}
	};

G.gulp.task("copy:statics:develop:clean", copyTasksDevelop.statics_clean);
G.gulp.task("copy:statics:develop:copy", copyTasksDevelop.statics);
G.gulp.task("copy:statics:develop", G.gulp.series(["copy:statics:develop:clean", "copy:statics:develop:copy"]));
G.gulp.task("copy:statics:release", copyTasksRelease.statics);

G.gulp.task("copy", G.gulp.series(["copy:statics:develop"]));
G.gulp.task("copy:release", G.gulp.series(["copy:statics:release"]));

console.log("DONE - gulp-copy.js");

module.exports = copyTasksDevelop;