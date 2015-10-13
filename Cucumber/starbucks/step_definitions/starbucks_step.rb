require 'watir-webdriver'
 
require 'colorize'
 
browser = Watir::Browser.new
 
Given (/^I am on the www.starbucks.com homepage$/)do
 
browser.goto "http://www.starbucks.com/"
 
end
 
When (/^make a search query$/)do
 
browser.text_field(:name,"keywords").set("qwerasdfzxcv")
 
browser.button(:id,"submit_search_util").click
 
end
 
Then (/^ttt$/)do
 
browser.close
 
end
 