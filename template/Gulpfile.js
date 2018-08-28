const G = require("./GulpConfig");

require("./scripts/gulp-copy");
require("./scripts/gulp-ts");
require("./scripts/gulp-modules-map");
require("./scripts/gulp-sass");
require("./scripts/gulp-bs");
require("./scripts/gulp-release");
require("./scripts/gulp-cloud-build");

G.on("dev-server-running", () => {
	let tsTasks = require("./scripts/gulp-ts"),
		sassTasks = require("./scripts/gulp-sass"),
		copyTasks = require("./scripts/gulp-copy");

	G.gulp.watch(G.globPaths.sass).on('change', (file) => {
		sassTasks.compileSingle(file);
	});
	G.sass_bundles.forEach(bundle => {
		G.gulp.watch(bundle.watch).on('change', () => sassTasks.compileSingle(bundle.entry));
	});
	G.browserSync.watch(G.globPaths.css_build, { cwd: G.developFolder }, (event, file) => {
		if (event === "change")
			G.browserSync.reload(file);
	});
	G.gulp.watch(G.globPaths.static_src, { cwd: G.srcFolder }).on('change', () => {
		copyTasks.statics(() => G.browserSync.reload.call(this));
	});
	G.gulp.watch( G.globPaths.ts, { cwd: G.srcFolder } ).on('change', (file) => {
		tsTasks.compileSingle(file);
	});

	G.on("compile-error", function(err) {
		console.error(err.message);
		G.browserSync.notify(err.message, 10000);
	});
});