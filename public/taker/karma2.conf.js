// Karma configuration
// Generated on Tue Jun 23 2015 15:23:34 GMT-0500 (CDT)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: './',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      'bower_components/angular/angular.js',
      'bower_components/angular-route/angular-route.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'app.js',
      'controllers/*.js',
      'views/*.html',
      'directives/templates/*.html',
      'directives/*.js',
      'factories/*.js',
      '*/*-test.js'
    ],


    // list of files to exclude
    exclude: [
      'p-tests/*'
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'views/*.html' : ['ng-html2js'],
      'directives/templates/*.html' : ['ng-html2js']
    },

    ngHtml2JsPreprocessor: {
      prependPrefix: '/taker/',
      moduleName: 'my.templates'
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'dots', 'junit'],

    junitReporter: {
      outputFile: 'test-results.xml'
    },

    // web server port-ja
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS', 'PhantomJS_custom'],

    customLaunchers: {
       'PhantomJS_custom': {
	       base: 'PhantomJS',
	       options: {
	         windowName: 'myWindow',
	         settings: {
		       webSecurityEnabled: false
	         },
	       },
	    flags: ['--load-images=true'],
	    debug: true
	  }
    },

    phantomjsLauncher: {
	exitOnResourceError: true
    },

    plugins: [
      'karma-jasmine',
      'karma-phantomjs-launcher',
      'karma-ng-html2js-preprocessor'
    ],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true
  });
};