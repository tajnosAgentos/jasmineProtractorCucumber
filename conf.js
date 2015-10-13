exports.config = {
  
	framework: 'jasmine2',
  
	seleniumAddress: 'http://localhost:4444/wd/hub',

	specs: ['spec.js'],
	
//	 seleniumArgs: ['-Dwebdriver.ie.driver=node_modules/protractor/selenium/IEDriverServer.exe'],
	
	capabilities: {
//	    'browserName': 'firefox'
		'browserName': 'chrome'
//		'browserName': 'internet explorer'
	},

	jasmineNodeOpts: {
		showColors: true
	}
	
//	,
//	defaultTimeoutInterval = 15000
	
//	,
//	allScriptsTimeout: 1000
}