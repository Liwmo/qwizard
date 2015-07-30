var fs = require('fs');

function writeImage(fileName, fileData) {
	fs.writeFileSync(fileName, fileData);
}

module.exports = {
	writeImage: writeImage
};