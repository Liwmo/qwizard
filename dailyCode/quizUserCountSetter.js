var db = require('../database/db');

function updateUserCount(callback) {
    var today = (new Date()).toISOString().substr(0,10);
    db.query('update quizzes SET possibleTakerCount=(SELECT count(id) from users) where results=?',today, callback);
}

module.exports = {
	updateUserCount : updateUserCount
};