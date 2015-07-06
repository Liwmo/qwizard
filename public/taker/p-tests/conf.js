exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['qwizard-login-test.js'/*, 'notification-test.js'*/],
  capabilities: {
  	'browserName': 'chrome',
  	'chromeOptions': {
  		'args': [/*'show-fps-counter=true',*/ 'incognito']
  	}
  }
};
