var sampleSteps = function() {

var seleniumAddress = 'http://localhost:4444/wd/hub';

	this.Given(/^this is the first sample part1$/, function (callback) {
		console.log("1.1");

		browser.get('http://www.angularjs.org').then(function() {
			callback();
		});
	});

	this.When(/^this is the first sample part2$/, function (callback) {
		console.log("1.2");
		callback();
	});
	
	this.Then(/^this is the first sample part3$/, function (callback) {
		console.log("1.3");
		callback();
	});
	
	
	
	
	this.Given(/^this is the second sample part1$/, function (callback) {
		console.log("2.1");
		callback();
	});
	
	this.When(/^this is the second sample part2$/, function (callback) {
		console.log("2.2");
		callback();
	});
	
	this.Then(/^this is the second sample part3$/, function (callback) {
		console.log("2.3");
		callback();
	});
};

module.exports = sampleSteps;