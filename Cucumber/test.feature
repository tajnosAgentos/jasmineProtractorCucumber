Feature: guru99 Demopage login
	In order to Login in Demopage we heve to enter login details
	
	Scenario: Register On Guru99 Demopage without email
	
	Given   I am on the Guru homepage
	
	When   enter blank details for Register
	
	Then   error email shown