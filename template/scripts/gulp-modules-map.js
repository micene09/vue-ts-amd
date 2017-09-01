var G = require("../Gulpfile"),
	rjsConfig = require("../modules.json"),
	path = require("path"),
	fs = require('fs'),
	glob = require('glob'),
	_ = require('lodash'),
	templateFile = path.join(__dirname, "gulp-modules-map.tpl"),
	compiled = _.template(fs.readFileSync(templateFile)),
	finalName = "require.vendor.js",
	devFilePath = path.join(G.buildFolder, finalName),
	relFilePath = path.join(G.releaseFolder, finalName),
	mapGenerate  = {
		dev: function(done) {
			glob( G.buildVendorFolder + "*.js", function(err, files) {
				if (err) throw err;
				var mapObject = {};
				files.forEach(function(file) {
					var moduleName = path.basename(file).replace(".js", "");
					var modulePath = G.vendorUrl + moduleName;
					mapObject[moduleName] = modulePath;
				});
				fs.writeFile(devFilePath, compiled(
					{
						baseUrl: G.baseUrl,
						paths: JSON.stringify(mapObject)
					}
				), function(err) {
					if (err) throw err;
					done();
				});
			});
		},
		release: function(done) {
			glob( G.releaseVendorFolder + "*.js", function(err, files) {
				if (err) throw err;
				var mapObject = {};
				files.forEach(function(file) {
					var moduleName = path.basename(file).replace(".js", "");
					var modulePath = G.vendorUrl + moduleName;
					mapObject[moduleName] = modulePath;
				});
				fs.writeFile(relFilePath, compiled(
					{
						baseUrl: G.baseUrl,
						paths: JSON.stringify(mapObject)
					}
				), function(err) {
					if (err) throw err;
					done();
				});
			});
		}
	};

G.gulp.task("requirejs:module-map", mapGenerate.dev);
G.gulp.task("requirejs:module-map:release", mapGenerate.release);

console.log("DONE - gulp-modules-map.js");
module.exports = mapGenerate;