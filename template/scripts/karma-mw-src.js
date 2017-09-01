let fs = require("fs"),
	path = require("path"),
	url = require("url"),
	root = path.dirname(__dirname);
module.exports = function(config) {
	return function check(req, res, next) {
		let parsed = url.parse(req.url),
			basename = path.basename(parsed.pathname);
		if (req.url.indexOf('/base/src/') == 0
				&& basename.substr(-3) !== ".ts"
				&& basename.substr(-3) !== ".js"
		) {
			let nobase = req.url.replace("/base/src/", "/src/"),
				filePath = path.join(root, nobase);
			res.writeHead(200, {
				"Content-Type": "application/octet-stream",
				"Content-Disposition" : "attachment; filename=" + basename
			});
			fs.createReadStream(filePath).pipe(res);
		}
		else next();
	};
}