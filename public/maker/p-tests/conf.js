exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['liveEdit-test.js'],
  capabilities: {
  	'browserName': 'firefox'
  }
};
