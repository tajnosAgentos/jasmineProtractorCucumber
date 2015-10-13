exports.config = {

  specs: [
    'features/*.feature'
  ],

  capabilities: {
    'browserName': 'chrome',
    'timeout' : 100000
  },


  framework: 'cucumber',
  
seleniumAddress: 'http://localhost:4444/wd/hub',



cucumberOpts : {
    // define your step definitions in this file
    require : 'features/sampleSteps.js',
    format  : 'pretty'
}
};
