exports.config = {
  
	framework: 'jasmine2',
  
	seleniumAddress: 'http://localhost:4444/wd/hub',

	specs: ['spec.js'],

	
	capabilities: {
	    'browserName': 'chrome'
	},

	jasmineNodeOpts: {
		showColors: true
	}
	
//	,
//	defaultTimeoutInterval = 15000
	
//	,
//	allScriptsTimeout: 1000
}