function clickAndOpenPage(xpath)
{
	var element = browser.driver.findElement(By.xpath(xpath));
	
	element.click();
	
	browser.driver.sleep(1000);
}


function clickByNameAndOpenPage(text)
{
	clickAndOpenPage("//*[contains(text(),'" + text + "')]");	
}

function initBrowser(url, width, height)
{
	browser.driver.manage().window().setSize(width, height);
	
	browser.driver.get(url);
	browser.driver.ignoreSynchronization = true;
}


describe('Open page on mobile davice', function() {
		
	browser.driver.get('http://www.starbucks.com/');
	browser.driver.ignoreSynchronization = true;
		
	jasmine.getEnv().defaultTimeoutInterval = 15000;

		
	it('Page loaded', function(){
		expect(browser.driver.getTitle()).toEqual('Starbucks Coffee Company');
	});
		
		
	it('Top menu elements visible', function(){
		console.log('mobile davice -> Top menu elements visible');
		
		var utilitiesItem1 = browser.driver.findElement(By.xpath("//*[@id=\"utilities\"]/ul/li[1]/a/span[1]"));
		expect(utilitiesItem1.isDisplayed()).toBeTruthy();
				
		var openMenuIcon = browser.driver.findElement(By.xpath("//*[@id=\"nav\"]/div[1]/a/span[1]"));
		expect(openMenuIcon.isDisplayed()).toBeTruthy();	
	});
	
	
	it('Top menu elements hidden', function(){
		console.log('mobile davice -> Top menu elements hidden');
		
		var searchBox = browser.driver.findElement(By.xpath("//*[@id=\"searchbox\"]"));
		expect(searchBox.isDisplayed()).toBeFalsy();
		
		var searchBoxIcon = browser.driver.findElement(By.xpath("//*[@id=\"submit_search_util\"]/span[1]"));
		expect(searchBoxIcon.isDisplayed()).toBeFalsy();

		
		var coffeeMenuItem = browser.driver.findElement(By.xpath("//*[@id=\"nav_coffee\"]/a"));
		expect(coffeeMenuItem.isDisplayed()).toBeFalsy();
	});
	
	it('Bottom menu elements not visible', function(){
		console.log('mobile davice -> Bottom menu elements not visible');
		
		var bottomMenuItem1 = browser.driver.findElement(By.xpath("//*[@id=\"footer\"]/div[2]/div/div/div/div[1]/ol/li[1]/a"));
		expect(bottomMenuItem1.isDisplayed()).toBeFalsy();	
		
		var bottomMenuItem1 = browser.driver.findElement(By.xpath("//*[@id=\"footer\"]/div[2]/div/div/div/div[2]/ol/li[1]/a"));
		expect(bottomMenuItem1.isDisplayed()).toBeFalsy();	
	});
});



describe('Change page language', function() {
	
	var regionTestData = require('./testData/regionChange.json');
	
		
	var regionText = regionTestData[0].changeRegionText;
	var regionPageTitle = regionTestData[0].pageTitle;
	
	browser.driver.get(regionTestData[0].pageUrl);
	browser.driver.ignoreSynchronization = true;
	
	jasmine.getEnv().defaultTimeoutInterval = 30000;


	regionTestData.forEach( function (data) {
	
		it('GOTO language select site and select '+data.region, function(){
			
			console.log('Change page language ->  GOTO language select site and select ' + data.region);
			
			clickByNameAndOpenPage(regionText);
					
			clickByNameAndOpenPage(data.region);
			
			expect(browser.driver.getCurrentUrl()).toEqual(data.pageUrl);
			
			regionText = data.changeRegionText;
			regionPageTitle = data.pageTitle;
		});
	 });
});







describe('Test search', function() {
	
	beforeEach(function() {
		browser.driver.get('http://www.starbucks.com/');
		browser.driver.ignoreSynchronization = true;
		
		jasmine.getEnv().defaultTimeoutInterval = 15000;
	});
		

	
	it('No result found', function(){
		console.log('Test search -> No result found');
		
		expect(browser.driver.getTitle()).toEqual('Starbucks Coffee Company');

		clickAndOpenPage("//*[@id=\"utilities\"]/ul/li[1]/a/span[1]");
		
		var searchbox = browser.driver.findElement(by.id('searchbox'));
		searchbox.sendKeys('zxcasdqwe');
		expect(searchbox.getAttribute('value')).toEqual("zxcasdqwe");

		clickAndOpenPage("//*[@id=\"submit_search_util\"]/span[1]");

		var summary_term = browser.driver.findElement(by.id('summary_term'));

		expect(summary_term.getText()).toEqual('You searched for zxcasdqwe');
	
		var resultMessage = browser.driver.findElement(By.xpath("//*[@id=\"content\"]/div[2]/div[1]/p"));

		expect(resultMessage.getText()).toEqual('No results found.');
	});
	
	
	it('Some result found', function(){
		console.log('Test search -> Some result found');
		
		expect(browser.driver.getTitle()).toEqual('Starbucks Coffee Company');
		
		clickAndOpenPage("//*[@id=\"utilities\"]/ul/li[1]/a/span[1]");
		
		var searchbox = browser.driver.findElement(by.id('searchbox'));
		searchbox.sendKeys('coffee');
		expect(searchbox.getAttribute('value')).toEqual("coffee");
		
		clickAndOpenPage("//*[@id=\"submit_search_util\"]/span[1]");
		
		var summary_term = browser.driver.findElement(by.id('summary_term'));
		
		expect(summary_term.getText()).toEqual('You searched for coffee');
		
		var summary_amount = browser.driver.findElement(by.id('summary_amount'));
		
		expect(summary_amount.isDisplayed()).toBeTruthy();
		
		var paginator = browser.driver.findElement(By.xpath('//*[@id=\"content\"]/div[2]/div[1]/div[2]'));
		
		expect(paginator.isDisplayed()).toBeTruthy();
	});
});










describe('FROM LINK   Menu -> ...', function() {
	
	var foodTestData = require('./testData/menu_food_for_link_path.json');
	
	
	foodTestData.forEach( function (data) {
	
		it('FOOD -> ' + data.productName, function(){
			console.log('FROM LINK   Menu -> FOOD -> ' + data.productName);
			
			browser.driver.get(data.pageUrl);
			browser.driver.ignoreSynchronization = true;
			
			jasmine.getEnv().defaultTimeoutInterval = 30000;

			browser.driver.sleep(300);
			
			clickByNameAndOpenPage(data.productName);
			
			var saturatedFat = browser.driver.findElement(By.xpath("//*[@id=\"overview\"]/div[2]/div/div[1]/table/tbody/tr[4]/td[2]"));
			
			expect(saturatedFat.getText()).toEqual(data.saturatedFat);
			
			var sodium = browser.driver.findElement(By.xpath("//*[@id=\"overview\"]/div[2]/div/div[1]/table/tbody/tr[7]/td[2]"));
			
			expect(sodium.getText()).toEqual(data.sodium);
		});
	});
});