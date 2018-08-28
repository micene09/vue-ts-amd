let G = require("../GulpConfig"),
	del = require("del"),
	launchDevServer = (done) => {
		let devConfig = G.proxy
			? { proxy: G.proxyDev }
			: {
				server: {
					baseDir: G.developFolder
				}
			};
		G.browserSync.init(devConfig, function() {
			done();
			G.emit("dev-server-running");
		});
	},
	launchReleaseServer = (done) => {
		G.browserSync.init({
			server: {
				baseDir: G.releaseFolder
			}
		}, function() {
			done();
			G.emit("task-preview-server-ready");
		});
	};

G.gulp.task("dev-server:clean", () => del([G.developFolder], { force: true }));
G.gulp.task("dev-prepare", G.gulp.series(["dev-server:clean", "copy", "requirejs:module-map", "sass", "sass-bundles", "ts-compile"]));
G.gulp.task("dev-server-launch", launchDevServer);
G.gulp.task("dev-server", G.gulp.series(["dev-prepare", "dev-server-launch"]));
G.gulp.task("preview-server", launchReleaseServer);
console.log("DONE - gulp-bs.js");
module.exports = "browser-sync-task";