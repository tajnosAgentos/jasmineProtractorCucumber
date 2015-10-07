function clickAndOpenPage(xpath)
{
	var element = browser.driver.findElement(By.xpath(xpath));
	
	element.click();
	
	browser.driver.sleep(300);
}


function clickByNameAndOpenPage(text)
{
	waitForElementPresent(By.xpath("//*[contains(text(),'" + text + "')]"));
	
	clickAndOpenPage("//*[contains(text(),'" + text + "')]");	
}

function initBrowser(url, width, height)
{
	browser.driver.manage().window().setSize(width, height);
		
	browser.driver.get(url);
	browser.driver.ignoreSynchronization = true;
	
	jasmine.getEnv().defaultTimeoutInterval = 15000;
}

function initBrowserFullScreen(url)
{
	browser.driver.manage().window().maximize();
	
	browser.driver.get(url);
	browser.driver.ignoreSynchronization = true;
	
	jasmine.getEnv().defaultTimeoutInterval = 15000;
}

function waitForElementPresent(locator) {
	browser.driver.wait(function () {
	              var deferred = protractor.promise.defer();
	              browser.driver.isElementPresent(locator).then(function (data) {
	                     deferred.fulfill(data);
	              });
	              return deferred.promise;
	       });
	}



describe('Working tests', function() {

	//////////////////////////////////////////////////
	describe('Open page in full screen', function() {
		
		beforeEach(function() {
			initBrowserFullScreen('http://www.starbucks.com/');
		});
			
		it('Page loaded', function(){
			expect(browser.driver.getTitle()).toEqual('Starbucks Coffee Company');
		});
			
			
		it('Top menu elements hidden', function(){
			console.log('full screen -> Top menu elements hidden');
	
			var utilitiesItem1 = browser.driver.findElement(By.xpath("//*[@id=\"utilities\"]/ul/li[1]/a/span[1]"));
			expect(utilitiesItem1.isDisplayed()).toBeFalsy();
					
			var openMenuIcon = browser.driver.findElement(By.xpath("//*[@id=\"nav\"]/div[1]/a/span[1]"));
			expect(openMenuIcon.isDisplayed()).toBeFalsy();		
		});
		
		
		it('Top menu elements visible', function(){
			console.log('full screen -> Top menu elements visible');
			
			var searchBox = browser.driver.findElement(By.xpath("//*[@id=\"searchbox\"]"));
			expect(searchBox.isDisplayed()).toBeTruthy();
			
			var searchBoxIcon = browser.driver.findElement(By.xpath("//*[@id=\"submit_search_util\"]/span[1]"));
			expect(searchBoxIcon.isDisplayed()).toBeTruthy();
	
			
			var coffeeMenuItem = browser.driver.findElement(By.xpath("//*[@id=\"nav_coffee\"]/a"));
			expect(coffeeMenuItem.isDisplayed()).toBeTruthy();
	
		});
		
		it('Bottom menu elements visible', function(){
			console.log('full screen -> Bottom menu elements visible');
			
			var bottomMenuItem1 = browser.driver.findElement(By.xpath("//*[@id=\"footer\"]/div[2]/div/div/div/div[1]/ol/li[1]/a"));
			expect(bottomMenuItem1.isDisplayed()).toBeTruthy();	
			
			var bottomMenuItem1 = browser.driver.findElement(By.xpath("//*[@id=\"footer\"]/div[2]/div/div/div/div[2]/ol/li[1]/a"));
			expect(bottomMenuItem1.isDisplayed()).toBeTruthy();	
		});
	});
	
	
	
	//////////////////////////////////////////////////
	describe('Open page in 200 x 200', function() {
		beforeEach(function() {
			initBrowser('http://www.starbucks.com/', 200, 200);
		});
			
		it('Page loaded', function(){
			expect(browser.driver.getTitle()).toEqual('Starbucks Coffee Company');
		});
			
			
		it('Top menu elements visible', function(){
			console.log('200 x 200 -> Top menu elements visible');
			
			var utilitiesItem1 = browser.driver.findElement(By.xpath("//*[@id=\"utilities\"]/ul/li[1]/a/span[1]"));
			expect(utilitiesItem1.isDisplayed()).toBeTruthy();
					
			var openMenuIcon = browser.driver.findElement(By.xpath("//*[@id=\"nav\"]/div[1]/a/span[1]"));
			expect(openMenuIcon.isDisplayed()).toBeTruthy();	
		});
		
		
		it('Top menu elements hidden', function(){
			console.log('200 x 200 -> Top menu elements hidden');
			
			var searchBox = browser.driver.findElement(By.xpath("//*[@id=\"searchbox\"]"));
			expect(searchBox.isDisplayed()).toBeFalsy();
			
			var searchBoxIcon = browser.driver.findElement(By.xpath("//*[@id=\"submit_search_util\"]/span[1]"));
			expect(searchBoxIcon.isDisplayed()).toBeFalsy();
	
			
			var coffeeMenuItem = browser.driver.findElement(By.xpath("//*[@id=\"nav_coffee\"]/a"));
			expect(coffeeMenuItem.isDisplayed()).toBeFalsy();
		});
		
		it('Bottom menu elements not visible', function(){
			console.log('200 x 200 -> Bottom menu elements not visible');
			
			var bottomMenuItem1 = browser.driver.findElement(By.xpath("//*[@id=\"footer\"]/div[2]/div/div/div/div[1]/ol/li[1]/a"));
			expect(bottomMenuItem1.isDisplayed()).toBeFalsy();	
			
			var bottomMenuItem1 = browser.driver.findElement(By.xpath("//*[@id=\"footer\"]/div[2]/div/div/div/div[2]/ol/li[1]/a"));
			expect(bottomMenuItem1.isDisplayed()).toBeFalsy();	
		});
	});
	
	
	
	
	//////////////////////////////////////////////////
	describe('Open page in full screen and check menu show/hide', function() {
		
		beforeEach(function() {
			initBrowserFullScreen('http://www.starbucks.com/');
		});
			
		it('Page loaded', function(){
			expect(browser.driver.getTitle()).toEqual('Starbucks Coffee Company');
		});
		
		
		it('Menu panel visible when mouse over element else not visible', function(){
			
			console.log('Menu panel visible when mouse over element else not visible');
			
			var panelMenuCoffeeButton = browser.driver.findElement(By.xpath("//*[@id=\"nav_coffee\"]/a/strong"));
			browser.actions().mouseMove(panelMenuCoffeeButton).perform();
			browser.driver.sleep(500);
			
			var panelMenuCoffee = browser.driver.findElement(by.id("menu_coffee"));
			expect(panelMenuCoffee.isDisplayed()).toBeTruthy();	
	
			var panelMenuShopButton = browser.driver.findElement(By.xpath("//*[@id=\"nav_shop\"]/a"));
			
			var panelMenuShop = browser.driver.findElement(by.id("menu_shop"));
			
			browser.driver.actions().mouseMove(panelMenuShopButton).perform();
			browser.driver.sleep(500);
			
			expect(panelMenuShop.isDisplayed()).toBeTruthy();
			
			expect(panelMenuCoffee.isDisplayed()).toBeFalsy();	
		});
	});
	
	
	//////////////////////////////////////////////////////////////////////////////////////////////////
	//   DATA DRIVEN
	//////////////////////////////////////////////////////////////////////////////////////////////////
	
	
	//////////////////////////////////////////////////
	describe('Change page language', function() {
		
		var regionTestData = require('./testData/regionChange.json');
		
			
		var regionText = regionTestData[0].changeRegionText;
		var regionPageTitle = regionTestData[0].pageTitle;
		
		initBrowserFullScreen(regionTestData[0].pageUrl);
		
		it('Page loaded', function(){
			expect(browser.driver.getTitle()).toEqual('Starbucks Coffee Company');
		});
		
		regionTestData.forEach( function (data) {
		
			it('GOTO language select site and select '+data.region, function(){
				
				console.log('Change page language ->  GOTO language select site and select ' + data.region);
				
				clickByNameAndOpenPage(regionText);
						
				expect(browser.driver.getTitle()).toEqual(regionPageTitle);
		
				clickByNameAndOpenPage(data.region);
		
				expect(browser.driver.getTitle()).toEqual('Starbucks Coffee Company');
				
				expect(browser.driver.getCurrentUrl()).toEqual(data.pageUrl);
				
				regionText = data.changeRegionText;
				regionPageTitle = data.pageTitle;
			});
		 });
	});
	
	
	describe('FROM LINK   Menu -> ...', function() {
		
		var foodTestData = require('./testData/menu_food_for_link_path.json');
		
		
		foodTestData.forEach( function (data) {
		
			it('FOOD -> ' + data.productName, function(){
				console.log('FROM LINK   Menu -> FOOD -> ' + data.productName);
				
				initBrowserFullScreen(data.pageUrl);
	
				browser.driver.sleep(300);
				
				clickByNameAndOpenPage(data.productName);
				
				var saturatedFat = browser.driver.findElement(By.xpath("//*[@id=\"overview\"]/div[2]/div/div[1]/table/tbody/tr[4]/td[2]"));
				
				expect(saturatedFat.getText()).toEqual(data.saturatedFat);
				
				var sodium = browser.driver.findElement(By.xpath("//*[@id=\"overview\"]/div[2]/div/div[1]/table/tbody/tr[7]/td[2]"));
				
				expect(sodium.getText()).toEqual(data.sodium);
			});
		});
	});
	
	
	describe('Test search', function() {
		
		beforeEach(function() {
			initBrowserFullScreen('http://www.starbucks.com/');
		});
			
	
		
		it('No result found', function(){
			console.log('Test search -> No result found');
			
			expect(browser.driver.getTitle()).toEqual('Starbucks Coffee Company');
			
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

});

//not always works
xdescribe('FROM RENDERED MENU   Menu -> ...', function() {
	
	var foodTestData = require('./testData/menu_food_for_rendered_menu.json');
	
	
	initBrowserFullScreen('http://www.starbucks.com/');
		
	it('Page loaded', function(){
		expect(browser.driver.getTitle()).toEqual('Explore our Menu | Starbucks Coffee Company');
	});
	
	foodTestData.forEach( function (data) {
	
		it('FOOD -> ' + data.foodType, function(){

			console.log('FROM RENDERED MENU   Menu -> FOOD -> ' + data.productName);
			
			var item = browser.driver.findElement(By.xpath("//*[@id=\"nav_menu\"]/a/strong"));
			
			browser.actions().mouseMove(item).perform();
				
			browser.driver.sleep(600);
			
			
			var oldPageTitle = browser.driver.getTitle();
			
			clickByNameAndOpenPage(data.foodType);
			
			
			expect(browser.driver.getTitle()).not.toEqual(oldPageTitle);
	
			oldPageTitle = browser.driver.getTitle()
				
			
			clickByNameAndOpenPage(data.productName);
			
			
			expect(browser.driver.getTitle()).not.toEqual(oldPageTitle);
			
			var saturatedFat = browser.driver.findElement(By.xpath("//*[@id=\"overview\"]/div[2]/div/div[1]/table/tbody/tr[4]/td[2]"));
			
			expect(saturatedFat.getText()).toEqual(data.saturatedFat);
			
			var sodium = browser.driver.findElement(By.xpath("//*[@id=\"overview\"]/div[2]/div/div[1]/table/tbody/tr[7]/td[2]"));
			
			expect(sodium.getText()).toEqual(data.sodium);
		});
	});
});
