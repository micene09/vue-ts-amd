let G = require("../GulpConfig"),
	del = require("del"),
	historyFallback = require("connect-history-api-fallback"),
	launchDevServer = (done) => {
		let devConfig = G.proxyDev
			? { proxy: G.proxyDev }
			: {
				server: {
					baseDir: G.developFolder,
					middleware: [
						historyFallback()
					]
				}
			};

		G.browserSync.init(devConfig, err => {
			if (err) throw err;
			done();
			G.emit("dev-server-running");
		});
	},
	launchReleaseServer = (done) => {
		G.browserSync.init({
			server: {
				baseDir: G.releaseFolder,
				middleware: [
					historyFallback()
				]
			}
		}, err => {
			if (err) throw err;
			done();
			G.emit("task-preview-server-ready");
		});
	};

G.gulp.task("dev-server:clean", () => del([G.developFolder + "/*"], { force: true, ignore: ".gitkeep" }));
G.gulp.task("dev-prepare", G.gulp.series(["dev-server:clean", "copy", "requirejs:module-map", "sass", "sass-bundles", "ts-compile"]));
G.gulp.task("dev-server-launch", launchDevServer);
G.gulp.task("dev-server", G.gulp.series(["dev-prepare", "dev-server-launch"]));
G.gulp.task("preview-server", launchReleaseServer);
console.log("DONE - gulp-bs.js");
module.exports = "browser-sync-task";