var fs = require("fs"),
    path = require("path");

function addRoutesFolder(app, folder) {
	var files = fs.readdirSync(folder);

	for (var i = 0; i < files.length; i++) {
		var merge = path.join(folder, files[i]),
			info = fs.statSync(merge);
		if (info.isFile()) {
			var route = require(merge);
			app.use(route);
		} else if (info.isDirectory()) {
			addRoutesFolder(app, merge);
		}
	}
}

module.exports = function(app) {
	addRoutesFolder(app, path.join(__dirname, "../routes/"));
};
