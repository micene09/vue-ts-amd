var G = require("../GulpConfig");

G.gulp.task("cloud-build", () => {
	if (G.developFolder == G.releaseFolder)
		throw new Error("'developFolder' and 'releaseFolder' parameters cannot be the same.");
	else return G.gulp.series(["dev-prepare", "release"]);
});
module.exports = "cloud-build-task";