exports.config = {
  framework: 'jasmine2',
  seleniumAddress: 'http://127.0.0.1:4723/wd/hub',
  specs: ['mobileSpec.js'],
  capabilities: {
         'platform': 'android',
         'device': 'android',
         'app': 'chrome',
         'browserName': 'chrome',
         'deviceName': '4df17c422011af75',
         'platformName':'Android'
       }
}