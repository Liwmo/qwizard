exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['publishing-test.js'],
  capabilities: {
  	'browserName': 'firefox'
  }
};
