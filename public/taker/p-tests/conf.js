exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['results-test.js'],
  capabilities: {
  	'browserName': 'chrome',
  	'chromeOptions': {
  		'args': ['show-fps-counter=true']
  	}
  }
};
