var G = require("../GulpConfig"),
	path = require("path"),
	tsconfig = path.join( G.root, "tsconfig.json" ),
	ts = require('gulp-typescript'),
	uglify = require('gulp-uglify-es').default,
	pump = require("pump"),
	sourcemaps = require("gulp-sourcemaps"),
	tsTasks = {
		compileSingle: (file) => {
			var tsProject = ts.createProject(tsconfig, {
					baseUrl: G.baseUrl,
				}),
				failed = false,
				dest = G.gulp.dest(G.developFolder),
				tsCompiling = G.gulp.src(file, { base: G.srcFolder, cwd: G.srcFolder })
					.pipe(sourcemaps.init())
					.pipe( tsProject() )
					.on("error", (err) => G.emit("compile-error", err) && (failed = true))
					.js.pipe(sourcemaps.write());
			return pump([
				tsCompiling,
				dest
			], () => !failed && G.browserSync.reload(file));
		},
		compile: () => {
			var tsProject = ts.createProject(tsconfig, {
					baseUrl: G.baseUrl,
				}),
				failed = false,
				dest = G.gulp.dest(G.developFolder),
				tsCompiling = G.gulp.src(G.globPaths.ts, { cwd: G.srcFolder })
					.pipe(sourcemaps.init())
					.pipe( tsProject() )
					.on("error", (err) => G.emit("compile-error", err) && (failed = true))
					.js.pipe(sourcemaps.write());
			return pump([
				tsCompiling,
				dest
			], () => !failed && G.browserSync.reload());
		},
		compileMin: () => {
			var tsProject = ts.createProject(tsconfig, {
					baseUrl: G.baseUrl,
					removeComments: true
				}),
				failed = false,
				dest = G.gulp.dest(G.releaseFolder),
				tsCompiling = G.gulp.src(G.globPaths.ts, { cwd: G.srcFolder })
					//.pipe(sourcemaps.init())
					.pipe(tsProject())
					.on("error", (err) => G.emit("compile-error", err) && (failed = true))
					.js.pipe(uglify())
					//.pipe(sourcemaps.write());
			return pump([
				tsCompiling,
				dest
			], () => !failed && G.browserSync.reload());
		}
	};
G.gulp.task('ts-compile', tsTasks.compile);
G.gulp.task('ts-compile-min', tsTasks.compileMin);
console.log("DONE - gulp-ts.js");
module.exports = tsTasks;