var G = require("../GulpConfig"),
	path = require("path"),
	fs = require('fs'),
	glob = require('glob'),
	_ = require('lodash'),
	templateFile = path.join(__dirname, "gulp-modules-map.tpl"),
	compiled = _.template(fs.readFileSync(templateFile)),
	finalName = "require.vendor.js",
	devFilePath = path.join(G.developFolder, finalName),
	relFilePath = path.join(G.releaseFolder, finalName),
	mapGenerate  = {
		dev: (done) => {
			glob( G.developVendorFolder + "*.js", (err, files) => {
				if (err) throw err;
				var mapObject = {};
				files.forEach((file) => {
					var moduleName = path.basename(file).replace(".js", "");
					var modulePath = G.vendorUrl + moduleName;
					mapObject[moduleName] = modulePath;
				});
				fs.writeFile(devFilePath, compiled(
					{
						baseUrl: G.baseUrl,
						paths: JSON.stringify(mapObject)
					}
				), done);
			});
		},
		release: (done) => {
			glob( G.releaseVendorFolder + "*.js", (err, files) => {
				if (err) throw err;
				var mapObject = {};
				files.forEach((file) => {
					var moduleName = path.basename(file).replace(".js", "");
					var modulePath = G.vendorUrl + moduleName;
					mapObject[moduleName] = modulePath;
				});
				fs.writeFile(relFilePath, compiled(
					{
						baseUrl: G.baseUrl,
						paths: JSON.stringify(mapObject)
					}
				), done);
			});
		}
	};

G.gulp.task("requirejs:module-map", mapGenerate.dev);
G.gulp.task("requirejs:module-map:release", mapGenerate.release);

console.log("DONE - gulp-modules-map.js");
module.exports = mapGenerate;