function clickAndOpenPage(xpath)
{
	var element = browser.driver.findElement(By.xpath(xpath));
	
	element.click();
	
	browser.driver.sleep(300);
}


function initBrowser(url, width, height)
{
	browser.driver.manage().window().setSize(width, height);
	
	browser.driver.get(url);
	browser.driver.ignoreSynchronization = true;
}


//////////////////////////////////////////////////
xdescribe('Open page in 2048 x 2048', function() {
	
	beforeEach(function() {
		initBrowser('http://www.starbucks.com/', 2048, 2048);
	});
		
	it('Page loaded', function(){
		expect(browser.driver.getTitle()).toEqual('Starbucks Coffee Company');
	});
		
		
	it('Top menu elements hidden', function(){

		var utilitiesItem1 = browser.driver.findElement(By.xpath("//*[@id=\"utilities\"]/ul/li[1]/a/span[1]"));
		expect(utilitiesItem1.isDisplayed()).toBeFalsy();
				
		var openMenuIcon = browser.driver.findElement(By.xpath("//*[@id=\"nav\"]/div[1]/a/span[1]"));
		expect(openMenuIcon.isDisplayed()).toBeFalsy();		
	});
	
	
	it('Top menu elements visible', function(){
			
		var searchBox = browser.driver.findElement(By.xpath("//*[@id=\"searchbox\"]"));
		expect(searchBox.isDisplayed()).toBeTruthy();
		
		var searchBoxIcon = browser.driver.findElement(By.xpath("//*[@id=\"submit_search_util\"]/span[1]"));
		expect(searchBoxIcon.isDisplayed()).toBeTruthy();

		
		var coffeeMenuItem = browser.driver.findElement(By.xpath("//*[@id=\"nav_coffee\"]/a"));
		expect(coffeeMenuItem.isDisplayed()).toBeTruthy();
		
		
//		var zipCodeInput = browser.driver.findElement(by.id('ZipCode'));
//		zipCodeInput.sendKeys('kod pocztowy ABC');
//		expect(zipCodeInput.getAttribute('value')).toEqual("kod pocztowy ABC");
//		

	});
	
	it('Bottom menu elements visible', function(){
		var bottomMenuItem1 = browser.driver.findElement(By.xpath("//*[@id=\"footer\"]/div[2]/div/div/div/div[1]/ol/li[1]/a"));
		expect(bottomMenuItem1.isDisplayed()).toBeTruthy();	
		
		var bottomMenuItem1 = browser.driver.findElement(By.xpath("//*[@id=\"footer\"]/div[2]/div/div/div/div[2]/ol/li[1]/a"));
		expect(bottomMenuItem1.isDisplayed()).toBeTruthy();	
	});
});



//////////////////////////////////////////////////
xdescribe('Open page in 200 x 200', function() {
	beforeEach(function() {
		initBrowser('http://www.starbucks.com/', 200, 200);
	});
		
	it('Page loaded', function(){
		expect(browser.driver.getTitle()).toEqual('Starbucks Coffee Company');
	});
		
		
	it('Top menu elements visible', function(){
		
		var utilitiesItem1 = browser.driver.findElement(By.xpath("//*[@id=\"utilities\"]/ul/li[1]/a/span[1]"));
		expect(utilitiesItem1.isDisplayed()).toBeTruthy();
				
		var openMenuIcon = browser.driver.findElement(By.xpath("//*[@id=\"nav\"]/div[1]/a/span[1]"));
		expect(openMenuIcon.isDisplayed()).toBeTruthy();	
	});
	
	
	it('Top menu elements hidden', function(){
			
		var searchBox = browser.driver.findElement(By.xpath("//*[@id=\"searchbox\"]"));
		expect(searchBox.isDisplayed()).toBeFalsy();
		
		var searchBoxIcon = browser.driver.findElement(By.xpath("//*[@id=\"submit_search_util\"]/span[1]"));
		expect(searchBoxIcon.isDisplayed()).toBeFalsy();

		
		var coffeeMenuItem = browser.driver.findElement(By.xpath("//*[@id=\"nav_coffee\"]/a"));
		expect(coffeeMenuItem.isDisplayed()).toBeFalsy();
	});
	
	it('Bottom menu elements not visible', function(){
		var bottomMenuItem1 = browser.driver.findElement(By.xpath("//*[@id=\"footer\"]/div[2]/div/div/div/div[1]/ol/li[1]/a"));
		expect(bottomMenuItem1.isDisplayed()).toBeFalsy();	
		
		var bottomMenuItem1 = browser.driver.findElement(By.xpath("//*[@id=\"footer\"]/div[2]/div/div/div/div[2]/ol/li[1]/a"));
		expect(bottomMenuItem1.isDisplayed()).toBeFalsy();	
	});
});




//////////////////////////////////////////////////
xdescribe('Open page in 2048 x 2048 and check menu show/hide', function() {
	
	beforeEach(function() {
		initBrowser('http://www.starbucks.com/', 2048, 2048);
	});
		
	it('Page loaded', function(){
		expect(browser.driver.getTitle()).toEqual('Starbucks Coffee Company');
	});
	
	
	it('Menu panel visible when mouse over element else not visible', function(){
		
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
	
	beforeEach(function() {
		initBrowser('http://www.starbucks.com/', 2048, 2048);
	});
		
	it('Page loaded', function(){
		expect(browser.driver.getTitle()).toEqual('Starbucks Coffee Company');
	});
	
	it('GOTO language select site and select POLAND', function(){

		clickAndOpenPage("//*[contains(text(),'Change Region')]");//TODO data
				
		expect(browser.driver.getTitle()).toEqual('Choose a location | Starbucks Coffee Company');

		clickAndOpenPage("//*[contains(text(),'Polska (Poland)')]");//TODO data

		expect(browser.driver.getTitle()).toEqual('Starbucks Coffee Company');
		
		expect(browser.driver.getCurrentUrl()).toEqual('http://www.starbucks.pl/');//TODO DATA
		
		
		var menuItem = browser.driver.findElement(By.xpath("//*[@id=\"footer\"]/div[3]/div/div/div[1]/ul/li[1]/a"));
		expect(menuItem.getText()).toEqual('Zmień region');//TODO data
	});
});




xdescribe('Menu -> ...', function() {
	
	beforeEach(function() {
		initBrowser('http://www.starbucks.com/', 2048, 2048);
	});
		
	it('Page loaded', function(){
		expect(browser.driver.getTitle()).toEqual('Starbucks Coffee Company');
	});
	
	
	//TODO mozna zrobic dataDriven tzn wszystkie dzieci z food wygladaja podobnie
	it('FOOD -> ...', function(){

		var menu = browser.driver.findElement(By.xpath("//*[@id=\"nav_menu\"]/a/strong"));
		
		browser.actions().mouseMove(menu).perform();
			
		browser.driver.sleep(500);
		
		var oldPageTitle = browser.driver.getTitle();
		
		clickAndOpenPage("//*[contains(text(),'Bakery')]");// TODO dane z pliku
		
		
		expect(browser.driver.getTitle()).not.toEqual(oldPageTitle);

		oldPageTitle = browser.driver.getTitle()
			
		
		clickAndOpenPage("//*[contains(text(),'Chonga Bagel')]");// TODO dane z pliku
		
		
		expect(browser.driver.getTitle()).not.toEqual(oldPageTitle);
		
		var saturatedFat = browser.driver.findElement(By.xpath("//*[@id=\"overview\"]/div[2]/div/div[1]/table/tbody/tr[4]/td[2]"));
		
		expect(saturatedFat.getText()).toEqual('10%');//TODO dane z pliku
		
		var sodium = browser.driver.findElement(By.xpath("//*[@id=\"overview\"]/div[2]/div/div[1]/table/tbody/tr[7]/td[2]"));
		
		expect(sodium.getText()).toEqual('22%');//TODO dane z pliku
	});
});