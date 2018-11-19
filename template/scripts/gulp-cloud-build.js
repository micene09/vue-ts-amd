const G = require("../GulpConfig");

G.gulp.task("cloud-build", G.gulp.series(["dev-prepare", "release"]));

console.log("DONE - gulp-cloud-build.js");

module.exports = "cloud-build-task";