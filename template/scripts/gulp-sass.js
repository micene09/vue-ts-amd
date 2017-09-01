var G = require("../Gulpfile"),
	sass = require('gulp-sass'),
	sourcemaps = require("gulp-sourcemaps"),
	sassTasks = {
		compileSingle: function(filePath, done) {
			var pump = require("pump"),
				source = [filePath],
				dest = G.gulp.dest(G.buildFolder);
			pump([
				G.gulp.src(source, { base: G.srcFolder }),
				sourcemaps.init(),
				sass().on('error', sass.logError),
				sourcemaps.write(),
				dest
			], function(err) {
				if (err) throw err;
				if (typeof done == "function") done();
				G.emit("task-sass-single-compiled", dest);
			});
		},
		compile: function(done) {
			var pump = require("pump"),
				dest = G.gulp.dest(G.buildFolder),
				task = G.gulp.src(G.globPaths.scss)
					.pipe(sourcemaps.init())
					.pipe(sass().on('error', sass.logError))
					.pipe(sourcemaps.write())
					.pipe(dest);

			G.emit("task-sass-compiled", task);
			return task;
		},
		compileMin: function(done) {
			var pump = require("pump"),
				dest = G.gulp.dest(G.releaseFolder),
				task = G.gulp.src(G.globPaths.scss)
					.pipe(sourcemaps.init())
					.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
					.pipe(sourcemaps.write())
					.pipe(dest);

			G.emit("task-sass-compiled", task);
			return task;
		}
	};
G.gulp.task('sass', sassTasks.compile);
G.gulp.task('sass-min', sassTasks.compileMin);
console.log("DONE - gulp-sass.js");
module.exports = sassTasks;
