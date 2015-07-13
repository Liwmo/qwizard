exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['manage-test.js', 'create-test.js'],
  capabilities: {
  	'browserName': 'chrome',
  	'chromeOptions': {
  		'args': ['show-fps-counter=true', 'incognito']
  	}
  }
};
