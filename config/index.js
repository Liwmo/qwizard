var env = process.env.NODE_ENV || 'development';

var config = {
	development: {
		smtp: {
			host: 'pp2.asynchrony.com',
			port: 25
		}
	},
	production: {
		smtp: {
			host: 'pp2.asynchrony.com',
			port: 25
		}
	}
}

module.exports = config[env];