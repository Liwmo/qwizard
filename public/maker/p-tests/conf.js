exports.config = {
  seleniumAddress: 'http://localhost:6666/wd/hub',
  specs: ['manage-test.js'],
  capabilities: {
  	'browserName': 'chrome',
  	'chromeOptions': {
  		'args': ['show-fps-counter=true', 'incognito']
  	}
  }
};
