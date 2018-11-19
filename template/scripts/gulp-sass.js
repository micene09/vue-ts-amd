var G = require("../GulpConfig"),
	sass = require('gulp-sass'),
	sourcemaps = require("gulp-sourcemaps"),
	sassTasks = {
		compileSingle: (filePath) => {
			var pump = require("pump"),
				dest = G.gulp.dest(G.developFolder);
			return pump([
				G.gulp.src([filePath], { base: G.srcFolder }),
				sourcemaps.init(),
				sass().on('error', (err) => {
					G.emit("compile-error", err);
					sass.logError(err);
				}),
				sourcemaps.write(),
				dest
			]);
		},
		compileSingleMin: (filePath) => {
			var pump = require("pump"),
				dest = G.gulp.dest(G.releaseFolder);
			return pump([
				G.gulp.src([filePath], { base: G.srcFolder }),
				sass().on('error', (err) => {
					G.emit("compile-error", err);
					sass.logError(err);
				}),
				dest
			]);
		},
		compileBundles: (done) => {
			G.sass_bundles.forEach(bundle => {
				sassTasks.compileSingle(bundle.entry);
			});
			done();
		},
		compileBundlesMin: (done) => {
			G.sass_bundles.forEach(bundle => {
				sassTasks.compileSingleMin(bundle.entry);
			});
			done();
		},
		compile: () => {
			var path = require("path"),
				dest = G.gulp.dest(G.developFolder),
				task = G.gulp.src(G.globPaths.sass.map(pattern => path.resolve(pattern)), { base: G.srcFolder, cwd: G.srcFolder })
					.pipe(sourcemaps.init())
					.pipe(sass().on('error', (err) => {
						G.emit("compile-error", err);
						sass.logError(err);
					}))
					.pipe(sourcemaps.write())
					.pipe(dest);
			return task;
		},
		compileMin: () => {
			var path = require("path"),
				dest = G.gulp.dest(G.releaseFolder),
				task = G.gulp.src(G.globPaths.sass.map(pattern => path.resolve(pattern)), { base: G.srcFolder, cwd: G.srcFolder })
					.pipe(sass().on('error', (err) => {
						G.emit("compile-error", err);
						sass.logError(err);
					}))
					.pipe(dest);
			return task;
		}
	};
G.gulp.task('sass', sassTasks.compile);
G.gulp.task('sass-bundles', sassTasks.compileBundles);
G.gulp.task('sass-bundles-min', sassTasks.compileBundlesMin);
G.gulp.task('sass-min', sassTasks.compileMin);
console.log("DONE - gulp-sass.js");
module.exports = sassTasks;
