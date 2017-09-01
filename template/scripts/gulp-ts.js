var G = require("../Gulpfile"),
	path = require("path"),
	tsconfig = path.join( G.root, "tsconfig.json" ),
	ts = require('gulp-typescript'),
	uglify = require('gulp-uglify'),
	pump = require("pump"),
	sourcemaps = require("gulp-sourcemaps"),
	tsTasks = {
		compile: function(done) {
			var tsProject = ts.createProject(tsconfig, {
					baseUrl: G.baseUrl
				}),
				dest = G.gulp.dest(G.buildFolder),
				tsCompiling = tsProject.src()
					.pipe(sourcemaps.init())
					.pipe( tsProject() )
					.js.pipe(sourcemaps.write());
			pump([
				tsCompiling,
				dest
			], function(err) {
				if (err) throw err;
				done();
				G.emit("task-ts-compiled", dest);
			});
		},
		compileMin: function(done) {
			var tsProject = ts.createProject(tsconfig, {
					baseUrl: G.baseUrl,
					target: "es5" // << Uglify doesn't support ES6
				}),
				dest = G.gulp.dest(G.releaseFolder),
				tsCompiling = tsProject.src()
					.pipe(sourcemaps.init())
					.pipe( tsProject() )
					.js
						.pipe(uglify())
						.pipe(sourcemaps.write());
			pump([
				tsCompiling,
				dest
			], function(err) {
				if (err) throw err;
				done();
				G.emit("task-ts-compiled", dest);
			});
		}
	};
G.gulp.task('ts-compile', tsTasks.compile);
G.gulp.task('ts-compile-min', tsTasks.compileMin);
console.log("DONE - gulp-ts.js");
module.exports = tsTasks;