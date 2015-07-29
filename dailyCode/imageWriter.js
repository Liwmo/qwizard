var fs = require('fs');

function writeImage(fileName, fileData, callback) {
	fs.writeFileSync(fileName, fileData);
}

module.exports = {
	writeImage: writeImage
};