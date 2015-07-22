var mysql = require('mysql');
console.log(process.env.NODE_ENV);
var isProd = process.env.NODE_ENV == 'production';


if (isProd) {
	console.log("ALERT: Production environment, using qwizard")
	var pool = mysql.createPool({
	    host: 'localhost',
	    user: 'root',
	    password: '',
	    database: 'qwizard'
	});
} else {
	console.log("ALERT: Dev environment, using qwizard_dev")
	var pool = mysql.createPool({
	    host: 'localhost',
	    user: 'root',
	    password: '',
	    database: 'qwizard_dev'
	});
}

module.exports = pool;