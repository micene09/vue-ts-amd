let rjsConfig = require("../modules.json"),
	fs = require("fs"),
	path = require("path"),
	root = path.dirname(__dirname);
module.exports = function(config) {
	return function check(req, res, next) {
		let moduleName = req.url.replace("/base/", "").replace(".js", ""),
			moduleRef = rjsConfig[moduleName];
		if (moduleRef) {
			let filePath = path.join(root, moduleRef.max);
			res.writeHead(200, {
				"Content-Type": "application/octet-stream",
				"Content-Disposition" : "attachment; filename=" + path.basename(filePath)
			});
			fs.createReadStream(filePath).pipe(res);
		}
		else next();
	};
}