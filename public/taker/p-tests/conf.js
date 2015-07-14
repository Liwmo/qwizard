exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: [/*'qwizard-login-test.js', 'maker-auth-test.js', 'notification-test.js', 'info-test.js', 'email-token-test.js',*/ 'menu-test.js'],
  capabilities: {
  	'browserName': 'chrome',
  	'chromeOptions': {
  		'args': ['show-fps-counter=true']
  	}
  }
};
