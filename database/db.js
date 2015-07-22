var mysql = require('mysql');
console.log(process.env.NODE_ENV);
var isDevelopment = process.env.NODE_ENV == 'development';


if (isDevelopment) {
	console.log("ALERT: Dev environment, using qwizard_dev")
	var pool = mysql.createPool({
	    host: 'localhost',
	    user: 'root',
	    password: '',
	    database: 'qwizard_dev'
	});
} else {
	console.log("ALERT: Production environment, using qwizard")
	var pool = mysql.createPool({
	    host: 'localhost',
	    user: 'root',
	    password: '',
	    database: 'qwizard'
	});
}

module.exports = pool;